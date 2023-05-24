    // Function to handle both filtering and sorting
    function updateTable() {
        filterTable();
        sortTable();
        adjustSortByWidth(); // Add this line to adjust the width of the select element
      }
      
      // Adjust the width of the Sort By select element based on the selected option
      function adjustSortByWidth() {
        var sortBySelect = document.getElementById("sort-by");
        var selectedOption = sortBySelect.options[sortBySelect.selectedIndex];
      
        // Create a temporary span element to measure the width of the selected option text
        var tempSpan = document.createElement("span");
        tempSpan.textContent = selectedOption.textContent;
        tempSpan.style.visibility = "hidden";
        tempSpan.style.whiteSpace = "nowrap";
        document.body.appendChild(tempSpan);
      
        // Calculate the width of the select element based on the width of the selected option text
        var optionWidth = tempSpan.offsetWidth;
        var extraWidth = 60; // Adjust this value to increase/decrease the extra width
        var selectWidth = optionWidth + extraWidth;
      
        // Set the width of the select element
        sortBySelect.style.width = selectWidth + "px";
      
        // Remove the temporary span element
        document.body.removeChild(tempSpan);
      }
      
      
      // Event listener for the "Sort By" dropdown change
      var sortBySelect = document.getElementById("sort-by");
      sortBySelect.addEventListener("change", updateTable);
      
      // Call the adjustSortByWidth function initially to set the initial width of the Sort By select element
      adjustSortByWidth();