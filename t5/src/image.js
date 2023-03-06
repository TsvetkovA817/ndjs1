import image1 from '../media/images/1.jpg';
import image2 from '../media/images/2.jpg';
import image3 from '../media/images/3.jpg';
import image4 from '../media/images/4.gif';

const items = [
    {
        resource: image1,
        title: 'Мельница река'
    },
    {
        resource: image2,
        title: 'Горы осень'
    }, {
        resource: image3,
        title: 'Деревья лето'
    }, {
        resource: image4,
        title: 'Кот'
    },
];

function drawGalleryItem(item) {
    const itemElement = document.createElement('div');
    itemElement.classList = "gallery-item";

    const imgElement = document.createElement('img');
    imgElement.classList = "gallery-item__image";
    imgElement.src = item.resource;

    const titleElement = document.createElement('p');
    titleElement.classList = "gallery-item__title";
    titleElement.textContent = item.title;

    itemElement.appendChild(imgElement);
    itemElement.appendChild(titleElement);

    return itemElement;
}

const galleryRootElement = document.getElementById('gallery');
items.map(item => galleryRootElement.appendChild(drawGalleryItem(item)));