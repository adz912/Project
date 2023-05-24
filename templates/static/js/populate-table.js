$(document).ready(function() {
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
                        "<td>" + pc.title + "</td>" +
                        "<td>" + pc.cpu + "</td>" +
                        "<td>" + pc.avgCPUperformance + "</td>" +
                        "<td>" + pc.coreCount + "</td>" +
                        "<td>" + pc.cpuBoostClock + "</td>" +
                        "<td>" + pc.memory + "</td>" +
                        "<td>" + pc.ssdStorage + "</td>" +
                        "<td>" + hddStorage + "</td>" +
                        "<td>" + pc.graphicsCard + "</td>" +
                        "<td>" + pc.avgPerformance + "</td>" +
                        "<td>" + "£" + pc.price + "</td>" +
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
