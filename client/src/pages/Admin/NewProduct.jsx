import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/Admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://localhost:8000";

function NewProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    sku: "",
    price: "",
    brand: "",
    category: "",
    publicationDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      category,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      ...formData,
      registrationDate: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(`${API_URL}/admin/products/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error("Fel vid registrering av produkt", error);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Fel vid registrering av produkt", error);
      alert("Kunde inte registrera produkten");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-12">
        <aside className="invisible sm:visible text-black bg-gray-200 border w-full lg:w-48 sm:h-screen flex justify-center p-4">
          <h3 className="text-lg font-semibold">Produkter</h3>
        </aside>

        <article className="flex justify-start w-full lg:w-3/4 p-4 bg-white">
          <div className="flex flex-col justify-center w-full">
            <h2 className="text-center sm:text-left text-xl font-semibold mb-4 mt-4">
              Ny produkt
            </h2>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 sm:w-1/4">
                    <Label htmlFor="name" className="p-1 font-semibold text-md">
                      Namn
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ange namn"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      maxLength="25"
                    />
                  </div>

                  <div className="space-y-2 sm:w-1/2">
                    <Label
                      htmlFor="description"
                      className="p-1 font-semibold text-md"
                    >
                      Beskrivning
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Ange beskrivning"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2 sm:w-1/2">
                    <Label
                      htmlFor="image"
                      className="p-1 font-semibold text-md"
                    >
                      Bild
                    </Label>
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      placeholder="Ange URL"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 sm:w-1/2">
                    <Label
                      htmlFor="brand"
                      className="p-1 font-semibold text-md"
                    >
                      Märke
                    </Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="Freaky"
                    />
                  </div>

                  <div className="space-y-2 sm:w-1/5">
                    <Label htmlFor="sku" className="p-1 font-semibold text-md">
                      SKU
                    </Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="Ange SKU"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                      pattern="^[A-Z]{3}[0-9]{3}$"
                      title="SKU måste vara i formatet XXXYYY (ex: ABC123)"
                    />
                  </div>

                  <div className="space-y-2 sm:w-1/5">
                    <Label
                      htmlFor="price"
                      className="p-1 font-semibold text-md"
                    >
                      Pris
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 sm:w-1/4">
                    <Label
                      htmlFor="publicationDate"
                      className="p-1 font-semibold text-md"
                    >
                      Publiceringsdatum
                    </Label>
                    <Input
                      id="publicationDate"
                      name="publicationDate"
                      type="date"
                      value={formData.publicationDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="p-1 font-semibold text-md">
                      Kategori
                    </Label>
                    <div className="flex flex-col gap-3">
                      {["kläder", "skor", "accessoarer", "väskor"].map(
                        (category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={category}
                              checked={formData.category === category}
                              onCheckedChange={() =>
                                handleCategoryChange(category)
                              }
                            />
                            <Label htmlFor={category} className="capitalize">
                              {category}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full sm:w-1/6">
                    Lägg till
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>
    </>
  );
}

export default NewProduct;
