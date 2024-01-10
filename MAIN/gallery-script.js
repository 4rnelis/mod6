document.addEventListener('DOMContentLoaded', (event) => {
    const galleryContainer = document.getElementById('gallery-container');
    const backButton = document.getElementById('back-button');
    const continueButton = document.getElementById('continue-button');

    // Retrieve captured images from localStorage
    let capturedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];

    // Display captured images in the gallery container
    capturedImages.forEach((imageDataURL, index) => {
        const imageElement = createImageElement(imageDataURL, index);
        galleryContainer.appendChild(imageElement);
    });

    // Add click event listener to the back button
    backButton.addEventListener('click', () => {
        // Update captured images in localStorage
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

        // Navigate back to the camera screen
        window.location.href = 'index.html';
    });

    // Add click event listener to the continue button
    continueButton.addEventListener('click', () => {
        // Update captured images in localStorage
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

        // Navigate to the edit page
        window.location.href = 'edit.html'; // Change 'edit.html' to the actual edit page
    });

    function createImageElement(imageDataURL, index) {
        const imageElement = document.createElement('div');
        imageElement.className = 'gallery-item';

        const imgElement = document.createElement('img');
        imgElement.src = imageDataURL;
        imgElement.alt = `Captured Image ${index + 1}`;

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => removeImage(index));

        imageElement.appendChild(imgElement);
        imageElement.appendChild(removeButton);

        return imageElement;
    }

    function removeImage(index) {
        // Remove the image from the capturedImages array
        capturedImages.splice(index, 1);

        // Update the gallery container
        updateGallery();

        // Update captured images in localStorage
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
    }

    function updateGallery() {
        // Clear the current content of the gallery container
        galleryContainer.innerHTML = '';

        // Display captured images in the updated gallery container
        capturedImages.forEach((imageDataURL, index) => {
            const imageElement = createImageElement(imageDataURL, index);
            galleryContainer.appendChild(imageElement);
        });
    }
});
