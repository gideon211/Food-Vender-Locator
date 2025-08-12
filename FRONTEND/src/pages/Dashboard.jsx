import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderSpinner from "../components/LoaderSpinner";
import { Menu, X, Search } from "lucide-react";
import DishCarousel from '../components/DishCarousel';
import SearchBar from "../components/searchBar";
import List from '../components/DishList'
import vendors from '../api/vendors.json'; 
import ScrollableCardList from "../components/ScrollableCardList";
import Staples from "../components/NeighborhoodStaples";
import vendorsData from "../api/vendors.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";





const fadishes = [
  { id: 1, img: "https://images.unsplash.com/photo-1542528180-a1208c5169a5?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, img: "https://images.unsplash.com/photo-1536304575888-ccb70eeef59b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2hhbmFpYW4lMjBkaXNofGVufDB8MHwwfHx8Mg%3D%3D" },
  { id: 4, img: "https://images.unsplash.com/photo-1544414082-112fb25cf35d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2hhbmFpYW4lMjBkaXNofGVufDB8MHwwfHx8Mg%3D%3D" },
  { id: 5, img: "https://images.unsplash.com/photo-1446645681877-acde17e336a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdoYW5haWFuJTIwZGlzaHxlbnwwfDB8MHx8fDI%3D" },
  { id: 6, img: "https://images.unsplash.com/photo-1490990813269-10586274747f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdoYW5haWFuJTIwZGlzaHxlbnwwfDB8MHx8fDI%3D" },
  { id: 7, img: "https://images.unsplash.com/photo-1602253057119-44d745d9b860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzaHxlbnwwfDB8MHx8fDI%3D" },
  { id: 8, img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGlzaHxlbnwwfDB8MHx8fDI%3D" }
];



const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-64">
        <LoaderSpinner size="lg" />
      </main>
    );
  }

  return (
    <div className="relative bg-gradient-to-b bg-amber-50  text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 h-[60px] bg-orange-100 md:rounded-br-2xl flex items-center justify-between px-4 md:px-16">

        {/* Logo with Sidebar Toggle */}
        <div className="flex  items-center gap-[8rem]">
          {/* Sidebar Toggle for Desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden sm:block text-orange-600 font-extrabold text-2xl cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" aria-label="Homepage">
<h1 className="text-3xl font-extrabold tracking-tight text-orange-600">

  <span className="italic font-black">FVL</span><span className="text-orange-400">.</span>
</h1>
          </Link>
        </div>

        {/* Centered Search - Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
         <SearchBar />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Search Toggle - Mobile */}
          <button
            className="md:hidden bg-orange-600"
            aria-label="Toggle search input"
            onClick={toggleSearch}
          >
            {showSearch ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* Sidebar Toggle - Mobile */}
          <button
            onClick={toggleSidebar}
            className="text-[#DDFFE9] text-2xl sm:hidden"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
        <nav className="md:hidden absolute border- left-60 w-[10rem] bg-orange-600 z-20 px-4 py-4 space-y-4">
          <ul className="text-black font-semibold text-sm space-y-6">
            <li><Link to="/add-restaurant">Add a Restaurant</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/rate-us">Rate Us</Link></li>
          </ul>
        </nav>
      )}

      {/* Desktop Sidebar */}
      {sidebarOpen && (
<aside className="hidden md:flex flex-col fixed top-[60px] left-0 w-[13rem] bg-orange-100 h- z-20 px-6 py-8 text-gray-800 font-medium text-base space-y-6 border-none rounded-bl-md">
  <ul className="space-y-4">
    <li>
      <Link
        to="/vendor-profile"
        className="block  hover:font-bold"
      >
        Add a Restaurant
      </Link>
    </li>
    <li>
      <Link
        to="/about"
        className="block transition-colors duration-200  hover:font-bold"
      >
        About Us
      </Link>
    </li>
    <li>
      <Link
        to="/rate-us"
        className="block transition-colors duration-200  hover:font-bold"
      >
        Rate Us
      </Link>
    </li>
  </ul>
</aside>

      )}





{/* home  */}

     <div className="py-[2rem] ">
      <DishCarousel />
    </div>


    <div className="pt-[8rem]">
        <div className="flex justify-center pb-[6rem]">
                <h1 className="text-5xl font-bold">Explore Some of Your Favorites</h1>
        </div>

<div className="flex flex-wrap gap-15 justify-center items-center">
  {fadishes.map((dish, index) => (
    <img 
      key={index}
      src={dish.img}
      alt=""
      className="w-32 h-32 sm:w-36 sm:h-36 rounded-full shadow-2xl object-cover"
    />
  ))}
</div>

{/* card list */}
<div className="ml-[4rem] mt-[10rem] "> 
        <h1 className="text-3xl font-bold pb-[2rem] ml-10">Near BY Vendors</h1>
        <ScrollableCardList />
</div>


    </div>

    <div className="text-3xl ml-[4rem] mt-[10rem] ">
        
        <h1 className="font-sans font-medium">Top 10 Dishes Local Spots</h1>
    </div>



    <div className="ml-[4rem] mt-[2rem] pb-[5rem]">
          <List vendors={vendors}/>
    </div>

    <div className="border-1 w-full border-black/6 rounded-full mb-4"></div>

   
 <div className="text-3xl ml-[4rem] mt-[5rem] ">
        
        <h1 className="font-sans font-medium">Neighborhood staples</h1>
    </div>
 

    <div className="ml-[4rem] mt-[2rem] pb-[5rem]">
        <Staples vendors={vendorsData} />
    </div>

  









    </div>
  );
};

export default Dashboard;
