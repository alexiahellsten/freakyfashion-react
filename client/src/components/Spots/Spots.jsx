function Spots() {
  // TODO: Importera korrekta img url från Strapi & iterera med map istället.
  //Skicka in data via props.
  return (
    <div className="spots-container hidden mx-2.5 w-full justify-center items-center lg:visible lg:flex lg:gap-2.5">
      <a href="#">
        <figure className="relative">
          <img
            src="https://placehold.co/300x180.png"
            alt="Produktfoto på en grön väska med brun rem"
            width="400"
            height="300"
            className="max-w-full object-cover"
          />
          <figcaption className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-black">
            Väskor
          </figcaption>
        </figure>
      </a>

      <a href="#">
        <figure className="relative">
          <img
            src="https://placehold.co/300x180.png"
            alt="foto på en spot med text 'Lorem Ipsum dolor'"
            width="400"
            height="300"
            className="max-w-full object-cover"
          />
          <figcaption className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-black">
            Kläder
          </figcaption>
        </figure>
      </a>

      <a href="#">
        <figure className="relative">
          <img
            src="https://placehold.co/300x180.png"
            alt="foto på en spot med text 'Lorem Ipsum dolor'"
            width="400"
            height="300"
            className="max-w-full object-cover"
          />
          <figcaption className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-black">
            Accessoarer
          </figcaption>
        </figure>
      </a>
    </div>
  );
}
export default Spots;
