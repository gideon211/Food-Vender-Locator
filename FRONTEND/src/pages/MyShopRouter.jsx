import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import VendorProfileForm from "../pages/VendorProfile";
import VendorDetails from "../pages/vendorDetails";
import FullPageLoader from "../components/FullPageLoader";

const MyShopRouter = () => {
  const { token } = useAuthContext();
  const [shopExists, setShopExists] = useState(null);

  useEffect(() => {
    const checkShop = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/vendors/my-vendor`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setShopExists(true);
        } else if (res.status === 404) {
          setShopExists(false);
        } else {
          throw new Error("Unexpected error checking vendor");
        }
      } catch (err) {
        console.error("Error checking shop:", err);
        setShopExists(false);
      }
    };

    if (token) checkShop();
  }, [token]);

  if (shopExists === null) {
    return <FullPageLoader message="Loading shop info..." />;
  }

  return shopExists ? <VendorDetails /> : <VendorProfileForm />;
};

export default MyShopRouter;
