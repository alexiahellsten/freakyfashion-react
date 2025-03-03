import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/hero?populate=*`)
      .then((res) => res.json())
      .then((data) => setHero(data.data))
      .catch(console.error);
  }, []);

  if (!hero) return <p>Hero section not available.</p>;

  const heroImage = hero.image?.formats?.large?.url
    ? `${API_URL.replace("/api", "")}${hero.image.formats.large.url}`
    : "https://placehold.co/600x400?text=Image+Not+Found";

  return (
    <section className="flex justify-center items-center lg:p-2.5 lg:items-start lg:flex-row-reverse lg:flex-nowrap">
      <div className="p-2 mt-4 flex flex-col justify-center items-center sm:w-full lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="lg:order-2">
          <figure className="max-w-md mx-auto">
            <img
              src={heroImage}
              alt={hero.title || "Hero Image"}
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>

        <div className="lg:order-1">
          <h1 className="text-xl mt-4 text-center sm:text-2xl lg:text-3xl font-semibold p-2">
            {hero.title}
          </h1>
          <p className="p-2">{hero.description[0]?.children[0]?.text}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
