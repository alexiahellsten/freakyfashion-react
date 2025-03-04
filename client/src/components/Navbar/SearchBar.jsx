import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Sök produkt"
        className="pl-10 border-purple-200 border-2 focus:bg-purple-100"
      />
    </div>
  );
}

export default SearchBar;
