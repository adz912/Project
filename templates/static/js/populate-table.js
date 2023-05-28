$(document).ready(function() {
  // Function to toggle the favorite status of a PC
  function toggleFavorite(pcId) {
    var button = $("#favorite-button-" + pcId);
    var isLiked = button.hasClass("liked");

    // Send an AJAX request to update the favorite status
    $.ajax({
      url: "/toggle-favorite",
      type: "POST",
      data: { pcId: pcId, isLiked: isLiked },
      success: function(response) {
        if (response.success) {
          // Update the button text and style based on the new favorite status
          button.text(response.isLiked ? "Liked!" : "Like");
          button.toggleClass("liked");
        } else {
          console.log("Error toggling favorite status:", response.error);
        }
      },
      error: function() {
        console.log("Error toggling favorite status.");
      }
    });
  }

// Function to populate the comparison table with data
function populateTable() {
  $.ajax({
    url: "/get_pcs",
    type: "GET",
    success: function(data) {
      var pcTableBody = $("#pcTableBody");
      pcTableBody.empty();

      for (var i = 0; i < data.length; i++) {
        var pc = data[i];
        var hddStorage = pc.hddStorage !== null ? pc.hddStorage : "N/A";
        var ssdStorage = pc.ssdStorage !== null ? pc.ssdStorage : "N/A";
        var fpsFourk = pc.fpsFourk !== null ? pc.fpsFourk + "FPS" : "N/A";
        var fpsTenEighty = pc.fpsTenEighty !== null ? pc.fpsTenEighty + "FPS" : "N/A";
        var priceToPerformance = pc.avgPerformance !== null && pc.price !== null ? (pc.avgPerformance / pc.price).toFixed(2) : "N/A";

        var row = "<tr>" +
          "<td>" +
            "<div class='product-image-container'>" +
              "<img src='" + pc.image_url + "' class='product-image'>" +
            "</div>" +
            "<div class='product-text'>" +
              "<span>" + pc.title + "</span>" +
            "</div>" +
          "</td>" +
          "<td>" +
            "<button id='favorite-button-" + pc.id + "' class='favorite-button " +
            (pc.isFavorite ? "liked" : "") + "' onclick='toggleFavorite(" + pc.id + ")'>" +
            (pc.isFavorite ? "Liked!" : "Like") +
            "</button>" +
          "</td>" +
          "<td>" + pc.cpu + "</td>" +
          "<td>" + pc.avgCPUperformance + "</td>" +
          "<td>" + pc.coreCount + "</td>" +
          "<td>" + pc.cpuBoostClock + "</td>" +
          "<td>" + pc.memory + "</td>" +
          "<td>" + ssdStorage + "</td>" +
          "<td>" + hddStorage + "</td>" +
          "<td>" + pc.graphicsCard + "</td>" +
          "<td>" + pc.avgPerformance + "</td>" +
          "<td>" + fpsFourk + "</td>" +
          "<td>" + fpsTenEighty + "</td>" +
          "<td>" +
            "<div class='product-price-link'>" +
              "<a href='" + pc.amazon_link + "' target='_blank'>" +
                "£" + pc.price +
              "</a>" +
            "</div>" +
          "</td>" +
          "<td>" + priceToPerformance + "FPS/£" + "</td>" +
        "</tr>";

        pcTableBody.append(row);
        console.log("Populating table...");
      }
    },
    error: function() {
      console.log("Error retrieving PC data.");
    }
  });
}

// Call the populateTable function to initially populate the table
populateTable();

});

