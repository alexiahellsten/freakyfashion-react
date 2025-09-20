import { createContext, useContext, useState, useEffect } from "react";

const UserAuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Kontrollerar om användaren är inloggad när komponenten mountas
  useEffect(() => {
    fetch("http://localhost:8000/api/user/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setUser({
            id: data.userId,
            email: data.email,
            isAdmin: data.isAdmin,
          });
        }
      })
      .catch(() => setUser(null));
  }, []);

  //Returnerar provider med användarens tillstånd och setUser-funktionen
  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
}

// En custom hook för att använda kontexten i applikationen
export function useAuth() {
  return useContext(UserAuthContext);
}
