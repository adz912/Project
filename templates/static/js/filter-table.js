function updateTable() {
  filterTable();
}

function filterTable() {
  var filterInput = document.getElementById("filterInput");
  var filter = filterInput.value.toUpperCase();

  var cpuOptions = document.getElementsByName("cpu-option");
  var selectedCPU = Array.from(cpuOptions)
    .filter(option => option.checked)
    .map(option => option.value.toUpperCase());

  var graphicsOptions = document.getElementsByName("graphics-option");
  var selectedGraphics = Array.from(graphicsOptions)
    .filter(option => option.checked)
    .map(option => option.value.toUpperCase());

  var coreCountOptions = document.getElementsByName("core-count");
  var selectedCoreCount = Array.from(coreCountOptions)
    .filter(option => option.checked)
    .map(option => option.value);

  var memoryOptions = document.getElementsByName("memory");
  var selectedMemory = Array.from(memoryOptions)
    .filter(option => option.checked)
    .map(option => option.value);

  var ssdOptions = document.getElementsByName("ssd");
  var selectedSSD = Array.from(ssdOptions)
    .filter(option => option.checked)
    .map(option => option.value);

  var hddOptions = document.getElementsByName("hdd");
  var selectedHDD = Array.from(hddOptions)
    .filter(option => option.checked)
    .map(option => option.value);

  var table = document.getElementById("pcTableBody");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName("td");
    var name = cells[0].textContent.toUpperCase();
    var cpu = cells[2].textContent.toUpperCase();
    var graphics = cells[9].textContent.toUpperCase();
    var coreCount = cells[4].textContent;
    var memory = cells[6].textContent;
    var ssdStorage = cells[7].textContent;
    var hddStorage = cells[8].textContent;

    var matchSearch = name.includes(filter) || filter === "";
    var matchCPU = selectedCPU.length === 0 || selectedCPU.some(option => cpu.includes(option));
    var matchGraphics = selectedGraphics.length === 0 || selectedGraphics.some(option => graphics.includes(option));
    var matchCoreCount = selectedCoreCount.length === 0 || selectedCoreCount.includes(coreCount);
    var matchMemory = selectedMemory.length === 0 || selectedMemory.some(option => memory.includes(option));
    var matchSSD = selectedSSD.length === 0 || selectedSSD.some(option => {
      if (option.endsWith("GB") && ssdStorage.endsWith("GB")) {
        var capacity = parseInt(ssdStorage);
        var selectedCapacity = parseInt(option);
        return capacity >= selectedCapacity && capacity < selectedCapacity + 256;
      } else if (option.endsWith("TB")) {
        var capacityTB = parseInt(option);
        return ssdStorage.includes(capacityTB + "TB");
      } else {
        return ssdStorage.includes(option);
      }
    });
    var matchHDD = selectedHDD.length === 0 || selectedHDD.some(option => {
      if (option.endsWith("GB") && hddStorage.endsWith("GB")) {
        var capacity = parseInt(hddStorage);
        var selectedCapacity = parseInt(option);
        return capacity >= selectedCapacity && capacity < selectedCapacity + 256;
      } else if (option.endsWith("TB")) {
        var capacityTB = parseInt(option);
        return hddStorage.includes(capacityTB + "TB");
      } else {
        return hddStorage.includes(option);
      }
    });

    if (matchSearch && matchCPU && matchGraphics && matchCoreCount && matchMemory && matchSSD && matchHDD) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}





