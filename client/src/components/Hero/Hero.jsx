function Hero() {
  const heroTitle = "Hållbart mode";
  const heroDescription = `Upptäck Freaky Fashion – unika, miljövänliga plagg & accessoarer,
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
              framtid. Freaky Fashion - där stil och samvete möts.`;
  const heroImage = "/images/vit-blus.jpg";

  return (
    <section className="flex justify-center items-center lg:p-2.5 lg:items-start lg:flex-row-reverse lg:flex-nowrap">
      <div className="p-2 mt-4 flex flex-col justify-center items-center sm:w-full lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="lg:order-2">
          <figure className="max-w-md mx-auto">
            <img
              src={heroImage}
              alt={heroTitle || "Hero Image"}
              className="w-full h-auto object-cover"
            />
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
