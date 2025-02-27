import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

function NavIcons() {
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="icon" className="text-foreground">
        <Heart fill="currentColor" />
      </Button>
      <Link to="/basket">
        <Button variant="ghost" size="icon" className="text-foreground">
          <ShoppingCart />
        </Button>
      </Link>
    </div>
  );
}

export default NavIcons;
