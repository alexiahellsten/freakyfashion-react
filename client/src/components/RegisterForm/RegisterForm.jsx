import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/UserAuthContext"; 

function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();  // Hämtar setUser från AuthContext via hooken
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //Sparar sessionen via cookies
        body: JSON.stringify({ email, password }),
      }); 
      
      if (!response.ok) {
        throw new Error("Något gick fel vid registreringen");
      }

      const data = await response.json();
      console.log("Registreringen lyckades:", data);

      // Uppdaterar användarens tillstånd i AuthContext
       setUser(data.user);

        // Sparar användaren i sessionStorage för att behålla inloggningen vid uppdatering av sidan
      sessionStorage.setItem("user", JSON.stringify(data.user));

      //Navigerar till profilsidan
        navigate("/profile");
    } catch (error) {
      console.error("Registreringen misslyckades:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Registrera</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-6" method="POST">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  E-post
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">
                  Lösenord
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="p-4 m-2 w-1/4 text-lg sm:text-base sm:w-1/4 lg:w-1/3"
              >
                {loading ? "Registrerar..." : "Registrera"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
