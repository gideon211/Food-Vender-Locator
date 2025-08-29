import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import vendorsData from "../api/vendors.json";

export default function ScrollableCardList({ title, cardWidth = "16rem" }) {
  const scrollRef = useRef(null);
  const items = vendorsData; // direct from import

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.5;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {title && <h2 className="text-xl font-bold mb-4 px-10">{title}</h2>}

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/40 shadow-md p-2 rounded-full hover:bg-gray-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex w-[95%] overflow-x-auto gap-4 scrollbar-hide scroll-smooth px-10"
      >
        {items.slice(10, 20).map((item) => (
          <Link
            to={`/vendor/${item.id}`}
            key={item.id}
            className=" h-[15rem] border-b-3 rounded-b-xl border-orange-300 cursor-pointer flex-shrink-0 overflow-hidden rounded "
            style={{ minWidth: cardWidth }}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover hover:scale-105 transition-transform"
            />
            <div className="p-4 border-orange-100 border-b-1 border bg-orange-00">
              <h3 className="font-medium text-lg leading-tight">{item.name}</h3>
              {item.city && (
                <p className="text-sm text-gray-500">{item.city}</p>
              )}
            </div>
          </Link>
        ))}     
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-[1rem] top-1/2 -translate-y-1/7 z-10 bg-white/40 shadow-md p-2 rounded-full hover:bg-gray-200"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
