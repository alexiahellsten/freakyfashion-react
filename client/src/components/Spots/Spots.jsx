function Spots() {
  // TODO: Lägg till Slideshow?

  const spotData = [
    { id: 1, name: "Kläder", image: "/images/acid-skjortor.jpg" },
    { id: 2, name: "Skor", image: "/images/svarta-kängor.jpg" },
    { id: 3, name: "Accessoarer", image: "/images/vita-solglasögon.jpg" },
  ];

  return (
    <div className="p-4 spots-container hidden mx-2.5 w-full justify-center items-center lg:visible lg:flex lg:gap-2.5">
      {spotData.map((spot) => {
        return (
          <a href="#" key={spot.id}>
            <figure className="relative">
              <img
                src={spot.image}
                alt={spot.name}
                width="400"
                height="300"
                className="max-w-full object-cover"
              />
              <figcaption className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-white">
                {spot.name}
              </figcaption>
            </figure>
          </a>
        );
      })}
    </div>
  );
}

export default Spots;
