import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Spots() {
  const navigate = useNavigate();

  const spotData = [
    {
      id: 1,
      name: "Kläder",
      image: "/images/acid-skjortor.jpg",
      link: "/categories/klader",
    },
    {
      id: 2,
      name: "Skor",
      image: "/images/svarta-kängor.jpg",
      link: "/categories/skor",
    },
    {
      id: 3,
      name: "Accessoarer",
      image: "/images/vita-solglasögon.jpg",
      link: "/categories/accessoarer",
    },
  ];

  return (
    <div className="hidden lg:block p-4 spots-container mx-2.5 w-full justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {spotData.map((spot) => (
          <div
            key={spot.id}
            className="relative group overflow-hidden cursor-pointer"
            onClick={() => navigate(spot.link)}
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
    </div>
  );
}

export default Spots;
