import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/contexts/UserAuthContext";

import Header from "../../components/Admin/Header";
import { Button } from "@/components/ui/button";
import CategoriesTable from "../../components/Admin/CategoriesTable";

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

function AdminCategories() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const displayName = (slug) => {
    if (slug === "klader") return "Kläder";
    if (slug === "skor") return "Skor";
    if (slug === "accessoarer") return "Accessoarer";
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const fetchCategories = () => {
    fetch(`${API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av kategorier:", error);
        setLoading(false);
      });
  };

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

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av kategorier:", error);
        setLoading(false);
      });
  }, []);

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
  const handleDelete = async (slug, categoryName) => {
    if (
      !window.confirm(
        `Är du säker på att du vill radera kategorin: ${categoryName}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/admin/categories/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kunde inte radera kategorin");
      }
      fetchCategories();
    } catch (error) {
      console.error("Fel vid radering av kategori:", error);
      alert("Kunde inte radera kategorin");
    }
  };

  const filteredCategories = categories.filter((category) => {
    if (filter === "all") return true;
    return category.slug === filter;
  });

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

        <section className="w-full lg:w-3/4 p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-center sm:text-left text-xl font-semibold mb-4 mt-4">
              Kategorier
            </h2>

            <div className="flex gap-2">
              <Button onClick={() => navigate("/admin/categories/new")}>
                Ny kategori
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filtrera kategorier</Button>
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
                    {Array.from(new Set(categories.map((cat) => cat.slug))).map(
                      (slug) => (
                        <DropdownMenuRadioItem key={slug} value={slug}>
                          {displayName(slug)}
                        </DropdownMenuRadioItem>
                      )
                    )}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {loading ? (
            <p>Laddar..</p>
          ) : (
            <CategoriesTable
              categories={filteredCategories.map((cat) => ({
                ...cat,
                name: displayName(cat.slug),
              }))}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </>
  );
}

export default AdminCategories;
