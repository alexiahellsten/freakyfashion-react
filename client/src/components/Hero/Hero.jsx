function Hero({ heroTitle, heroDescription, heroImage }) {
  return (
    <section className="flex justify-center items-center lg:p-2.5 lg:items-start lg:flex-row-reverse lg:flex-nowrap">
      <div className="p-2 mt-4 flex flex-col justify-center items-center sm:w-full lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="lg:order-2">
          <figure className="max-w-md mx-auto">
            <div className="image-container w-full h-auto relative">
              <img
                src={heroImage}
                alt={heroTitle}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </figure>
        </div>

        <div className="lg:order-1">
          <h1 className="text-xl mt-4 text-center sm:text-2xl lg:text-3xl font-semibold p-2">
            {heroTitle}
          </h1>
          <p className="p-2">{heroDescription}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
