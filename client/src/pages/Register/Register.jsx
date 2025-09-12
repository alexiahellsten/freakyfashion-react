import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import CallToAction from "../../components/CallToAction/CallToAction";

const API_URL = "http://localhost:8000";

function Register() {

  useEffect(() => {
    document.title = "Registrera ett konto";
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
            Registrera dig för att skapa ett konto och börja handla.
          </p>
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Register;