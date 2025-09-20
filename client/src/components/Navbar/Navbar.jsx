import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const categoryNames = {
    klader: "Kläder",
    accessoarer: "Accessoarer",
    skor: "Skor",
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Kunde inte hämta kategorier:", err));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogoClick = () => {
    setSearchQuery("");
    navigate("/");
  };

  return (
    <nav className="mx-auto p-4">
      <div className="mx-auto px-4 py-3 flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <Link to="/" onClick={handleLogoClick}>
            {/* <img
              src={logo}
              alt="Logo"
              className="min-w-full"
              width={400}
              height={150}
            /> */}
            <h1 className="text-2xl font-bold whitespace-nowrap">
              Freaky Fashion
            </h1>
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
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.slug}`}
            className="text-foreground hover:text-primary"
          >
            {categoryNames[category.slug] ||
              category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}
          </Link>
        ))}
      </nav>
    </nav>
  );
}

export default Navbar;
