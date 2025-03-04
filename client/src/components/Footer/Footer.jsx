import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// TODO: Ersätt med faktiska länkar
function Footer() {
  return (
    <footer className="text-center bg-purple-200 p-6 mt-10">
      <Accordion
        type="single"
        collapsible
        className="block sm:hidden lg:hidden text-left"
      >
        <AccordionItem value="shopping">
          <AccordionTrigger className="w-full text-left text-lg font-semibold px-4 py-2 bg-purple-200 hover:bg-purple-300 focus:outline-none transition-colors">
            Shopping
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <nav aria-label="secondary-navigation">
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Vinterjackor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Pufferjackor
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Kappa
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Trenchcoats
                  </a>
                </li>
              </ul>
            </nav>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mina-sidor">
          <AccordionTrigger className="w-full text-left px-4 py-2 text-lg font-semibold  bg-purple-200 hover:bg-purple-300 focus:outline-none transition-colors">
            Mina Sidor
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <nav aria-label="secondary-navigation">
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Mina Ordrar
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Mitt Konto
                  </a>
                </li>
              </ul>
            </nav>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kundtjanst">
          <AccordionTrigger className="w-full text-left px-4 py-2 text-lg font-semibold  bg-purple-200 hover:bg-purple-300 focus:outline-none transition-colors">
            Kundtjänst
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <nav aria-label="secondary-navigation">
              <ul>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Returnpolicy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black no-underline hover:underline"
                  >
                    Integritetspolicy
                  </a>
                </li>
              </ul>
            </nav>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <section className="footer-nav hidden sm:flex lg:flex justify-start ml-0 text-left text-base whitespace-nowrap">
        <div className="container">
          <h3 className="text-lg font-semibold">Shopping</h3>
          <nav aria-label="footer-navigation">
            <ul>
              <li>
                <a href="#" className="no-underline text-black">
                  Vinterjackor
                </a>
              </li>
              <li>
                <a href="#" className="no-underline text-black">
                  Pufferjackor
                </a>
              </li>
              <li>
                <a href="#" className="no-underline text-black">
                  Kappa
                </a>
              </li>
              <li>
                <a href="#" className="no-underline text-black">
                  Trenchcoats
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="container">
          <h3 className="text-lg font-semibold">Mina Sidor</h3>
          <nav aria-label="footer-navigation">
            <ul>
              <li>
                <a href="#" className="no-underline text-black">
                  Mina Ordrar
                </a>
              </li>
              <li>
                <a href="#" className="no-underline text-black">
                  Mitt Konto
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="container">
          <h3 className="text-lg font-semibold">Kundtjänst</h3>
          <nav aria-label="footer-navigation">
            <ul>
              <li>
                <a href="#" className="no-underline text-black">
                  Returnpolicy
                </a>
              </li>
              <li>
                <a href="#" className="no-underline text-black">
                  Integritetspolicy
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <span>© Freaky Fashion</span>
    </footer>
  );
}

export default Footer;
