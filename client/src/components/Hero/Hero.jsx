function Hero() {
  return (
    <>
      <section className="hero flex justify-center items-center lg:p-2.5 lg:items-start lg:flex-row-reverse lg:flex-nowrap">
        <div className="hero-container p-2 mt-4 flex flex-col justify-center items-center sm:w-full lg:items-start lg:flex-row-reverse lg:flex-nowrap lg:mt-7.5">
          <figure className="relative">
            {/* TODO: importera rätt Hero-bild från Strapi */}
            <img
              src="https://placehold.co/600x400.png"
              alt="A hero image"
              width="600"
              height="400"
              className="max-w-full object-cover"
            />
          </figure>

          <div className="hero-text-container lg:flex-wrap lg:w-1/2 lg:mt-7.5">
            <h1 className="text-xl mt-4 text-center sm:text-2xl lg:text-3xl font-semibold p-2">
              Hållbart mode
            </h1>
            <p className="p-2">
              Upptäck Freaky Fashion – unika, miljövänliga plagg & accessoarer,
              skapade med stil och rättvisa i fokus. Hos Freaky Fashion
              kombinerar vi unik design med omtanke för både människor och
              planeten. Våra kläder och accessoarer tillverkas småskaligt av
              högkvalitativa, miljövänliga material, vilket innebär hållbarhet
              utan att kompromissa med stil. Genom rättvis produktion
              säkerställer vi att alla som är involverade i processen får
              rättvis ersättning och arbetar under etiska förhållanden. Varje
              produkt är noggrant framtagen för att kännas lika bra som den ser
              ut. När du handlar hos oss investerar du i plagg med personlighet
              och lång livslängd, samtidigt som du bidrar till en hållbar
              framtid. Freaky Fashion – där stil och samvete möts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
