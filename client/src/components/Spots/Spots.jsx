import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Spots() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/spots?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const spotsData = data.data || [];
        setSpots(spotsData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="spots-container hidden mx-2.5 w-full justify-center items-center lg:visible lg:flex lg:gap-2.5">
      {spots.map((spot) => {
        const spotImage = spot.image[0]?.formats?.large?.url
          ? `${API_URL.replace("/api", "")}${spot.image[0].formats.large.url}`
          : "https://placehold.co/400x300?text=Not+Found";

        return (
          // TODO: Importera rätt länkar
          <a href="#" key={spot.id}>
            <figure className="relative">
              <img
                src={spotImage}
                alt={spot.title || "Spot image"}
                width="400"
                height="300"
                className="max-w-full object-cover"
              />
              <figcaption className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-black">
                {spot.title}
              </figcaption>
            </figure>
          </a>
        );
      })}
    </div>
  );
}

export default Spots;
