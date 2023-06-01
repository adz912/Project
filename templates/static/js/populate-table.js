$(document).ready(function() {
  // Function to toggle the favorite status of a PC
  function toggleFavorite(pcId) {
    var button = $("#favorite-button-" + pcId);
    var isLiked = button.hasClass("liked");
    var userId = getUserId(); // Add the user's ID to the payload

    // Send an AJAX request to update the favorite status
    $.ajax({
      url: "/api/toggle-favorite",
      type: "POST",
      data: JSON.stringify({ pc_id: pcId, is_liked: isLiked, user_id: userId }),
      contentType: "application/json",
      success: function(response) {
        if (response.message === "Like toggled successfully") {
          // Update the button text and style based on the new favorite status
          if (isLiked) {
            button.text("Like");
            button.removeClass("liked");
          } else {
            button.text("Liked!");
            button.addClass("liked");
          }
        } else {
          console.log("Error toggling favorite status:", response.error);
        }
      },
      error: function() {
        console.log("Error toggling favorite status.");
      }
    });
  }

  // Function to get the user's ID
  function getUserId() {
    // Replace this with the actual method to get the current user's ID
    // e.g., retrieve it from the user session or local storage
    return 'USER_ID';
  }

  
  function populateTable() {
    $.ajax({
      url: '/get_pcs',
      type: 'GET',
      success: function (data) {
        var pcTableBody = $('#pcTableBody');
        pcTableBody.empty();
  
        for (var i = 0; i < data.length; i++) {
          var pc = data[i];
          var hddStorage = pc.hddStorage !== null ? formatStorageValue(pc.hddStorage) : 'N/A';
          var ssdStorage = pc.ssdStorage !== null ? formatStorageValue(pc.ssdStorage) : 'N/A';
          var fpsFourk = pc.fpsFourk !== null ? pc.fpsFourk + 'FPS' : 'N/A';
          var fpsTenEighty = pc.fpsTenEighty !== null ? pc.fpsTenEighty + 'FPS' : 'N/A';
          var priceToPerformance =
            pc.avgPerformance !== null && pc.price !== null ? (pc.avgPerformance / pc.price).toFixed(2) : 'N/A';
  
          var row =
            '<tr>' +
            "<td>" +
            "<div class='product-image-container'>" +
            "<img src='" +
            pc.image_url +
            "' class='product-image'>" +
            '</div>' +
            "<div class='product-text'>" +
            '<span>' +
            pc.title +
            '</span>' +
            '</div>' +
            '</td>' +
            '<td>' +
            "<button id='favorite-button-" +
            pc.pc_id +
            "' class='favorite-button " +
            (pc.is_liked ? 'liked' : '') +
            "' onclick='handleButtonClick(" +
            pc.pc_id +
            ")'>" +
            (pc.is_liked ? 'Liked!' : 'Like') +
            "</button>" +
            "</td>" +
            "<td>" + pc.cpu + "</td>" +
            "<td>" + pc.avgCPUperformance + "</td>" +
            "<td>" + pc.coreCount + "</td>" +
            "<td>" + pc.cpuBoostClock + "<td>" + pc.memory + "GB" + "</td>" +
            "<td>" + ssdStorage + "</td>" +
            "<td>" + hddStorage + "</td>" +
            "<td>" + pc.graphicsCard + "</td>" +
            "<td>" + pc.avgPerformance + "</td>" +
            "<td>" + fpsTenEighty + "</td>" +
            "<td>" + fpsFourk + "</td>" +
            "<td>" +
            "<a class='product-price-link' href='"+ pc.amazon_link + "' target='_blank'>" + 
                  "£" + pc.price +
                "</a>" +
              "</div>" +
            "</td>" +
            "<td>" + priceToPerformance + "<br>Performance/£" + "</td>" +
          "</tr>";
  
          pcTableBody.append(row);
          console.log('Populating table...');
        }
      },
      error: function () {
        console.log('Error retrieving PC data.');
      },
    });
  }
  
  function formatStorageValue(storageValue) {
    if (storageValue >= 1000) {
      var tbValue = (storageValue / 1000).toFixed(0);
      return tbValue + 'TB';
    } else {
      return storageValue + 'GB';
    }
  }
  
  // Call the populateTable function to initially populate the table
  populateTable();
});
