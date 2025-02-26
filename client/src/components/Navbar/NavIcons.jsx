import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

function NavIcons() {
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="text-foreground">
        <Heart className="h-5 w-5" fill="currentColor" />
      </Button>
      <Link to="/basket">
        <Button variant="ghost" size="icon" className="text-foreground">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}

export default NavIcons;
