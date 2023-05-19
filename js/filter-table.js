// filter-table.js
function filterTable() {
    // Get input elements
    var coreCount = document.getElementById("coreCountFilter").value.toLowerCase();
    var memory = document.getElementById("memoryFilter").value.toLowerCase();
    var ssdStorage = document.getElementById("ssdStorageFilter").value.toLowerCase();
    var hddStorage = document.getElementById("hddStorageFilter").value.toLowerCase();
    var graphicsCard = document.getElementById("graphicsCardFilter").value.toLowerCase();
    var priceMin = parseInt(document.getElementById("priceMinFilter").value);
    var priceMax = parseInt(document.getElementById("priceMaxFilter").value);
  
    // Get table rows
    var rows = document.querySelectorAll("tbody tr");
  
    // Loop through rows and hide those that don't match the filters
    for (var i = 0; i < rows.length; i++) {
      var coreCountCol = rows[i].querySelectorAll("td")[1];
      var memoryCol = rows[i].querySelectorAll("td")[3];
      var ssdStorageCol = rows[i].querySelectorAll("td")[4];
      var hddStorageCol = rows[i].querySelectorAll("td")[5];
      var graphicsCardCol = rows[i].querySelectorAll("td")[6];
      var priceCol = rows[i].querySelectorAll("td")[7];
  
      if (coreCount !== "all" && coreCountCol && coreCountCol.textContent.toLowerCase() !== coreCount) {
        rows[i].style.display = "none";
      } else if (memory !== "all" && memoryCol && memoryCol.textContent.toLowerCase() !== memory) {
        rows[i].style.display = "none";
      } else if (ssdStorage !== "all" && ssdStorageCol && ssdStorageCol.textContent.toLowerCase() !== ssdStorage) {
        rows[i].style.display = "none";
      } else if (hddStorage !== "all" && hddStorageCol && hddStorageCol.textContent.toLowerCase() !== hddStorage) {
        rows[i].style.display = "none";
      } else if (graphicsCard !== "all" && graphicsCardCol && graphicsCardCol.textContent.toLowerCase() !== graphicsCard) {
        rows[i].style.display = "none";
      } else if (priceMin && priceCol && parseInt(priceCol.textContent) < priceMin) {
        rows[i].style.display = "none";
      } else if (priceMax && priceCol && parseInt(priceCol.textContent) > priceMax) {
        rows[i].style.display = "none";
      } else {
        rows[i].style.display = "";
      }
    }
  }
  