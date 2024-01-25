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


    function handleClick(element) {
        element.classList.add('clicked');
        setTimeout(() => {
            element.classList.remove('clicked');
        }, 400);

        if (element.id === 'take-photo') {
            const canvas = document.createElement('canvas');
            canvas.width = videoPreview.videoWidth;
            canvas.height = videoPreview.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

            const imageDataURL = canvas.toDataURL('image/png');

            capturedImages.push(imageDataURL);

            console.log('Captured Image:', imageDataURL);
        } else if (element.id === 'gallery') {
            localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

            window.location.href = 'gallery.html';
        }
    }

//     function handleClick(element) {
//     element.classList.add('clicked');
//     setTimeout(() => {
//         element.classList.remove('clicked');
//     }, 400);
//
//     if (element.id === 'take-photo') {
//         const canvas = document.createElement('canvas');
//         canvas.width = videoPreview.videoWidth;
//         canvas.height = videoPreview.videoHeight;
//         const context = canvas.getContext('2d');
//         context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);
//
//         // Convert to Blob instead of base64
//         canvas.toBlob((blob) => {
//             const file = new File([blob], `captured_image_${capturedImages.length + 1}.png`, { type: 'image/png' });
//             capturedImages.push(file);
//
//             console.log('Captured Image:', file);
//         }, 'image/png');
//     } else if (element.id === 'gallery') {
//         localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
//
//
//         window.location.href = 'gallery.html';
//     }
// }

    scanButton.addEventListener('click', () => {
        handleClick(scanButton);
    });

    galleryButton.addEventListener('click', () => {
        handleClick(galleryButton);
    });
});