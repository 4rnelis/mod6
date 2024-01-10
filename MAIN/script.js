document.addEventListener('DOMContentLoaded', (event) => {
    const videoContainer = document.getElementById('video-container');
    const videoPreview = document.getElementById('video-preview');
    const scanButton = document.getElementById('scan-button');
    const galleryButton = document.getElementById('gallery-button');

    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoPreview.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });

    // Array to store captured images
    let capturedImages = [];

    // Add click event listener to the scan button
    scanButton.addEventListener('click', () => {
        // Capture a photo from the video stream
        const canvas = document.createElement('canvas');
        canvas.width = videoPreview.videoWidth;
        canvas.height = videoPreview.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

        // Convert the captured image to a data URL
        const imageDataURL = canvas.toDataURL('image/png');

        // Store the captured image
        capturedImages.push(imageDataURL);

        // You can now use `imageDataURL` for further processing or send it to a server
        console.log('Captured Image:', imageDataURL);
    });

    // Add click event listener to the gallery button
    galleryButton.addEventListener('click', () => {
        // Store captured images in localStorage
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

        // Redirect to the gallery page
        window.location.href = 'gallery.html';
    });
});
