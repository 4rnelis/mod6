// function handleClick(element) {
//     if (element.id === 'take-photo') {
//         window.location.href = 'your_first_page.html'; // Replace with your desired URL for the first SVG
//     } else if (element.id === 'svgButton2') {
//         window.location.href = 'your_second_page.html'; // Replace with your desired URL for the second SVG
//     }
// }

document.addEventListener('DOMContentLoaded', (event) => {
    const videoContainer = document.getElementById('video-container');
    const videoPreview = document.getElementById('video-preview');
    const scanButton = document.getElementById('take-photo');
    const galleryButton = document.getElementById('gallery');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoPreview.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });

    let capturedImages = [];

    scanButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoPreview.videoWidth;
        canvas.height = videoPreview.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL('image/png');

        capturedImages.push(imageDataURL);

        console.log('Captured Image:', imageDataURL);
    });

    galleryButton.addEventListener('click', () => {
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

        window.location.href = 'gallery.html';
    });
});