const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }


    return new Blob(byteArrays, {type: contentType});
}

document.addEventListener('DOMContentLoaded', (event) => {
    const galleryContainer = document.getElementById('gallery-container');
    const backButton = document.getElementById('back-button');
    const continueButton = document.getElementById('continue-button');

    let capturedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
    // scanItems(capturedImages[0]);
    const test = b64toBlob(capturedImages[0].split(",")[1]);
    const url = URL.createObjectURL(test);
    console.log(url);



    capturedImages.forEach((imageDataURL, index) => {
        const imageElement = createImageElement(imageDataURL, index);
        galleryContainer.appendChild(imageElement);
    });

    backButton.addEventListener('click', () => {
        // localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
        // window.location.href = 'index.html';
    });

    continueButton.addEventListener('click', () => {
        localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
        capturedImages.forEach((file, index) => {
        });

        // window.location.href = 'edit.html';
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

    function scanItems(fileUrl) {
        console.log(fileUrl);
        const options = {
            method: "POST",
            url: "https://api.edenai.run/v2/image/object_detection",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjUzOGU0MTAtMTYyOS00NDZmLTk2M2EtMGUxNGQ5MWUzNTRmIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.JU-OMEsHIh8e2IcM6HF5aOBAkjLmOWA601pjWK3yWRM",
            },
            data: {
                providers: "amazon,google",
                file_url: fileUrl,
                fallback_providers: "",
            },
        };
        axios
            .request(options)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    // function getObjects(fileInput) {
    //     const file = fileInput.files[0];
    //     if (!file) {
    //         console.error('Please select an image file.');
    //         return;
    //     }
    //
    //     const form = new FormData();
    //     form.append('providers', 'amazon');
    //     form.append('file', file);
    //     form.append("fallback_providers", "");
    //
    //     // This is the starting code
    //
    //     // form.append("providers", "amazon");
    //     // form.append("file", fs.createReadStream("C:/Users/ejota/PycharmProjects/pythonProject8/download.jpeg"));
    //     // form.append("fallback_providers", "");
    //
    //     const options = {
    //         method: "POST",
    //         url: "https://api.edenai.run/v2/image/object_detection",
    //         headers: {
    //             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmYwMDExYmQtMjRjMS00YjE0LWI4OGUtOGE5NjJjODI4ZDI3IiwidHlwZSI6ImFwaV90b2tlbiJ9.eLaoMT3O64BHPdhA0oZlPfAnRlvpFZgJn-PfVRu3-80",
    //             "Content-Type": "multipart/form-data; boundary=" + form.getBoundary(),
    //         },
    //         data: form,
    //     };
    //
    //     axios
    //     .request(options)
    //     .then((response) => {
    //         const amazonResponse = response.data.amazon;
    //
    //         if (amazonResponse.status === 'success') {
    //             const items = amazonResponse.items;
    //
    //             items.forEach((item, index) => {
    //                 console.log(`Item ${index + 1}:`);
    //                 console.log(`  Label: ${item.label}`);
    //                 console.log(`  Confidence: ${item.confidence}`);
    //                 console.log(`  Bounding Box: x_min=${item.x_min}, x_max=${item.x_max}, y_min=${item.y_min}, y_max=${item.y_max}`);
    //                 console.log("-----------------------");
    //             });
    //         } else {
    //             console.log("Amazon request failed.");
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }
});
