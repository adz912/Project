function toggleFavorite(pcId) {
    $(document).ready(function() {
      // Bind event listener to all like buttons
      $('.like-button').click(function(event) {
        event.preventDefault();
        var $this = $(this);
    
        // Send a POST request to the API endpoint
        $.ajax({
          url: '/api/toggle-favorite?pcId=' + pcId,
          method: 'POST',
          success: function(response) {
            // Handle the response from the server
            // Update the UI based on the new favorite status
            if (response.success) {
              // Update the UI to reflect the new favorite status
              if (response.isFavorite) {
                // Set the button as liked
                $this.addClass('liked');
              } else {
                // Set the button as unliked
                $this.removeClass('liked');
              }
            } else {
              // Handle the error case
              console.error('Failed to toggle favorite status:', response.error);
            }
          },
          error: function(xhr, status, error) {
            // Handle the AJAX request error
            console.error('AJAX request failed:', error);
          }
        });
      });
      
      // Assuming you have an API endpoint `/api/toggle-favorite` that handles the favorite toggling
      fetch(`/api/toggle-favorite?pcId=${pcId}`, {
        method: 'POST',
        // Add any required headers or authentication tokens
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          if (data.success) {
            // Update the button text based on the updated favorite status
            const button = document.querySelector(`button.favorite-button[data-pc-id="${pcId}"]`);
            if (button) {
              button.textContent = data.isFavorite ? 'Liked' : 'Like';
            }
          } else {
            // Handle any errors or display a message to the user
            console.error('Failed to toggle favorite status');
          }
        })
        .catch(error => {
          console.error('An error occurred while toggling favorite status:', error);
        });
    });
  }
  