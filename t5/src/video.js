import video1 from '../media/video/1.mp4';
import video2 from '../media/video/2.mp4';

const vgallery = document.querySelector('.gallery__items');
const vitems = [
    {
        title: 'Видеозапись 1',
        videoUrl: video1
    },
    {
        title: 'Видеозапись 2',
        videoUrl: video2
    }
];

vitems.forEach(item => {
    vgallery.insertAdjacentHTML('beforeend', `
      <div class="gallery-item">
          <video controls src="${item.videoUrl}"  class="gallery-item__video"></video>
          <p class="gallery-item__title">${item.title}</p>
      </div>
  `);
});
