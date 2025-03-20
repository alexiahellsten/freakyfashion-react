import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = "http://localhost:8000";

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        console.log(`Fetching product with slug: ${slug}`);
        const response = await fetch(`${API_URL}/api/products/${slug}`);
        const data = await response.json();
        console.log("Full product API response:", data);

        if (data && data.product) {
          setProduct(data.product);
        } else {
          console.error("Product not found:", data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product) return;

    async function fetchAllProducts() {
      try {
        console.log("Fetching all products");
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        console.log("Full products API response:", data);

        if (data && Array.isArray(data)) {
          setAllProducts(data);
        } else {
          console.error("No products found:", data);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    }

    fetchAllProducts();
  }, [product]);

  // TODO: Fixa kategorifiltret - fungerar inte just nu
  useEffect(() => {
    if (!product || allProducts.length === 0) return;

    console.log(`Finding similar products to: ${product.name}`);
    console.log("Current product category:", product.category);

    const similar = allProducts.filter((p) => {
      if (p.slug === slug) return false;

      return (
        p.category &&
        p.category.toLowerCase() === product.category.toLowerCase()
      );
    });

    console.log(`Found ${similar.length} similar products`);

    setSimilarProducts(
      similar.length > 0 ? similar.slice(0, 8) : allProducts.slice(0, 8)
    );
  }, [product, allProducts, slug]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const imageUrl = `/images/${product.image}`;

  return (
    <div>
      <div className="product-details flex flex-col w-full">
        <article className="product-card chosen-product flex flex-col sm:flex-row p-2.5">
          <div className="image-container w-full sm:w-1/2 lg:w-1/3">
            <img src={imageUrl} alt={product.name} className="w-full" />
          </div>
          <div className="product-description-container flex flex-col justify-start w-full sm:w-1/2 lg:w-2/3 p-5 space-y-2">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-lg font-medium text-black">{product.brand}</p>
            <p className="text-base text-black mt-2">{product.description}</p>
            <p className="text-xl font-semibold text-gray-800 mt-4">
              {product.price} SEK
            </p>
            <Button
              asChild
              className="w-full sm:w-1/3 md:w-1/3 lg:w-1/5 p-1 mt-2"
            >
              <a href="#">Lägg i varukorg</a>
            </Button>
          </div>
        </article>
      </div>

      {similarProducts.length > 0 && (
        <section className="min-w-full p-2.5 hidden sm:block">
          <div className="similar-products flex justify-center mb-3">
            <h2 className="font-semibold">Liknande produkter</h2>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="swiper mySwiper sm:w-3/4 lg:w-3/4 relative"
          >
            {similarProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <Link
                  to={`/products/${p.slug}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={`/images/${p.image}`}
                    alt={p.name}
                    className="w-full max-h-[500px] object-cover rounded-lg"
                  />
                  <div className="product-description-container w-full p-2 box-border">
                    <div className="product-description flex justify-between items-center mb-1 w-full">
                      <span className="text-base text-black">{p.name}</span>
                      <span className="text-base text-black">
                        {p.price} SEK
                      </span>
                    </div>
                    <div className="brand-name">
                      <p className="text-left w-full">{p.brand}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