// Sort table based on selected option
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
        var priceA = parseFloat(a.cells[11].textContent.replace("£", ""));
        var priceB = parseFloat(b.cells[11].textContent.replace("£", ""));
        return priceB - priceA;
      });
      break;
    case "price-low-high":
      sortedRows.sort(function (a, b) {
        var priceA = parseFloat(a.cells[11].textContent.replace("£", ""));
        var priceB = parseFloat(b.cells[11].textContent.replace("£", ""));
        return priceA - priceB;
      });
      break;
    case "performance-high-low-cpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[3].textContent);
        var performanceB = parseFloat(b.cells[3].textContent);
        return performanceB - performanceA;
      });
      break;
    case "performance-low-high-cpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[3].textContent);
        var performanceB = parseFloat(b.cells[3].textContent);
        return performanceA - performanceB;
      });
      break;
    case "performance-high-low-gpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[10].textContent);
        var performanceB = parseFloat(b.cells[10].textContent);
        return performanceB - performanceA;
      });
      break;
    case "performance-low-high-gpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[10].textContent);
        var performanceB = parseFloat(b.cells[10].textContent);
        return performanceA - performanceB;
      });
      break;
    case "core-count-high-low":
      sortedRows.sort(function (a, b) {
        var coreCountA = parseInt(a.cells[4].textContent);
        var coreCountB = parseInt(b.cells[4].textContent);
        return coreCountB - coreCountA;
      });
      break;
    case "core-count-low-high":
      sortedRows.sort(function (a, b) {
        var coreCountA = parseInt(a.cells[4].textContent);
        var coreCountB = parseInt(b.cells[4].textContent);
        return coreCountA - coreCountB;
      });
      break;
      case "boost-high-low":
        sortedRows.sort(function (a, b) {
          var boostA = convertBoostClockToGHz(a.cells[5].textContent);
          var boostB = convertBoostClockToGHz(b.cells[5].textContent);
          return boostB - boostA;
        });
        break;
      case "boost-low-high":
        sortedRows.sort(function (a, b) {
          var boostA = convertBoostClockToGHz(a.cells[5].textContent);
          var boostB = convertBoostClockToGHz(b.cells[5].textContent);
          return boostA - boostB;
        });
        break;
    case "memory-high-low":
      sortedRows.sort(function (a, b) {
        var memoryA = convertStorageToGB(a.cells[6].textContent);
        var memoryB = convertStorageToGB(b.cells[6].textContent);
        return memoryB - memoryA;
      });
      break;
    case "memory-low-high":
      sortedRows.sort(function (a, b) {
        var memoryA = convertStorageToGB(a.cells[6].textContent);
        var memoryB = convertStorageToGB(b.cells[6].textContent);
        return memoryA - memoryB;
      });
      break;
    case "ssd-high-low":
      sortedRows.sort(function (a, b) {
        var ssdA = convertStorageToGB(a.cells[7].textContent);
        var ssdB = convertStorageToGB(b.cells[7].textContent);
        return ssdB - ssdA;
      });
      break;
    case "ssd-low-high":
      sortedRows.sort(function (a, b) {
        var ssdA = convertStorageToGB(a.cells[7].textContent);
        var ssdB = convertStorageToGB(b.cells[7].textContent);
        return ssdA - ssdB;
      });
      break;
    case "hdd-high-low":
      sortedRows.sort(function (a, b) {
        var hddA = convertStorageToGB(a.cells[8].textContent);
        var hddB = convertStorageToGB(b.cells[8].textContent);
        return hddB - hddA;
      });
      break;
    case "hdd-low-high":
      sortedRows.sort(function (a, b) {
        var hddA = convertStorageToGB(a.cells[8].textContent);
        var hddB = convertStorageToGB(b.cells[8].textContent);
        return hddA - hddB;
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

// Function to convert CPU Boost Clock value with unit to GHz
function convertBoostClockToGHz(boostClockValue) {
  var numericValue = parseFloat(boostClockValue.replace(/[A-Za-z]/g, ""));
  var unit = boostClockValue.match(/[A-Za-z]+/)[0].toLowerCase();
  if (boostClockValue === "N/A") {
    return 0;
  }

  if (unit === "ghz") {
    return numericValue; // Already in GHz
  }

  if (unit === "mhz") {
    numericValue /= 1000; // Convert MHz to GHz
  }

  return numericValue;
}


// Function to convert storage value with unit to GB
function convertStorageToGB(storageValue) {
  var numericValue = parseFloat(storageValue.replace(/[A-Za-z]/g, ""));
  var unit = storageValue.match(/[A-Za-z]+/)[0].toLowerCase();
  if (storageValue === "N/A") {
    return 0;
  }

  if (unit === "tb") {
    numericValue *= 1024; // Convert TB to GB
  }

  return numericValue;
}

// Attach event listeners to filter input and sort select
var filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", filterTable);

var sortBySelect = document.getElementById("sort-by");
sortBySelect.addEventListener("change", sortTable);


// Filter table based on price range
function filterByPrice() {
  var minPrice = document.getElementById("price-min").value;
  var maxPrice = document.getElementById("price-max").value;

  var table = document.getElementById("pcTableBody");
  var rows = table.getElementsByTagName("tr");

  // Iterate over the rows and hide/show based on price range
  for (var i = 0; i < rows.length; i++) {
    var priceCell = rows[i].cells[11]; // Price cell is in the 11th column

    if (priceCell) {
      var price = parseFloat(priceCell.textContent.replace("£", ""));

      if ((minPrice && price < minPrice) || (maxPrice && price > maxPrice)) {
        rows[i].style.display = "none"; // Hide row if price is outside the range
      } else {
        rows[i].style.display = ""; // Show row if price is within the range
      }
    }
  }
}



// Attach event listeners to filter input, sort select, and price range inputs
var filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", filterTable);

var sortBySelect = document.getElementById("sort-by");
sortBySelect.addEventListener("change", sortTable);

var priceMinInput = document.getElementById("price-min");
priceMinInput.addEventListener("input", filterByPrice);

var priceMaxInput = document.getElementById("price-max");
priceMaxInput.addEventListener("input", filterByPrice);



