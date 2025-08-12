import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import VendorCard from "../api/vendors.json";
import 'leaflet/dist/leaflet.css';


export default function VendorDetail() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
useEffect(() => {
  const found = VendorCard.find(v => v.id === parseInt(id));
  setVendor(found);
}, [id]);


  if (!vendor) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{vendor.name}</h2>
      <p className="text-gray-500 mb-4">{vendor.city}</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {vendor.dishes.map((dish, i) => (
          <div key={i} className=" rounded p-4">
            <img src={dish.img} alt={dish.name} className="w-full h-32 object-cover mb-2 rounded" />
            <p className="font-semibold">{dish.name}</p>
            <p className="text-sm text-gray-600">GH₵ {dish.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <MapContainer center={[vendor.location.lat, vendor.location.lng]} zoom={13} className="h-64 w-full rounded">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[vendor.location.lat, vendor.location.lng]}>
            <Popup>{vendor.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
