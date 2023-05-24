function filterTable() {
  var filterInput = document.getElementById("filterInput");
  var cpuFilter = document.getElementById("cpu");
  var coreCountFilter = document.getElementById("coreCountFilter");
  var cpuClockFilter = document.getElementById("cpu-clock");
  var priceRangeFilter = document.getElementById("price-range");
  var memoryFilter = document.getElementById("memory");
  var ssdFilter = document.getElementById("ssd");
  var hddFilter = document.getElementById("hdd");
  var graphicsFilter = document.getElementById("graphics");

  var filter = filterInput.value.toUpperCase();
  var cpuValue = cpuFilter.value.toUpperCase();
  var coreCountValue = coreCountFilter.value;
  var cpuClockValue = parseFloat(cpuClockFilter.value);
  var priceRangeValue = parseFloat(priceRangeFilter.value);
  var memoryValue = memoryFilter.value;
  var ssdValue = ssdFilter.value;
  var hddValue = hddFilter.value;
  var graphicsValue = graphicsFilter.value.toUpperCase();

  var table = document.getElementById("pcTableBody");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName("td");
    var name = cells[0].textContent.toUpperCase();
    var cpu = cells[1].textContent.toUpperCase();
    var coreCount = parseInt(cells[2].textContent);
    var cpuClock = parseFloat(cells[3].textContent);
    var price = parseFloat(cells[9].textContent);
    var memory = cells[4].textContent;
    var ssdStorage = cells[5].textContent;
    var hddStorage = cells[6].textContent;
    var graphicsCard = cells[7].textContent.toUpperCase();

    var matchFilters =
      cpu.includes(cpuValue) ||
      coreCount === parseInt(coreCountValue) ||
      (cpuClock >= cpuClockValue || isNaN(cpuClockValue)) ||
      (price <= priceRangeValue || isNaN(priceRangeValue)) ||
      memory.includes(memoryValue) ||
      ssdStorage.includes(ssdValue) ||
      hddStorage.includes(hddValue) ||
      graphicsCard.includes(graphicsValue);

    var matchSearch = name.includes(filter) || filter === "";

    if (matchFilters && matchSearch) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}




function sortTable() {
  var sortBySelect = document.getElementById("sort-by");
  var sortByValue = sortBySelect.value;

  var table = document.getElementById("pcTableBody");
  var rows = table.getElementsByTagName("tr");

  var sortedRows = Array.from(rows);

  // Perform the sorting based on the selected option
  switch (sortByValue) {
    case "price-high-low":
      sortedRows.sort(function (a, b) {
        var priceA = parseFloat(a.cells[10].textContent.replace("£", ""));
        var priceB = parseFloat(b.cells[10].textContent.replace("£", ""));
        return priceB - priceA;
      });
      break;
    case "price-low-high":
      sortedRows.sort(function (a, b) {
        var priceA = parseFloat(a.cells[10].textContent.replace("£", ""));
        var priceB = parseFloat(b.cells[10].textContent.replace("£", ""));
        return priceA - priceB;
      });
      break;
    case "performance-high-low-cpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[2].textContent);
        var performanceB = parseFloat(b.cells[2].textContent);
        if (performanceA < performanceB) return 1;
        if (performanceA > performanceB) return -1;
        return 0;
      });
      break;
    case "performance-low-high-cpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[2].textContent);
        var performanceB = parseFloat(b.cells[2].textContent);
        if (performanceA < performanceB) return -1;
        if (performanceA > performanceB) return 1;
        return 0;
      });
      break;
    case "performance-high-low-gpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[9].textContent);
        var performanceB = parseFloat(b.cells[9].textContent);
        if (performanceA < performanceB) return 1;
        if (performanceA > performanceB) return -1;
        return 0;
      });
      break;
    case "performance-low-high-gpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[9].textContent);
        var performanceB = parseFloat(b.cells[9].textContent);
        if (performanceA < performanceB) return -1;
        if (performanceA > performanceB) return 1;
        return 0;
      });
      break;
    default:
      // No sorting needed
      return;
  }

  // Clear the table body
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Append the sorted rows back to the table body
  sortedRows.forEach(function (row) {
    table.appendChild(row);
  });
}

// Function to handle both filtering and sorting
function updateTable() {
  filterTable();
  sortTable();
}

// Event listener for the "Sort By" dropdown change
var sortBySelect = document.getElementById("sort-by");
sortBySelect.addEventListener("change", updateTable);

