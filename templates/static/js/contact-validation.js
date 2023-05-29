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
              // Set success message
              document.getElementById('notification').classList.add('success');
              document.getElementById('notification').textContent = 'Email sent successfully';
              form.reset(); // Reset the form after displaying the notification
            } else {
              // Set error message
              document.getElementById('notification').classList.add('error');
              document.getElementById('notification').textContent = 'Error sending email';
            }
          });
        } else {
          // Error sending email
          document.getElementById('notification').classList.add('error');
          document.getElementById('notification').textContent = 'Error sending email';
        }
      })
      .catch(error => {
        console.error('An error occurred while sending the email:', error);
        // Set error message
        document.getElementById('notification').classList.add('error');
        document.getElementById('notification').textContent = 'Error sending email';
      });    
  });
  
