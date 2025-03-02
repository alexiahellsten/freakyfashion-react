import { Link } from "react-router";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <nav>
      <div className="mx-auto px-4 py-3 flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
        <div>
          <img
            src="https://placehold.co/300x180.png"
            alt="Logo"
            className="min-w-full"
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
