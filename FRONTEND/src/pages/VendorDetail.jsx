import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import VendorCard from "../api/vendors.json";

// Custom vendor marker icon
const vendorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Custom user marker icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

function Routing({ userLocation, vendorLocation, setRouteInfo }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !vendorLocation) return;

    const router = new L.Routing.OSRMv1({
      serviceUrl: "https://router.project-osrm.org/route/v1"
    });

    router.route(
      [
        L.Routing.waypoint(L.latLng(userLocation.lat, userLocation.lng)),
        L.Routing.waypoint(L.latLng(vendorLocation.lat, vendorLocation.lng)),
      ],
      (err, routes) => {
        if (!err && routes?.length > 0) {
          const route = routes[0];
          const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
          const etaMin = Math.ceil(route.summary.totalTime / 60);

          setRouteInfo({ distance: distanceKm, eta: etaMin });

          // Draw polyline
          const line = L.polyline(route.coordinates, { color: "white", weight: 4 }).addTo(map);

          // Find midpoint of route for label
          const midIndex = Math.floor(route.coordinates.length / 2);
          const midpoint = route.coordinates[midIndex];

          // Add tooltip directly on the map
          L.tooltip({
            permanent: true,
            direction: "center",
            className: "route-label"
          })
            .setLatLng(midpoint)
            .setContent(`🚗 ${distanceKm} km • ⏱ ${etaMin} min`)
            .addTo(map);

          map.fitBounds(line.getBounds());
        }
      }
    );
  }, [userLocation, vendorLocation, map, setRouteInfo]);

  return null;
}



export default function VendorDetail() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    const found = VendorCard.find((v) => v.id === parseInt(id));
    setVendor(found || null);
  }, [id]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!vendor) {
    return <p className="text-center text-gray-500 mt-8">Loading vendor...</p>;
  }

  return (
    <div className="bg-amber-50 min-h-screen">



        <div className="flex">
      {/* Banner */}
      <div className="relative w-[70rem] overflow-hidden h-[36rem]">
        <img
          src={vendor.img || ""}
          alt={vendor.name || "Vendor"}
          className="w-[70rem] h-[36rem] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="p-6 text-white max-w-5xl w-full flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">Welcome To {vendor.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(vendor.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg font-semibold">
                  {(vendor.rating || 0).toFixed(1)}
                </span>
              </div>
              <div className="flex items-center text-gray-200 mt-2">
                <MapPin className="w-4 h-4 mr-1 text-red-400" />
                {vendor.city}
              </div>
              <div><p className="text-white text-xl italic">{vendor?.description || "No description"}</p></div>

            </div>
            <div className="mt-4 md:mt">
              <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                Featured Vendor
              </span>
            </div>
          </div>
        </div>
      </div>




      {/* Map */}
      {vendor.location?.lat && vendor.location?.lng && userLocation && (
        <div className="max-w-5xl ">
          <MapContainer
            center={[vendor.location.lat, vendor.location.lng]}
            zoom={15}
            className="min-h-screen w-[60rem] "
          >
            {/* Dark mode tiles */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            <MarkerClusterGroup>
              <Marker position={[vendor.location.lat, vendor.location.lng]} icon={vendorIcon}>
                <Tooltip permanent direction="top" offset={[0, -20]}>
                  {vendor.name}
                </Tooltip>
              </Marker>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={vendor.img ? userIcon : vendorIcon}>
                <Tooltip permanent direction="top" offset={[0, -20]}>
                  You
                </Tooltip>
              </Marker>
            </MarkerClusterGroup>

            <Routing
              userLocation={userLocation}
              vendorLocation={vendor.location}
              setRouteInfo={setRouteInfo}
            />
          </MapContainer>
        </div>
      )}




 </div>     

      {/* Menu */}
      <div className="max-w-5xl pl-2 mt-[-20rem]">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vendor.dishes?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-b-md overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={item.img || ""}
                alt={item.name || "Dish"}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 bg-orange-100">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                <span className="inline-block mt-3 px-3 py-1 text-sm font-semibold bg-orange-200 text-orange-700 rounded-full">
                  ₵{(parseFloat(item?.price) || 0).toFixed(2)}
                </span>

                <div className=""><h1 className="text-4xl">♡</h1></div>

                
                </div>

                
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
