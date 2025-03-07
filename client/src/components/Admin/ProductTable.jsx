import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_URL = import.meta.env.VITE_API_URL;

function ProductTable() {
  const [filter, setFilter] = useState("all"); // "all", "published", "unpublished"
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    if (filter === "published") return product.state === "published";
    if (filter === "unpublished") return product.state === "unpublished";
    return true;
  });

  return (
    <article className="w-full lg:w-3/4 p-4 bg-white">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Produkter</h2>
        <div className="flex gap-2 sm:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filtrera produkter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>Välj filtrering</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                <DropdownMenuRadioItem value="all">Alla</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="published">
                  Publicerade
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="unpublished">
                  Opublicerade
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/admin/products/new"
            className={buttonVariants({ variant: "outline" })}
          >
            Ny produkt
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-black font-semibold border-b border-r px-3 py-2">
                Namn
              </TableHead>
              <TableHead className="text-black font-semibold border-b border-r px-3 py-2">
                SKU
              </TableHead>
              <TableHead className="text-black font-semibold border-b border-r px-3 py-2">
                Pris
              </TableHead>
              <TableHead className="text-black font-semibold border-b px-3 py-2 text-center">
                Hantera
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Inga produkter matchar filtret
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="even:bg-muted/50">
                  <TableCell className="border-b border-r px-3 py-2">
                    {product.title}
                  </TableCell>
                  <TableCell className="border-b border-r px-3 py-2">
                    {product.sku}
                  </TableCell>
                  <TableCell className="border-b border-r px-3 py-2">
                    {product.price} SEK
                  </TableCell>
                  <TableCell className="border-b px-3 py-2 text-center">
                    <Link to="/delete">
                      <Button
                        variant="destructive"
                        className="bg-red-200 text-foreground hover:bg-red-300"
                      >
                        <Trash2 className="icon" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </article>
  );
}
export default ProductTable;
