import { useState } from "react";

function Spots() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const spotData = [
    { id: 1, name: "Kläder", image: "/images/acid-skjortor.jpg" },
    { id: 2, name: "Skor", image: "/images/svarta-kängor.jpg" },
    { id: 3, name: "Accessoarer", image: "/images/vita-solglasögon.jpg" },
  ];

  const openModal = (spot) => {
    setSelectedSpot(spot);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSpot(null);
  };

  return (
    <div className="p-4 spots-container mx-2.5 w-full justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotData.map((spot) => (
          <div
            key={spot.id}
            className="relative group overflow-hidden cursor-pointer"
            onClick={() => openModal(spot)}
          >
            <img
              src={spot.image}
              alt={spot.name}
              className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-white opacity-100 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60 transition-all duration-500 ease-in-out">
              <span>{spot.name}</span>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedSpot.name}</h2>
            <img
              src={selectedSpot.image}
              alt={selectedSpot.name}
              className="w-80 h-auto mb-4"
            />
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Spots;
