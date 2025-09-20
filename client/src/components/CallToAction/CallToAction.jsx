import { Link } from "react-router";

function CallToAction() {
  return (
    <div className="bg-black m-auto p-4 text-center text-white text-sm flex justify-between">
      <span>Kundservice</span>
      <span>Fri frakt för medlemmar när du shoppar för minst 399:-</span>
      <Link to="/register">Registrera</Link>
    </div>
  );
}

export default CallToAction;
