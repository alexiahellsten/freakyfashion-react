import { Link } from "react-router";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/home?populate=*`)
      .then((res) => res.json())
      .then((data) =>
        setLogo(
          data.data.logotype.formats.thumbnail.url
            ? `${API_URL.replace("/api", "")}${
                data.data.logotype.formats.thumbnail.url
              }`
            : "https://placehold.co/400x150?text=Logo+Not+Found"
        )
      )
      .catch(console.error);
  }, []);

  if (!logo) return <p>Logo not available.</p>;

  return (
    <nav>
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
      <nav className="link w-full px-4 flex flex-col space-y-2 text-sm md:flex-row md:space-y-0 md:space-x-6">
        <Link to="/nyheter" className="text-foreground hover:text-primary">
          Nyheter
        </Link>
        <Link to="/topplistan" className="text-foreground hover:text-primary">
          Topplistan
        </Link>
        <Link to="/rea" className="text-foreground hover:text-primary">
          Rea
        </Link>
        <Link to="/kampanjer" className="text-foreground hover:text-primary">
          Kampanjer
        </Link>
      </nav>
    </nav>
  );
}

export default Navbar;
