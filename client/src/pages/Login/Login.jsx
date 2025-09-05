import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm/LoginForm";
import CallToAction from "../../components/CallToAction/CallToAction";

const API_URL = "http://localhost:8000";

function Login() {

  useEffect(() => {
    document.title = "Logga in";
  }, []);

  return (
    <>
      <header>
        <CallToAction />
        <Navbar />
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-6">
            Logga in för att se dina beställningar, favoritmarkerade produkter och mer.
          </p>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;