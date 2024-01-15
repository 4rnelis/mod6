document.addEventListener('DOMContentLoaded', (event) => {
    const galleryContainer = document.getElementById('gallery-container');
    const backButton = document.getElementById('back-button');
    const continueButton = document.getElementById('continue-button');

    let capturedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];

    capturedImages.forEach((imageDataURL, index) => {
        const imageElement = createImageElement(imageDataURL, index);
        galleryContainer.appendChild(imageElement);
    });

    backButton.addEventListener('click', () => {
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
        window.location.href = 'index.html';
    });

    continueButton.addEventListener('click', () => {
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));

        window.location.href = 'edit.html';
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
        capturedImages.splice(index, 1);

        updateGallery();

        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
    }

    function updateGallery() {
        galleryContainer.innerHTML = '';

        capturedImages.forEach((imageDataURL, index) => {
            const imageElement = createImageElement(imageDataURL, index);
            galleryContainer.appendChild(imageElement);
        });
    }
});
