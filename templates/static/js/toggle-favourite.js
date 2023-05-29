function toggleFavorite(pcId, isLiked, userId) {
  const payload = {
    pc_id: pcId,
    is_liked: !isLiked, // Invert the value of isLiked
    user_id: userId // Include the user_id in the payload
  };

  fetch('/api/toggle-favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the response data

      // Update the button text and class based on the updated is_liked value
      const button = document.getElementById('favorite-button-' + pcId);
      if (data.message === 'Like toggled successfully') {
        isLiked = !isLiked; // Update the isLiked variable based on the new value

        if (isLiked) {
          button.textContent = 'Liked!';
          button.classList.add('liked');
        } else {
          button.textContent = 'Like';
          button.classList.remove('liked');
        }
      } else {
        console.log('Error toggling favorite status:', data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error
    });
}

// Function to handle the button click event
function handleButtonClick(pcId, userId) {
  const button = document.getElementById('favorite-button-' + pcId);
  const isLiked = button.classList.contains('liked');

  toggleFavorite(pcId, isLiked, userId);
}


