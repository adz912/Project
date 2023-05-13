// Get the table body element
const tbody = document.querySelector('tbody');

// Fetch data from the database
fetch('/data')
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create a row for each item
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.title}</td>
        <td>${item.core_count}</td>
        <td>${item.cpu_boost_clock}</td>
        <td>${item.memory}</td>
        <td>${item.ssd_storage}</td>
        <td>${item.hdd_storage}</td>
        <td>${item.graphics_card}</td>
        <td>${item.price}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error(error);
  });
