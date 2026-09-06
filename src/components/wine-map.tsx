import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type {
  GeoJSON as GeoJSONLayer,
  LatLngBounds,
  LatLngExpression,
  Layer,
  LeafletMouseEvent,
  Map as LMap,
  PathOptions,
} from "leaflet";
import type { Feature, GeoJsonObject, Geometry } from "geojson";
import {
  EUROPE_CENTER,
  EUROPE_ZOOM,
  INK,
  PAPER,
  REGION_COLORS,
  WINE,
  featureToRegion,
  type AtlasRegion,
  type LayerState,
  type WineFeatureProps,
} from "@/lib/wine";

export type MapFocus =
  | { kind: "world" }
  | { kind: "view"; center: [number, number]; zoom: number }
  | { kind: "point"; lat: number; lng: number; zoom?: number };

type PathLayer = Layer & {
  setStyle: (style: PathOptions) => void;
  bringToFront: () => void;
  getBounds: () => LatLngBounds;
  feature?: Feature<Geometry, WineFeatureProps>;
};

type Props = {
  layers: LayerState;
  focus: { id: number; spec: MapFocus };
  markers: AtlasRegion[];
  selectedName: string | null;
  onSelect: (region: AtlasRegion) => void;
  onBackgroundClick: () => void;
  onReady: (info: { france: number; italySubs: number }) => void;
  onError: (message: string) => void;
};

const DATA = {
  france: "/data/france-appellations.geojson",
  francePoints: "/data/france-winery-points.geojson",
  italyRegions: "/data/italy-wine-regions.geojson",
  italySubs: "/data/italy-subregions.geojson",
};

const TILE_ATTRIB =
  'Tiles &copy; Esri &mdash; Esri, TomTom, Garmin, FAO, NOAA, USGS &middot; Wine PDO: Candiago et al. 2022 (CC0)';

function colorFor(props: WineFeatureProps) {
  const key = props.region || props.name;
  return REGION_COLORS[key] || WINE;
}

function appellationStyle(feature?: Feature): PathOptions {
  const props = (feature?.properties || {}) as WineFeatureProps;
  const color = colorFor(props);
  return {
    fillColor: color,
    weight: 1,
    opacity: 0.9,
    color: "#3a322e",
    fillOpacity: 0.42,
  };
}

function prefersReduce() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function durationFor(meters: number, zoomDelta: number) {
  if (prefersReduce()) return 0;
  if (meters > 500_000 || zoomDelta > 3) return 0.46;
  if (meters > 90_000 || zoomDelta > 1.15) return 0.32;
  return 0.2;
}

function flyMap(
  map: LMap,
  spec: MapFocus | { kind: "bounds"; bounds: LatLngBounds; maxZoom: number },
) {
  map.stop();
  const reduce = prefersReduce();
  const ease = 0.45;

  const go = (center: LatLngExpression, zoom: number, meters: number, zoomDelta: number) => {
    if (meters < 8_000 && zoomDelta < 0.2) return;
    const duration = durationFor(meters, zoomDelta);
    if (reduce || duration === 0) {
      map.setView(center, zoom, { animate: false });
    } else {
      map.setView(center, zoom, { animate: true, duration, easeLinearity: ease });
    }
    window.setTimeout(() => {
      map.stop();
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    }, Math.round(duration * 1000) + 80);
  };

  if (spec.kind === "world") {
    const meters = map.distance(map.getCenter(), EUROPE_CENTER);
    const zoomDelta = Math.abs(map.getZoom() - EUROPE_ZOOM);
    go(EUROPE_CENTER, EUROPE_ZOOM, meters, zoomDelta);
    return;
  }
  if (spec.kind === "view") {
    const meters = map.distance(map.getCenter(), spec.center);
    const zoomDelta = Math.abs(map.getZoom() - spec.zoom);
    go(spec.center, spec.zoom, meters, zoomDelta);
    return;
  }
  if (spec.kind === "bounds") {
    if (!spec.bounds.isValid()) return;
    const pad = { x: 56, y: 56 };
    let targetZoom = spec.maxZoom;
    try {
      const z = map.getBoundsZoom(spec.bounds, false, pad as never);
      if (Number.isFinite(z)) targetZoom = Math.min(z, spec.maxZoom);
    } catch {
      /* keep maxZoom */
    }
    const center = spec.bounds.getCenter();
    const zoomDelta = Math.abs(map.getZoom() - targetZoom);
    if (map.getBounds().contains(spec.bounds) && zoomDelta < 0.35) return;
    const meters = map.distance(map.getCenter(), center);
    go(center, targetZoom, meters, zoomDelta);
    return;
  }
  const meters = map.distance(map.getCenter(), [spec.lat, spec.lng]);
  const zoom = spec.zoom ?? 8;
  go([spec.lat, spec.lng], zoom, meters, Math.abs(map.getZoom() - zoom));
}

