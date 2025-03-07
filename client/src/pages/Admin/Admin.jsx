import Header from "../../components/Admin/Header";
import Table from "../../components/Admin/Table";

function Admin() {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-start lg:gap-12">
        <aside className="text-black bg-neutral-200 border border-black w-full lg:w-48 sm:h-screen flex justify-center p-4">
          <h3 className="text-lg">Produkter</h3>
        </aside>
        <Table />
      </div>
    </>
  );
}

export default Admin;
