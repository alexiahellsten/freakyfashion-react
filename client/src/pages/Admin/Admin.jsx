import Header from "../../components/Admin/Header";
import ProductTable from "../../components/Admin/ProductTable";

function Admin() {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-12">
        <aside className="invisible md:visible text-black bg-gray-200 border w-full lg:w-48 sm:h-screen flex justify-center p-4">
          <h3 className="text-lg">Produkter</h3>
        </aside>
        <ProductTable />
      </div>
    </>
  );
}

export default Admin;