export function WineMap({
  layers,
  focus,
  markers,
  selectedName,
  onSelect,
  onBackgroundClick,
  onReady,
  onError,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const franceRef = useRef<GeoJSONLayer | null>(null);
  const italySubRef = useRef<GeoJSONLayer | null>(null);
  const italyRegRef = useRef<GeoJSONLayer | null>(null);
  const wineryRef = useRef<GeoJSONLayer | null>(null);
  const markerGroupRef = useRef<Layer | null>(null);
  const selectedRef = useRef<{ layer: PathLayer; parent: GeoJSONLayer } | null>(null);
  const onSelectRef = useRef(onSelect);
  const onBgRef = useRef(onBackgroundClick);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const layersRef = useRef(layers);
  const selectedNameRef = useRef(selectedName);

  onSelectRef.current = onSelect;
  onBgRef.current = onBackgroundClick;
  onReadyRef.current = onReady;
  onErrorRef.current = onError;
  layersRef.current = layers;
  selectedNameRef.current = selectedName;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let resizeTimer = 0;
    const boot = async () => {
      const leaflet = await import("leaflet");
      const L = leaflet.default ?? leaflet;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: EUROPE_CENTER,
        zoom: EUROPE_ZOOM,
        zoomControl: false,
        attributionControl: true,
        minZoom: 3,
        maxZoom: 18,
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 90,
        preferCanvas: false,
        fadeAnimation: false,
        zoomAnimation: !prefersReduce(),
        markerZoomAnimation: false,
        inertia: true,
      });
      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: TILE_ATTRIB,
          maxZoom: 16,
          maxNativeZoom: 16,
        },
      ).addTo(map);
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 16,
          maxNativeZoom: 16,
        },
      ).addTo(map);

      mapRef.current = map;
      const picking = { fromLayer: false };

      map.on("click", () => {
        if (picking.fromLayer) {
          picking.fromLayer = false;
          return;
        }
        onBgRef.current();
      });

      resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          map.invalidateSize({ animate: false });
        }, 80);
      });
      resizeObserver.observe(containerRef.current);

      try {
        const [frApp, frPts, itReg, itSub] = await Promise.all([
          fetch(DATA.france).then((r) => {
            if (!r.ok) throw new Error("France appellations failed to load");
            return r.json();
          }),
          fetch(DATA.francePoints)
            .then((r) => (r.ok ? r.json() : { type: "FeatureCollection", features: [] }))
            .catch(() => ({ type: "FeatureCollection", features: [] })),
          fetch(DATA.italyRegions).then((r) => r.json()),
          fetch(DATA.italySubs).then((r) => r.json()),
        ]);
        if (cancelled) return;

        const selectLayer = (
          layer: PathLayer,
          parent: GeoJSONLayer,
          opts: { isSub?: boolean; isLarge?: boolean },
        ) => {
          const prev = selectedRef.current;
          if (prev && prev.layer !== layer) {
            prev.parent.resetStyle(prev.layer);
          }
          layer.setStyle({
            weight: 3.5,
            color: INK,
            fillOpacity: opts.isLarge ? 0.18 : 0.62,
          });
          layer.bringToFront();
          selectedRef.current = { layer, parent };
          map.closePopup();
          const bounds = layer.getBounds();
          window.requestAnimationFrame(() => {
            flyMap(map, {
              kind: "bounds",
              bounds,
              maxZoom: opts.isLarge ? 8 : 11,
            });
          });
          const props = (layer.feature?.properties || {}) as WineFeatureProps;
          const region = featureToRegion(props);
          const c = bounds.getCenter();
          region.lat = c.lat;
          region.lng = c.lng;
          onSelectRef.current(region);
        };

        const makeLayer = (
          geojson: GeoJsonObject,
          opts: { isSub?: boolean; isLarge?: boolean },
        ) => {
          return L.geoJSON(geojson, {
            style: (feature) => {
              if (opts.isLarge) {
                const props = (feature?.properties || {}) as WineFeatureProps;
                const color = colorFor(props);
                return {
                  fillColor: color,
                  fillOpacity: 0.06,
                  weight: 1.5,
                  color,
                  opacity: 0.45,
                  dashArray: "6 4",
                };
              }
              return appellationStyle(feature as Feature);
            },
            onEachFeature: (_feature, layer) => {
              const path = layer as PathLayer;
              path.on("click", (e: LeafletMouseEvent) => {
                L.DomEvent.stopPropagation(e);
                picking.fromLayer = true;
                const parent = opts.isSub
                  ? italySubRef.current
                  : opts.isLarge
                    ? italyRegRef.current
                    : franceRef.current;
                if (parent) selectLayer(path, parent, opts);
              });
            },
          });
        };

        franceRef.current = makeLayer(frApp, {});
        italySubRef.current = makeLayer(itSub, { isSub: true });
        italyRegRef.current = makeLayer(itReg, { isLarge: true });

        const vis = layersRef.current;
        if (vis.france) franceRef.current.addTo(map);
        if (vis.italySubs) italySubRef.current.addTo(map);
        if (vis.italyRegions) italyRegRef.current.addTo(map);

        wineryRef.current = L.geoJSON(frPts, {
          pointToLayer: (_f, latlng) =>
            L.circleMarker(latlng, {
              radius: 5,
              fillColor: WINE,
              color: PAPER,
              weight: 1,
              opacity: 1,
              fillOpacity: 0.9,
            }),
          onEachFeature: (feature, layer) => {
            const id = (feature.properties as { id?: string }).id || "Winery";
            layer.bindPopup(`<strong>${id}</strong>`, { autoPan: false });
          },
        });

        const updateWineries = () => {
          const layer = wineryRef.current;
          if (!layer) return;
          const show = layersRef.current.wineries && map.getZoom() >= 8;
          if (show && !map.hasLayer(layer)) map.addLayer(layer);
          if (!show && map.hasLayer(layer)) map.removeLayer(layer);
        };
        map.on("zoomend", updateWineries);
        updateWineries();

        map.invalidateSize();
        onReadyRef.current({
          france: frApp.features?.length ?? 0,
          italySubs: itSub.features?.length ?? 0,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Map data failed to load";
        onErrorRef.current(message);
      }
    };

    void boot();

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const toggle = (layer: GeoJSONLayer | null, on: boolean) => {
      if (!layer) return;
      if (on && !map.hasLayer(layer)) map.addLayer(layer);
      if (!on && map.hasLayer(layer)) map.removeLayer(layer);
    };
    toggle(franceRef.current, layers.france);
    toggle(italySubRef.current, layers.italySubs);
    toggle(italyRegRef.current, layers.italyRegions);
    const w = wineryRef.current;
    if (w) {
      const show = layers.wineries && map.getZoom() >= 8;
      if (show && !map.hasLayer(w)) map.addLayer(w);
      if (!show && map.hasLayer(w)) map.removeLayer(w);
    }
  }, [layers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    flyMap(map, focus.spec);
  }, [focus]);

  useEffect(() => {
    if (selectedName) return;
    const prev = selectedRef.current;
    if (!prev) return;
    prev.parent.resetStyle(prev.layer);
    selectedRef.current = null;
  }, [selectedName]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    void import("leaflet").then((leaflet) => {
      const LL = leaflet.default ?? leaflet;
      if (markerGroupRef.current) {
        map.removeLayer(markerGroupRef.current);
        markerGroupRef.current = null;
      }
      if (markers.length === 0) return;
      const group = LL.layerGroup();
      markers.forEach((region) => {
        const marker = LL.circleMarker([region.lat, region.lng], {
          radius: 8,
          fillColor: WINE,
          color: PAPER,
          weight: 2,
          fillOpacity: 0.95,
        });
        marker.on("click", (e: LeafletMouseEvent) => {
          LL.DomEvent.stopPropagation(e);
          flyMap(map, { kind: "point", lat: region.lat, lng: region.lng, zoom: 8 });
          onSelectRef.current(region);
        });
        group.addLayer(marker);
      });
      group.addTo(map);
      markerGroupRef.current = group;
    });
  }, [markers]);

  return <div ref={containerRef} className="absolute inset-0 z-0 isolate h-full w-full" />;
}
