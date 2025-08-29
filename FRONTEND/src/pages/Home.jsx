import React from 'react'
import banner from '../assets/first.jpg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';





function Home() {
  return (
        
    <div className=" min-h-screen overflow-hidden bg-amber-50" >

    
      
      {/* Navbar */}
      <header className="h-[60px] bg-orange-100 text-orange-600 hover:text-orange-500  rounded-b-2xl flex items-center justify-between px-4 md:px-16 animate-slideDown">
        <Link to="/" aria-label="Homepage">
<h1 className="text-3xl font-extrabold tracking-tight text-orange-600">

  <span className="italic font-black">FVL</span><span className="text-orange-400">.</span>
</h1>

        </Link>

        <nav className="hidden sm:flex items-center space-x-6 md:space-x-12">
          <Link to="/login" className="text-sm font-semibold text-orange-500 hover:text-orange-300">
            Sign In
          </Link>
          <Link to="/signup">
            <button className="font-semibold text-sm rounded-3xl  px-5 h-9 py-2 bg-orange-600 hover:bg-orange-500 cursor-pointer text-white">
              Register
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse bg-amber-50 md:flex-row md:rounded-b-2xl-md items-center justify-between md:pb-[2rem]  mt-[10rem] gap-10 px-4 md:px-14">
        
        {/* Text */}
        <div className="text-white text-center md:text-left md:ml-[5rem] w-full md:w-1/2 flex flex-col justify-center items-center md:items-start animate-slideRight delay-[200ms]">
          <h1 className="leading-tight text-slate-800">
            <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold block"> fast. From street eats to hidden gems</span>
          </h1>
          <p className="mt-6 text-base md:text-sm md:font-medium lg:text-lg text-stone-600 w-mx-screen">
            Join thousands of food lovers finding their favorite bites nearby. Live menus, vendor info, and honest reviews at your fingertips
          </p>

          <div className="flex justify-center md:justify-start mt-10 animate-slideUp delay-[400ms]">
            <Link to="/signup">
              <button className="px-10 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 hover:scale-105 transition-transform duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 grid justify-center grid-cols-2 gap-[1rem] mb-10 md:mb-0 animate-slideLeft delay-[400ms]">
          <img
            src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Vendor Map Preview"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-tl-xl shadow-md"
          />

                    <img
            src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfDB8MHx8fDA%3D"
            alt="Vendor Map Preview"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-tr-xl shadow-lg"
          />

                    <img
            src="https://images.unsplash.com/photo-1515669097368-22e68427d265?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxyZXN0YXVyYW50fGVufDB8MHwwfHx8Mg%3D%3D"
            alt="Vendor Map Preview"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-bl-xl shadow-lg"
          />
                    <img
            src="https://images.unsplash.com/photo-1513271224036-f526ad664968?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ2fHxyZXN0YXVyYW50fGVufDB8MHwwfHx8Mg%3D%3D"
            alt="Vendor Map Preview"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-br-xl shadow-lg"
          />
        </div>
      </section>



<section className="bg-white py-20 px-4 md:px-16">
  <h2 className="text-3xl font-bold text-orange-600 text-center mb-12">
    What Our Users Say
  </h2>

  <div className="grid md:grid-cols-3 gap-10">
    {/* Testimonial 1 */}
    <div className="flex flex-col items-center text-center">
      <img
        src="https://media.istockphoto.com/id/2149697267/photo/black-woman-arms-crossed-and-portrait-with-smile-in-studio-for-fashion-confidence-and-pride.webp?a=1&b=1&s=612x612&w=0&k=20&c=V7G6Uv-_qW590BdDGrW1rD5oVAQwWkzibCwPNhIzYRI="
        alt="Happy customer"
        className="rounded-xl w-32 h-32 object-cover mb-4"
      />
      <p className="italic text-gray-700 max-w-xs">
        “This app changed how I eat lunch! I find hidden food gems near my office almost every day.”
      </p>
      <p className="mt-4 font-bold text-orange-600">– Ama, Accra</p>
    </div>

    {/* Testimonial 2 */}
    <div className="flex flex-col items-center text-center">
      <img
        src="https://images.unsplash.com/photo-1589126061982-8960177ee79a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBhbWVyaWNhbnxlbnwwfDF8MHx8fDI%3D"
        alt="Happy user"
        className="rounded-xl w-32 h-32 object-cover mb-4"
      />
      <p className="italic text-gray-700 max-w-xs">
        “Super fast and super helpful. I found a vegan vendor two blocks away I never knew existed.”
      </p>
      <p className="mt-4 font-bold text-orange-600">– Daniel, Kumasi</p>
    </div>

    {/* Testimonial 3 */}
    <div className="flex flex-col items-center text-center">
      <img
        src="https://media.istockphoto.com/id/2185885968/photo/confident-computer-programmer-smiling-and-crossing-arms-in-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=quut_i1auGP7SQOeeVGSvZJ-rSfm0Oi1QsE7uQOV-ME="
        alt="Smiling customer"
        className="rounded-xl w-32 h-32 object-cover mb-4"
      />
      <p className="italic text-gray-700 max-w-xs">
        “Perfect for weekends. I love browsing by category — always something new to try!”
      </p>
      <p className="mt-4 font-bold text-orange-600">– Linda, Takoradi</p>
    </div>
  </div>
</section>






<section className="py-20 px-4 md:px-16 bg-white text-center">
  <h2 className="text-3xl font-bold text-orange-600 mb-10">Why Choose Us?</h2>
  <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
    {[
      {
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        title: "Quality Vendors",
        desc: "We partner only with vendors who meet high quality standards.",
      },
      {
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
        title: "Speedy Search",
        desc: "Find what you want, when you want it, without the wait.",
      },
      {
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfDB8MHx8fDI%3D",
        title: "Live Updates",
        desc: "Stay informed with live status and availability of vendors near you.",
      },
    ].map(({ image, title, desc }, i) => (
      <div
        key={i}
        className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-sm">{desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>





<section className="py-20 bg-amber-50 px-6 md:px-16 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
  {/* Text + Timeline */}
<div className="flex-1 relative pl-12 space-y-12">
  <h2 className="text-3xl font-bold md:pr-20 text-orange-600 mb-12">How It Works</h2>

  {/* Vertical line overlay */}
  <div className="absolute left-4 top- bottom-0 w-1 h-[13rem] bg-orange-500 z-0"></div>

  {[...Array(3)].map((_, idx) => (
    <div key={idx} className="relative pl-8 z-10">
      {/* Number circle with white background to cover line underneath */}
      <div className="absolute -left-13 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 text-white font-bold text-lg z-20">
        {idx + 1}
      </div>

      <h3 className="text-xl font-semibold text-orange-600 mb-2 relative z-10">
        {["Find Vendors Near You", "View Menus & Info", "Visit or Order"][idx]}
      </h3>
      <p className="text-gray-700 max-w-xl relative z-10">
        {[
          "Instantly discover local food spots by your location.",
          "Check opening hours, specialties, and reviews.",
          "Choose your vibe — order online or go in-person.",
        ][idx]}
      </p>
    </div>
  ))}
</div>



  {/* Image */}
  <div className="flex-1 max-w-md md:max-w-lg">
    <img
      src="https://images.unsplash.com/photo-1585433013633-75f802e06715?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGV4dGluZ3xlbnwwfDF8MHx8fDI%3D"
      alt="Food Vendor Location"
      className="rounded-xl shadow-lg object-cover w-[30rem] h-[30rem]"
    />
  </div>
</section>













<section className="py-16 px-4 md:px-16 text-center bg-white">
  <h2 className="text-2xl font-semibold text-orange-600">Stay Updated</h2>
  <p className="text-gray-500 mb-4">Get the latest food vendor updates, offers & more.</p>
  <div className="flex flex-col md:flex-row justify-center gap-4">
    <input type="email" placeholder="Enter your email" className="p-3 w-full max-w-md rounded-md border border-orange-300" />
    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold">Subscribe</button>
  </div>
</section>



<footer className="bg-orange-100 text-orange-700 py-10 px-4 md:px-16">
  <div className="grid md:grid-cols-3 gap-6 text-sm">
    <div>
      <h3 className="font-bold text-xl mb-2">yourFVL.</h3>
      <p className="max-w-xs">Connecting hungry people with local food vendors — fast, easy, reliable.</p>
    </div>
    <div className="space-y-2">
      <p><Link to="/about">About Us</Link></p>
      <p><Link to="/contact">Contact</Link></p>
      <p><Link to="/terms">Terms & Privacy</Link></p>
    </div>
    <div className="space-y-2">
      <p>Email: support@yourfvl.com</p>
      <p>Phone: +233 50 123 4567</p>
    </div>
  </div>
  <p className="text-center text-xs mt-6">© {new Date().getFullYear()} yourFVL. All rights reserved.</p>
</footer>




    </div>

 
  )
}

export default Home
