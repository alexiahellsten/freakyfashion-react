import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Navigation, Pagination } from "swiper";

const Slideshow = ({ products }) => {
  return (
    <section className="min-w-full p-2.5 hidden sm:block">
      <div className="similar-products flex justify-center mb-3">
        <h2 className="font-semibold">Liknande produkter</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="swiper mySwiper sm:w-3/4 lg:w-3/4 relative"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.slug}
            className="product-card flex flex-col items-center"
          >
            <a
              href={`/products/${product.slug}`}
              className="flex flex-col items-center w-full"
            >
              <img
                src={`../${product.image}`}
                alt={product.name}
                className="w-full max-h-[500px] object-cover rounded-lg"
              />
              <div className="product-description-container w-full p-2 box-border">
                <div className="product-description flex justify-between items-center mb-1 w-full">
                  <span className="text-base text-black">{product.name}</span>
                  <span className="text-base text-black">
                    {product.price} sek
                  </span>
                </div>
                <div className="brand-name">
                  <p className="text-left w-full">{product.brand}</p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slideshow;
