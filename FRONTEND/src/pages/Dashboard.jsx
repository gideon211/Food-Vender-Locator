import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import DishCarousel from "../components/DishCarousel";
import SearchBar from "../components/searchBar";
import List from "../components/DishList";
import ScrollableCardList from "../components/ScrollableCardList";
import Staples from "../components/NeighborhoodStaples";
import Grocery from "../components/Grocery";
import DashboardSkeleton from "../components/DashboardSkeleton";
import Recent from "../pages/RecentlyAdded";
import vendorsData from "../api/vendors.json";
import vendors from "../api/vendors.json";
import vendorData from "../api/vendors.json";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const Dashboard = () => {
  const { token, setUser: setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    return stored
      ? JSON.parse(stored)
      : { email: "", role: "user", shop: null, profileImage: "" };
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSignOut = () => {
    sessionStorage.removeItem("user");
    setAuthUser(null);
    navigate("/login");
  };

  const handleUpgradeToVendor = async () => {
    try {
      const res = await fetch(
        "https://food-vender-locator.onrender.com/auth/upgrade-to-vendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: user.email }), 
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upgrade failed");

      // update local + global user state
      const updatedUser = { ...user, role: "vendor" };
      setUser(updatedUser);
      setAuthUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Upgraded to vendor!");
      navigate("/vendor-profile"); // redirect to shop registration
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error upgrading");
    }
  };

  if (loading) {
    return (
      <main className="p-4">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <div className="relative bg-gradient-to-b bg-amber- text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 h-[60px] bg-orange-100 md:rounded-br-2xl flex items-center justify-between px-4 md:px-16">
        {/* Logo + Sidebar Toggle */}
        <div className="flex items-center gap-[8rem]">
          <button
            onClick={toggleSidebar}
            className="hidden sm:block text-orange-600 font-extrabold text-2xl cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" aria-label="Homepage">
            <h1 className="text-3xl font-extrabold tracking-tight text-orange-600">
              <span className="italic font-black">FVL</span>
              <span className="text-orange-400">.</span>
            </h1>
          </Link>
        </div>

        {/* Centered Search - Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <SearchBar />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden bg-orange-600"
            aria-label="Toggle search input"
            onClick={toggleSearch}
          >
            {showSearch ? <X size={22} /> : <Search size={22} />}
          </button>
          <button
            onClick={toggleSidebar}
            className="text-[#DDFFE9] text-2xl sm:hidden"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User / Vendor dropdown */}
          <div className="relative">
            {user.role !== "vendor" ? (
              <button
                onClick={handleUpgradeToVendor}
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >
                Upgrade to Vendor
              </button>
            ) : (
              <div className="group relative">
                <img
                  src={
                    user.shop?.imageUrl ||
                    user.profileImage ||
                    "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  <Link
                    to={`/my-shop/${user.email}`} // 👈 email as identifier
                    className="block px-4 py-2 hover:bg-orange-100"
                  >
                    My Shop
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-orange-100"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Input */}
      {showSearch && (
        <section className="md:hidden px-4 pt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full bg-white text-sm text-gray-700 focus:outline-none"
            aria-label="Search input"
          />
        </section>
      )}

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <nav className="md:hidden absolute left-60 w-[10rem] bg-orange-600 z-20 px-4 py-4 space-y-4">
          <ul className="text-black font-semibold text-sm space-y-6">
            <li>
              <Link to="/vendor-profile">Add a Restaurant</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/rate-us">Rate Us</Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Desktop Sidebar */}
      {sidebarOpen && (
        <aside className="hidden md:flex flex-col fixed top-[60px] left-0 w-[13rem] bg-orange-100 z-20 px-6 py-8 text-gray-800 font-medium text-base space-y-6 border-none rounded-bl-md">
          <ul className="space-y-4">
            {user.role !== "vendor" ? (
              <li>
                <Link to="/vendor-profile" className="block hover:font-bold">
                  Become a Vendor
                </Link>
              </li>
            ) : (
              <li>
                <Link to={`/my-shop/${user.email}`} className="block hover:font-bold">
                  My Shop
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="block hover:font-bold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/rate-us" className="block hover:font-bold">
                Rate Us
              </Link>
            </li>
          </ul>
        </aside>
      )}

      {/* Main content */}


      <div>



        <div className="ml-[4rem] mt-[2rem] mb-[4rem]">
          <h1 className="text-3xl font-bold pb-[2rem] ml-10">Near BY Vendors</h1>
          <ScrollableCardList />
        </div>

        <div className="border-1 w-full border-black/6 rounded-full mb-4"></div>

        <div className="text-3xl ml-[4rem] mt-[5rem] ">
          <h1 className="font-sans font-medium inter">Neighborhood staples</h1>
        </div>

        <div className="ml-[4rem] mt-[2rem] pb-[5rem]">
          <Staples vendors={vendorsData} />
        </div>

        <div className="border-1 w-full border-black/6 rounded-full"></div>

        <div className="text-3xl ml-[4rem] mt-[4rem] mb-7 ">
          <h1 className="font-sans font-medium inter">Top 10 Dishes Local Spots</h1>
        </div>

        <div className="ml-[4rem] pb-[5rem]">
          <List vendors={vendors} />
        </div>

        <div className="border-1 w-full border-black/6 rounded-full mb-4"></div>

        <div className="ml-[4rem] mt-[2rem] pb-[3rem]">
          <h3 className="font-sans text-3xl font-medium inter">
            Save big on groceries
          </h3>
        </div>

        <div className="ml-[4rem] pb-[5rem]">
          <Grocery vendors={vendorData} />
        </div>

        <div className="border-1 w-full border-black/6 rounded-full mt-4"></div>

        <div className="ml-[4rem] mt-[2rem] mb-[1rem]">
          <h3 className="font-sans text-3xl font-medium inter">Recently Added</h3>
        </div>

        <div className="ml-[4rem] pb-[5rem]">
          <Recent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
