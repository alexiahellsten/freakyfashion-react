import { useBasket } from "../../contexts/BasketContext";
// import { useNavigate } from "react-router";

function CheckoutForm() {
  const { dispatch } = useBasket();
  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate order processing
    console.log("Order placed!");

    // Clear the basket
    dispatch({ type: "CLEAR_BASKET" });

    // Redirect to confirmation page
    // navigate("/order-confirmation");
  };

  return (
    <form onSubmit={handleSubmit} className="m-2.5">
      <article className="sm:mx-4 lg:mx-6 my-6 flex flex-col min-w-full">
        <h3 className="text-center text-xl font-medium sm:text-left lg:text-left">
          Kunduppgifter
        </h3>
        <div className="sm:flex sm:gap-2">
          <div className="sm:basis-1/2 lg:basis-1/4 flex flex-col">
            <label htmlFor="firstname">Förnamn</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="border border-black rounded-none"
              required
            />
          </div>
          <div className="sm:basis-1/2 lg:basis-1/4 flex flex-col">
            <label htmlFor="lastname">Efternamn</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="border border-black rounded-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col sm:w-1/2 lg:w-1/4">
          <label htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-black rounded-none"
            required
          />
        </div>
        <fieldset className="flex flex-col my-4">
          <legend>Adress</legend>
          <label htmlFor="street">Gata</label>
          <input
            type="text"
            id="street"
            name="street"
            className="border border-black rounded-none"
            required
          />
          <label htmlFor="postalcode">Postnummer</label>
          <input
            type="number"
            id="postalcode"
            name="postalcode"
            className="border border-black rounded-none"
            required
          />
          <label htmlFor="city">Stad</label>
          <input
            type="text"
            id="city"
            name="city"
            className="border border-black rounded-none"
            required
          />
        </fieldset>
        <div className="my-4">
          <input type="checkbox" id="newsletter" name="newsletter" />
          <label htmlFor="newsletter">Jag vill ta emot nyhetsbrev</label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white rounded px-4 py-1"
          >
            Köp
          </button>
        </div>
      </article>
    </form>
  );
}

export default CheckoutForm;
