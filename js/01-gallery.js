import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
    gallery: document.querySelector('.gallery'),
}

let galleryLightBox;

refs.gallery.innerHTML = createGalleryMarkup(galleryItems);

refs.gallery.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
    e.preventDefault();

    const image = e.target;
    if (!image.classList.contains('gallery__image')) {
        return;
    }
    
    const lightboxImage = createImageLightbox(image);
    galleryLightBox = basicLightbox.create(lightboxImage,
        {
            onShow: (instance) => {
                document.addEventListener('keydown', onEscPress);
            },
            onClose: (instance) => {
                document.removeEventListener('keydown', onEscPress)
            },
        }
    );
    galleryLightBox.show();
}

function createGalleryMarkup(items) {
    return items.map(({ preview, original, description }) => {
            return `<div class="gallery__item">
                        <a class="gallery__link" href="${original}">
                            <img
                            class="gallery__image"
                            src="${preview}"
                            data-source="${original}"
                            alt="${description}"
                            />
                        </a>
                    </div>`})
        .join('');
}

function createImageLightbox(image) {
    return `<img src="${image.dataset["source"]}">`;
}

function onEscPress(e) {
    if (e.code !== 'Escape') {
        return;
    }
    galleryLightBox.close();
}