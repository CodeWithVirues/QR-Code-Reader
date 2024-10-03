const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const startButton = document.getElementById('start-button');
const context = canvas.getContext('2d');
const toggleButton = document.getElementById('navbar-toggle');
// const navbarLinks = document.getElementById('navbar-links');
const sidebar = document.getElementById('sidebar');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});


// Start the camera
startButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
        });
});

// Scan QR code
video.addEventListener('play', () => {
    const scanQRCode = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            // Set canvas dimensions to video dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            // Draw the current video frame to the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Get image data from canvas and detect QR code
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            
            if (code) {
                // Display QR code result
                result.innerHTML = `<a href="${code.data}" target="_blank">${code.data}</a>`;
            }
        }
        requestAnimationFrame(scanQRCode);
    };
    scanQRCode();
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a mailto link
    const mailtoLink = `mailto:virendrameghwal2019@gmail.com?subject=Contact from ${firstName} ${lastName}&body=Email: ${email}%0AMessage: ${message}`;

    // Open the mailto link in the user's email client
    window.location.href = mailtoLink;
});
