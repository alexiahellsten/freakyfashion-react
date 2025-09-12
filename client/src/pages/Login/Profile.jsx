import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/UserAuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import StoreInformation from "../../components/StoreInformation/StoreInformation";
import CallToAction from "../../components/CallToAction/CallToAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ShoppingBag, LogOut, Settings } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Profil";
    if (!user) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-center flex flex-col justify-center">
          <span>Du måste vara inloggad för att se din profil.</span>
          <span>Omdirigerar till inloggningssidan..</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        // Rensar användaren från kontexten
        setUser(null);
        
        //Rensar sessionStorage
        sessionStorage.clear();
        
        console.log("Utloggning lyckades");
        navigate("/login");
      } else {
        throw new Error("Något gick fel vid utloggningen");
      }
    } catch (error) {
      console.error("Utloggning misslyckades:", error);

      // Rensar användaren från kontexten och sessionStorage även om utloggning misslyckas
      setUser(null);
      sessionStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      
      <main className="flex flex-col justify-center">
        <section className="profile w-full max-w-4xl mx-auto px-4">
          <div className="flex justify-center">
            <h2 className="text-2xl font-medium">Min profil</h2>
          </div>

          <Card className="w-full mb-6 mt-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">
                  Välkommen tillbaka, {user?.email?.split('@')[0] || 'användare'}!
                </h3>
                <p className="text-gray-600">
                  Här kan du hantera din profil, se dina beställningar och mycket mer.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="my-6 grid gap-6 md:grid-cols-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Användarinformation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600">E-post</p>
                  <p className="text-base">{user?.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600">Användar-ID</p>
                  <p className="text-base">{user?.id}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Snabblänkar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Administrationsknappen visas enbart om användaren är administratör */}
                {user?.isAdmin == 1 && (
                  <Button
                    onClick={() => navigate("/admin")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Administration
                  </Button>
                )}
                
                {/* TODO: Lägg till navigering till ordersidan */}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Mina beställningar
                </Button>
                
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  Fortsätt handla
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-6">
            <Button
              onClick={handleLogout}
              disabled={loading}
            
              className="p-4 m-2 w-1/4 text-lg sm:text-base sm:w-1/4 lg:1/3"
            >
              {loading ? (
                "Loggar ut..."
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logga ut
                </>
              )}
            </Button>
          </div>
        </section>
        
        <StoreInformation />
      </main>
      
      <Footer />
    </>
  );
}

export default Profile;