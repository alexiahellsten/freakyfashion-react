import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Header from "../../components/Admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/UserAuthContext";

const API_URL = "http://localhost:8000";

function NewCategory() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
  });

  useEffect(() => {
    if (user == null || !user) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    } else if (user && !user.isAdmin) {
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

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("slug", formData.slug);
    if (formData.image) form.append("image", formData.image);

    try {
      const response = await fetch(`${API_URL}/admin/categories/new`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error("Fel vid registrering av kategori", error);
      }

      navigate("/admin/categories");
    } catch (error) {
      console.error("Fel vid registrering av kategori", error);
      alert("Kunde inte registrera kategorin");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-12">
        <aside className="invisible sm:visible text-black bg-gray-200 border w-full lg:w-48 sm:h-screen flex justify-center p-4">
          <nav className="flex flex-col gap-4">
            <Link to="/admin" className="text-lg font-semibold">
              Produkter
            </Link>
            <Link to="/admin/categories" className="text-lg font-semibold">
              Kategorier
            </Link>
          </nav>
        </aside>

        <article className="flex justify-start w-full lg:w-3/4 p-4 bg-white">
          <div className="flex flex-col justify-center w-full">
            <h2 className="text-center sm:text-left text-xl font-semibold mb-4 mt-4">
              Ny kategori
            </h2>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 sm:w-1/3">
                    <Label htmlFor="name" className="p-1 font-semibold text-md">
                      Namn
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ange namn (t.ex. Kläder)"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      maxLength="25"
                    />
                  </div>
                  <div className="space-y-2 sm:w-1/3">
                    <Label htmlFor="slug" className="p-1 font-semibold text-md">
                      Slug
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      placeholder="Ange slug (t.ex. klader)"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      title="Slug får bara innehålla små bokstäver, siffror och bindestreck"
                    />
                  </div>
                  <div className="space-y-2 sm:w-1/3">
                    <Label
                      htmlFor="image"
                      className="p-1 font-semibold text-md"
                    >
                      Bild
                    </Label>
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-1/6">
                    Lägg till kategori
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

export default NewCategory;
