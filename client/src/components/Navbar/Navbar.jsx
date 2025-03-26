import { useState } from "react";
import { Link, useNavigate } from "react-router";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Navbar() {
  const logo = "/images/logo.png";
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const navigationLinks = [
    { id: 1, name: "Nyheter", url: "/nyheter" },
    { id: 2, name: "Topplistan", url: "/topplistan" },
    { id: 3, name: "Rea", url: "/rea" },
    { id: 4, name: "Kampanjer", url: "/kampanjer" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  //Återställer tillståndet av searchQuery så att alla produkter visas igen
  const handleLogoClick = () => {
    setSearchQuery("");
    navigate("/");
  };

  return (
    <nav className="mx-auto p-4">
      <div className="mx-auto px-4 py-3 flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <Link to="/" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Logo"
              className="min-w-full"
              width={400}
              height={150}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-3 w-full">
          <div className="flex-1 sm:px-10">
            <SearchBar
              onSearch={handleSearch}
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <NavIcons />
        </div>
      </div>
      <nav className="w-full px-4 flex flex-col space-y-2 text-sm md:text-base md:flex-row md:space-y-0 md:space-x-6">
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
