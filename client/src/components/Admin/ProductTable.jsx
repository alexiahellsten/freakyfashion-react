import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProductTable({ products, onDelete }) {
  return (
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
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-4">
                Inga produkter matchar filtret
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="even:bg-muted/50">
                <TableCell className="border-b border-r px-3 py-2">
                  {product.name}
                </TableCell>
                <TableCell className="border-b border-r px-3 py-2">
                  {product.sku}
                </TableCell>
                <TableCell className="border-b border-r px-3 py-2">
                  {product.price} SEK
                </TableCell>
                <TableCell className="border-b px-3 py-2 text-center">
                  <Button
                    variant="destructive"
                    className="bg-red-300 text-foreground hover:bg-red-400"
                    size="icon"
                    onClick={() => onDelete(product.slug)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;
