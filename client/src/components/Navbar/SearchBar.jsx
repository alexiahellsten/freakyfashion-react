import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input placeholder="Sök produkt" className="pl-10" />
    </div>
  );
}

export default SearchBar;
