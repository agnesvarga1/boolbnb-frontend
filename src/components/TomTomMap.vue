User
<script>
import tt from "@tomtom-international/web-sdk-maps";
import { store } from "../store.js";
import { toRaw } from "vue";

export default {
  name: "TomTomMap",
  props: ["propApartments"],
  data() {
    return {
      store,
    };
  },
  methods: {
    inzializeMap() {
      const map = tt.map({
        key: import.meta.env.VITE_TOMTOM_API_KEY,
        container: "tomtom-map",
        center: [13, 41],
        zoom: 4,
      });

      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());

      map.on("load", () => {
        store.map = map;
        this.createMarkers();
        if (this.propApartments.length == 1) {
          this.updateMapCenter(
            this.propApartments[0].longitude,
            this.propApartments[0].latitude
          );
        }
      });
    },
    createMarkers() {
      const map = toRaw(store.map);

      var markersOnTheMap = {};
      var eventListenersAdded = false;

      const geoJson = {
        type: "FeatureCollection",
        features: this.propApartments.map((apartment) => ({
          type: "Feature",
          id: apartment.id,
          geometry: {
            type: "Point",
            coordinates: [apartment.longitude, apartment.latitude],
          },
          properties: {
            id: apartment.id,
            name: apartment.title,
            full_address: apartment.full_address,
          },
        })),
      };

      if (map.getSource("point-source")) {
        map.removeLayer("cluster-count");
        map.removeLayer("clusters");
        map.removeSource("point-source");
      }

      function refreshMarkers() {
        Object.keys(markersOnTheMap).forEach(function (id) {
          markersOnTheMap[id].remove();
          delete markersOnTheMap[id];
        });

        map.querySourceFeatures("point-source").forEach(function (feature) {
          if (feature.properties && !feature.properties.cluster) {
            var id = feature.properties.id;

            if (!markersOnTheMap[id]) {
              var newMarker = new tt.Marker().setLngLat(
                feature.geometry.coordinates
              );

              newMarker.addTo(map);
              newMarker.setPopup(
                new tt.Popup({
                  closeButton: false,
                  offset: 75 / 2,
                  anchor: "bottom",
                }).setHTML(`
                <b><h5>${feature.properties.name}</h5></b>
                <span>${feature.properties.full_address}</span>
                `)
              );
              markersOnTheMap[id] = newMarker;
            }
          }
        });
      }

      map.addSource("point-source", {
        type: "geojson",
        data: geoJson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "point-source",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#EC619F",
            4,
            "#008D8D",
            7,
            "#004B7F",
          ],
          "circle-radius": ["step", ["get", "point_count"], 15, 4, 20, 7, 25],
          "circle-stroke-width": 1,
          "circle-stroke-color": "white",
          "circle-stroke-opacity": 1,
        },
      });
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "point-source",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 16,
        },
        paint: {
          "text-color": "white",
        },
      });
      map.on("data", function (e) {
        if (
          e.sourceId !== "point-source" ||
          !map.getSource("point-source") ||
          !map.getSource("point-source").loaded()
        ) {
          return;
        }
        refreshMarkers();
        if (!eventListenersAdded) {
          map.on("move", refreshMarkers);
          map.on("moveend", refreshMarkers);
          eventListenersAdded = true;
        }
      });
      map.on("click", "clusters", function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        var clusterId = features[0].properties.cluster_id;
        map
          .getSource("point-source")
          .getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err) {
              return;
            }
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom + 0.5,
            });
          });
      });
      map.on("mouseenter", "clusters", function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", function () {
        map.getCanvas().style.cursor = "";
      });
    },
    updateMapCenter(lng, lat) {
      toRaw(store.map).setCenter([lng, lat]);
      toRaw(store.map).setZoom(13);
    },
  },
  mounted() {
    this.inzializeMap();
  },
  watch: {
    propApartments: {
      handler(newApartments, oldApartments) {
        this.createMarkers();

        if (this.propApartments.length == 1) {
          this.updateMapCenter(
            this.propApartments[0].longitude,
            this.propApartments[0].latitude
          );
        }
      },
      deep: true, // Assicura il deep watching sull'array
    },
  },
};
</script>

<template>
  <div id="tomtom-map"></div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables" as *;
@use "../styles/partials/mixins" as *;

#tomtom-map {
  height: 500px;
}
</style>
