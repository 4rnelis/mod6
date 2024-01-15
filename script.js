document.addEventListener('DOMContentLoaded', (event) => {
    const videoContainer = document.getElementById('video-container');
    const videoPreview = document.getElementById('video-preview');
    const switchCameraButton = document.getElementById('switch-camera');
    const scanButton = document.getElementById('take-photo');
    const galleryButton = document.getElementById('gallery');

    let isFrontCamera = true;
    let capturedImages = [];

    switchCameraButton.addEventListener('click', () => {
        isFrontCamera = !isFrontCamera;
        initializeCamera();
    });

    const initializeCamera = () => {
        const videoConstraints = isFrontCamera ? { facingMode: 'user' } : { facingMode: { exact: 'environment' } };

        navigator.mediaDevices.getUserMedia({ video: videoConstraints })
            .then((stream) => {
                videoPreview.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    };

    initializeCamera();

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

// document.addEventListener('DOMContentLoaded', (event) => {
//     const videoContainer = document.getElementById('video-container');
//     const videoPreview = document.getElementById('video-preview');
//     const scanButton = document.getElementById('take-photo');
//     const galleryButton = document.getElementById('gallery');

//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then((stream) => {
//             videoPreview.srcObject = stream;
//         })
//         .catch((error) => {
//             console.error('Error accessing camera:', error);
//         });

//     let capturedImages = [];

//     scanButton.addEventListener('click', () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = videoPreview.videoWidth;
//         canvas.height = videoPreview.videoHeight;
//         const context = canvas.getContext('2d');
//         context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

//         const imageDataURL = canvas.toDataURL('image/png');

//         capturedImages.push(imageDataURL);

//         console.log('Captured Image:', imageDataURL);
//     });

//     galleryButton.addEventListener('click', () => {
//         localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

//         window.location.href = 'gallery.html';
//     });
// });
