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
    var cpu = cells[1].textContent.toUpperCase();
    var graphics = cells[8].textContent.toUpperCase();
    var coreCount = cells[3].textContent;
    var memory = cells[5].textContent;
    var ssdStorage = cells[6].textContent;
    var hddStorage = cells[7].textContent;

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
        return performanceB - performanceA;
      });
      break;
    case "performance-low-high-cpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[2].textContent);
        var performanceB = parseFloat(b.cells[2].textContent);
        return performanceA - performanceB;
      });
      break;
    case "performance-high-low-gpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[9].textContent);
        var performanceB = parseFloat(b.cells[9].textContent);
        return performanceB - performanceA;
      });
      break;
    case "performance-low-high-gpu":
      sortedRows.sort(function (a, b) {
        var performanceA = parseFloat(a.cells[9].textContent);
        var performanceB = parseFloat(b.cells[9].textContent);
        return performanceA - performanceB;
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

// Attach event listeners to filter input and sort select
var filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", filterTable);

var sortBySelect = document.getElementById("sort-by");
sortBySelect.addEventListener("change", sortTable);
