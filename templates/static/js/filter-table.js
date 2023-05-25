function filterTable() {
  var filterInput = document.getElementById("filterInput");
  var filter = filterInput.value.toUpperCase();

  var table = document.getElementById("pcTableBody");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cells = row.getElementsByTagName("td");
    var name = cells[0].textContent.toUpperCase();

    var matchSearch = name.includes(filter) || filter === "";

    if (matchSearch) {
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
