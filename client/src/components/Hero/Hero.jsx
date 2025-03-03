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
    <section className="hero flex justify-center items-center lg:p-2.5 lg:items-start lg:flex-row-reverse lg:flex-nowrap">
      <div className="hero-container p-2 mt-4 flex flex-col justify-center items-center sm:w-full lg:items-start lg:flex-row-reverse lg:flex-nowrap lg:mt-7.5">
        <figure className="relative">
          <img
            src={heroImage}
            alt={hero.title || "Hero Image"}
            width="600"
            height="400"
            className="min-w-full"
          />
        </figure>

        <div className="hero-text-container lg:flex-wrap lg:w-1/2 lg:mt-7.5">
          <h1 className="text-xl mt-4 text-center sm:text-2xl lg:text-3xl font-semibold p-2">
            {hero.title}
          </h1>
          <p className="p-2 md:mr-4">{hero.description}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
