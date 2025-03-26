import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useBasket } from "../../contexts/BasketContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = "http://localhost:8000";

const ProductPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useBasket();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToBasket = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: uuidv4(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
    navigate("/basket");
  };

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/products/${slug}`);
        const data = await response.json();

        if (data && data.product) {
          setProduct(data.product);
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
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setAllProducts(data);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    }

    fetchAllProducts();
  }, [product]);

  useEffect(() => {
    if (!product || allProducts.length === 0) return;

    const similar = allProducts.filter((p) => {
      if (p.slug === slug) return false;
      return (
        p.category &&
        p.category.toLowerCase() === product.category.toLowerCase()
      );
    });

    setSimilarProducts(
      similar.length > 0 ? similar.slice(0, 8) : allProducts.slice(0, 8)
    );
  }, [product, allProducts, slug]);

  if (isLoading) return <div>Laddar...</div>;
  if (!product) return <div>Hittade inte några produkter.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 lg:w-1/3 p-4">
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <CardContent className="md:w-1/2 lg:w-2/3 p-6 space-y-4">
            <h2 className="text-3xl font-semibold">{product.name}</h2>
            <p className="text-lg text-gray-600">{product.brand}</p>
            <p className="text-base text-gray-700">{product.description}</p>
            <p className="text-2xl font-bold text-gray-900">
              {product.price} SEK
            </p>
            <Button
              onClick={addToBasket}
              className="w-full sm:w-2/3 md:w-1/2 lg:w-1/4 px-4 py-2 mt-2 text-base"
            >
              Lägg till i varukorg
            </Button>
          </CardContent>
        </div>
      </Card>

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
              <SwiperSlide key={uuidv4()}>
                <Link
                  to={`/products/${p.slug}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={`/images/${p.image}`}
                    alt={p.name}
                    className="w-full max-h-[500px] object-cover rounded-lg"
                    loading="lazy"
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
