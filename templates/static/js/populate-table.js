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
                    var row = `<tr>
                        <td>${pc.title}</td>
                        <td>${pc.cpu}</td>
                        <td>${pc.coreCount}</td>
                        <td>${pc.cpuBoostClock}</td>
                        <td>${pc.memory}</td>
                        <td>${pc.ssdStorage}</td>
                        <td>${pc.hddStorage}</td>
                        <td>${pc.graphicsCard}</td>
                        <td>${pc.avgPerformance}</td>
                        <td>£${pc.price}</td>
                    </tr>`;

                    pcTableBody.append(row);
                }
            },
        });
    }
    // Call the populateTable function to initially populate the table
    populateTable();
});
