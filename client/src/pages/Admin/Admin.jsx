import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

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

  const handleDelete = async (slug) => {
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

  //Filtrerar produkter efter kategori och returnerar de produkter som matchar filtret
  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-12">
        <aside className="invisible md:visible text-black bg-gray-200 border w-full lg:w-48 sm:h-screen flex justify-center p-4">
          <h3 className="text-lg">Produkter</h3>
        </aside>

        <section className="w-full lg:w-3/4 p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Produkter</h2>

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
