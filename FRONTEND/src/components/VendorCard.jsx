import { Link } from "react-router-dom";

export default function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} className="block shadow-lg hover:shadow-xl">
      <img src={vendor.image} alt={vendor.name} className="w-full h-48 object-cover rounded-t" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{vendor.name}</h3>
      </div>
    </Link>
  );
}
