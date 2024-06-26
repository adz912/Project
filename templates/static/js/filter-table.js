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

  var minPrice = parseFloat(document.getElementById("price-min").value);
  var maxPrice = parseFloat(document.getElementById("price-max").value);

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
    var price = parseFloat(cells[13].textContent.replace("£", ""));

    var matchSearch = name.includes(filter) || filter === "";
    var matchCPU = selectedCPU.length === 0 || selectedCPU.some(option => cpu.includes(option));
    var matchGraphics = selectedGraphics.length === 0 || selectedGraphics.some(option => graphics.includes(option));
    var matchCoreCount = selectedCoreCount.length === 0 || selectedCoreCount.includes(coreCount);
    var matchMemory = selectedMemory.length === 0 || selectedMemory.some(option => memory.includes(option));
    var matchSSD = selectedSSD.length === 0 || selectedSSD.some(option => ssdStorage.includes(option));
    var matchHDD = selectedHDD.length === 0 || selectedHDD.some(option => hddStorage.includes(option));
    var matchPrice = (isNaN(minPrice) || price >= minPrice) && (isNaN(maxPrice) || price <= maxPrice);

    if (matchSearch && matchCPU && matchGraphics && matchCoreCount && matchMemory && matchSSD && matchHDD && matchPrice) {
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
        var priceA = parseFloat(a.cells[13].textContent.replace("£", ""));
        var priceB = parseFloat(b.cells[13].textContent.replace("£", ""));
        return priceB - priceA;
      });
      break;
    case "price-low-high":
      sortedRows.sort(function (a, b) {
        var priceA = parseFloat(a.cells[13].textContent.replace("£", ""));
        var priceB = parseFloat(b.cells[13].textContent.replace("£", ""));
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
      case "1080-fps-high-low":
        sortedRows.sort(function (a, b) {
          var fps1080A = convertFPStoInteger(a.cells[11].textContent);
          var fps1080B = convertFPStoInteger(b.cells[11].textContent);
          return fps1080B - fps1080A;
        });
        break;
      case "1080-fps-low-high":
        sortedRows.sort(function (a, b) {
          var fps1080A = convertFPStoInteger(a.cells[11].textContent);
          var fps1080B = convertFPStoInteger(b.cells[11].textContent);
          return fps1080A - fps1080B;
        });
        break;
        case "4k-fps-high-low":
          sortedRows.sort(function(a, b) {
            var fps4kA = convertFPStoInteger(a.cells[12].textContent);
            var fps4kB = convertFPStoInteger(b.cells[12].textContent);
            return fps4kB - fps4kA;
          });
          break;
        case "4k-fps-low-high":
          sortedRows.sort(function(a, b) {
            var fps4kA = convertFPStoInteger(a.cells[12].textContent);
            var fps4kB = convertFPStoInteger(b.cells[12].textContent);
            return fps4kA - fps4kB;
          });
          break;
          case "price-performance-high-low":
          sortedRows.sort(function(a, b) {
            var ppA = parseFloat(a.cells[14].textContent);
            var ppB = parseFloat(b.cells[14].textContent);
            return ppB - ppA;
          });
          break;
        case "price-performance-low-high":
          sortedRows.sort(function(a, b) {
            var ppA = parseFloat(a.cells[14].textContent);
            var ppB = parseFloat(b.cells[14].textContent);
            return ppA - ppB;
          });
          break;
    default:
      // No sorting needed
      return;
  }

  function filterByPrice() {
    var minPrice = parseFloat(document.getElementById("price-min").value);
    var maxPrice = parseFloat(document.getElementById("price-max").value);
    var table = document.getElementById("pcTableBody");
    var rows = table.getElementsByTagName("tr");
  
    for (var i = 0; i < rows.length; i++) {
      var priceCell = rows[i].getElementsByTagName("td")[13]; // Price cell is in the 14th column
  
      if (priceCell) {
        var price = parseFloat(priceCell.textContent.replace("£", ""));
  
        if ((isNaN(minPrice) || price >= minPrice) && (isNaN(maxPrice) || price <= maxPrice)) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
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

// Function to convert fps value to 0 if N/A
function convertFPStoInteger(fpsValue) {
  if (fpsValue === "N/A") {
    return 0;
  }
  return parseInt(fpsValue);
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


// Attach event listeners to filter input, sort select, and price range inputs
var filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", filterTable);

var sortBySelect = document.getElementById("sort-by");
sortBySelect.addEventListener("change", sortTable);

var priceMinInput = document.getElementById("price-min");
priceMinInput.addEventListener("input", filterByPrice);

var priceMaxInput = document.getElementById("price-max");
priceMaxInput.addEventListener("input", filterByPrice);


function handleGoButtonClick() {
  filterTable();
  filterByPrice();
  sortTable();
}


// Add event listener to the "Go" button
document.getElementById("go-button").addEventListener("click", handleGoButtonClick);