document.addEventListener('DOMContentLoaded', function() {
  fetch('/get-products')
      .then(response => response.json())
      .then(products => {
          const comparisonTableBody = document.getElementById('comparison-table-body');

          // Iterate over the products and update the name and price columns in the table
          products.forEach(product => {
              const titleCell = comparisonTableBody.querySelector(`[data-product-id="${product.id}"] .product-title`);
              const priceCell = comparisonTableBody.querySelector(`[data-product-id="${product.id}"] .product-price`);

              if (titleCell) {
                  titleCell.textContent = product.title;
              }

              if (priceCell) {
                  priceCell.textContent = product.price;
              }
          });
      })
      .catch(error => console.log(error));
});
