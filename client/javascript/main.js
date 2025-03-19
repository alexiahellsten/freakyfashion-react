  document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  });
  

async function deleteProduct(slug) {
  try {
    const response = await fetch(`/admin/products/${slug}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log("Produkt raderad.");
      renderProducts(); 

      console.error("Kunde inte radera produkten.");
    }
  } catch (error) {
    console.error("Fel vid försök att radera produkten", error);
  }
}
