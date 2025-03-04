import { Link } from "react-router";
import { useState, useEffect } from "react";

import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [logo, setLogo] = useState(null);
  const [navigationLinks, setNavigationLinks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/home?populate=*`)
      .then((res) => res.json())
      .then((data) =>
        setLogo(
          data.data.logotype.formats.thumbnail.url
            ? `${API_URL.replace("/api", "")}${
                data.data.logotype.formats.thumbnail.url
              }`
            : "https://placehold.co/400x150?text=Freaky+Fashion"
        )
      )
      .catch(console.error);

    fetch(`${API_URL}/home?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setNavigationLinks(data.data.primaryNavigation) || [];
      })
      .catch(console.error);
  }, []);

  return (
    <nav className="mx-auto p-4">
      <div className="mx-auto px-4 py-3 flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <img
            src={logo}
            alt="Logo"
            className="min-w-full"
            width={400}
            height={150}
          />
        </div>
        <div className="flex items-center space-x-3 w-full">
          <div className="flex-1 sm:px-10">
            <SearchBar />
          </div>
          <NavIcons />
        </div>
      </div>
      <nav className="w-full px-4 flex flex-col space-y-2 text-sm md:flex-row md:space-y-0 md:space-x-6">
        {navigationLinks.map((link) => (
          <Link
            key={link.id}
            to={link.url}
            className="text-foreground hover:text-primary"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </nav>
  );
}

export default Navbar;
