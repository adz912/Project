document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
  
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
  
    // Send a POST request to the server
    fetch('/contact', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          // Email sent successfully
          return response.json().then(data => {
            if (data.success) {
              alert('Email sent successfully', 'success');
              form.reset(); // Reset the form after displaying the notification
            } else {
              alert('Error sending email', 'error');
            }
          });
        } else {
          // Error sending email
          alert('Error sending email', 'error');
        }
      })
      .catch(error => {
        console.error('An error occurred while sending the email:', error);
        alert('Error sending email', 'error');
      });
  });
  
