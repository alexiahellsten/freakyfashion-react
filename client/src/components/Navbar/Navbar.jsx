import { Search, Heart, ShoppingCart } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-neutral p-4">
      <div className="flex items-center justify-between w-full mx-auto">
        <div className="flex items-center space-x-4 ml-0">
          <img
            src="https://placehold.co/400x400.png"
            alt="Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-16"
          />
        </div>

        <div className="flex-1 mx-4 relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 rounded-lg border border-gray-300 text-black"
          />
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
          />
        </div>

        <div className="flex items-center space-x-6 mr-0">
          <button className="text-black">
            <ShoppingCart />
          </button>
          <button className="text-black">
            <Heart />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
