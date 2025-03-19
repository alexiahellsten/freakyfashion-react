const form = document.querySelector("form");

form.addEventListener("submit", function (event){
    event.preventDefault();

    const form = new FormData(event.target);

    const product = {
        name: form.get("name"),
        description: form.get("description"),
        image: form.get("image"),
        sku: form.get("sku"),
        brand: form.get("brand"),
        price: form.get("price"),
        registrationDate: form.get("registrationDate"),
    }

    fetch("/admin/products/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte skapa produkten.");
        }
        return response.json();
      })
      .then((data) => {
        window.location.href = data.redirectUrl;
      })
    console.log(product);
});