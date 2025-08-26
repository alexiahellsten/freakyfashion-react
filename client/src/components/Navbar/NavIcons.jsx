import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, LogIn } from "lucide-react";
import { Link } from "react-router";
import { useBasket } from "../../contexts/BasketContext";

function NavIcons() {
  const { state } = useBasket();
  const basketItemsCount =
    state?.basket.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div className="flex items-center relative space-x-2">
       <Link to="/favorites" className="relative">
      <Button variant="ghost" size="icon" className="text-foreground">
        <Heart fill="currentColor" />
      </Button>
      </Link>
      <Link to="/basket" className="relative">
        <Button variant="ghost" size="icon" className="text-foreground">
          <ShoppingCart />
        </Button>
        {basketItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {basketItemsCount}
          </span>
        )}
      </Link>
      <Link to="/login" className="relative">
        <Button variant="ghost" size="icon" className="text-foreground">
          <LogIn />
        </Button>
      </Link>
    </div>
  );
}

export default NavIcons;
