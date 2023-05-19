// Get the table body element
const tbody = document.getElementById('comparison-table-body');

// Fetch data from the server
fetch('/get-products') // Updated URL
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create a row for each item
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.cpu}</td>
        <td>${item.coreCount}</td>
        <td>${item.cpuBoostClock}</td>
        <td>${item.memory}</td>
        <td>${item.ssdStorage}</td>
        <td>${item.hddStorage}</td>
        <td>${item.graphicsCard}</td>
        <td>${item.avgPerformance}</td>
        <td>${item.price}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error(error);
  });
