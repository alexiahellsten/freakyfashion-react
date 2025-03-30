import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar({ onSearch, value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <form onSubmit={onSearch}>
        <Input
          type="text"
          placeholder="Sök produkt"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="pl-10 border-purple-200 border-2 focus:bg-purple-100"
        />
      </form>
    </div>
  );
}

export default SearchBar;
