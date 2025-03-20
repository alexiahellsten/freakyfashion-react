import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Sök produkt"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-purple-200 border-2 focus:bg-purple-100"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
