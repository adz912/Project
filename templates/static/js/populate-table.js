$(document).ready(function() {
    // Function to toggle the favorite status of a PC
    function toggleFavorite(pcId) {
        var button = $("#favorite-button-" + pcId);
        var isLiked = button.hasClass("liked");

        // Send an AJAX request to update the favorite status
        $.ajax({
            url: "/api/toggle-favorite",
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
            url: "/get_pcs",  // Endpoint to retrieve PC data from the database
            type: "GET",
            success: function(data) {
                var pcTableBody = $("#pcTableBody");

                // Clear the table body before populating with new data
                pcTableBody.empty();

                // Iterate over the data and create table rows
                for (var i = 0; i < data.length; i++) {
                    var pc = data[i];
                    var hddStorage = pc.hddStorage !== null ? pc.hddStorage : "N/A";  // Check if HDD Storage is null

                    var row = "<tr>" +
                        "<td>" +
                        "<div class='product-image-container'>" +
                            "<img src='" + pc.image_url + "' class='product-image'>" +
                        "</div>" +
                        "<div class='product-text'>" +
                            "<span>" + pc.title + "</span>" +
                            "<span>" + "</span>" +
                        "</div>" +
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
                        "<td>" + pc.ssdStorage + "</td>" +
                        "<td>" + hddStorage + "</td>" +
                        "<td>" + pc.graphicsCard + "</td>" +
                        "<td>" + pc.avgPerformance + "</td>" +
                        "<td>" +
                            "<a href='" + pc.amazon_link + "' target='_blank' class='price-link'>" +
                                "£" + pc.price +
                            "</a>" +
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