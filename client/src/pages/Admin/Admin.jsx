import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/UserAuthContext";

import Header from "../../components/Admin/Header";
import ProductTable from "../../components/Admin/ProductTable";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const API_URL = "http://localhost:8000";

function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "Administration";

    // Om användaren inte är inloggad, navigera till inloggningssidan
    if (user == null || !user) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
    // Om användaren inte är inloggad, navigera till inloggningssidan
    if (!user) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
    // Om användaren är inloggad men inte admin, navigera till startsidan
    else if (user && !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-center flex flex-col justify-center">
          <span>
            Du måste vara administratör för att komma åt administrationssidan.
          </span>
          <span>Omdirigerar till inloggningssidan..</span>
        </div>
      </div>
    );
  }

  const fetchProducts = () => {
    fetch(`${API_URL}/admin/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Hämtade produkter:", data);
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av produkter:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (slug, productName) => {
    if (
      !window.confirm(
        `Är du säker på att du vill radera produkten: ${productName}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/products/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kunde inte radera produkten");
      }
      fetchProducts();
    } catch (error) {
      console.error("Fel vid radering av produkt:", error);
      alert("Kunde inte radera produkten");
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-12">
        <aside className="invisible sm:visible text-black bg-gray-200 border w-full lg:w-48 sm:h-screen flex justify-center p-4">
          <h3 className="text-lg font-semibold">Produkter</h3>
        </aside>

        <section className="w-full lg:w-3/4 p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-center sm:text-left text-xl font-semibold mb-4 mt-4">
              Produkter
            </h2>

            <div className="flex gap-2">
              <Button onClick={() => navigate("/admin/products/new")}>
                Ny produkt
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filtrera produkter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  <DropdownMenuLabel>Välj filtrering</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filter}
                    onValueChange={setFilter}
                  >
                    <DropdownMenuRadioItem value="all">
                      Alla
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="skor">
                      Skor
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="kläder">
                      Kläder
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="accessoarer">
                      Accessoarer
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="väskor">
                      Väskor
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {loading ? (
            <p>Laddar..</p>
          ) : (
            <ProductTable products={filteredProducts} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </>
  );
}

export default Admin;
