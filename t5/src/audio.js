import audio1 from '../media/audio/1.mp3';
import audio2 from '../media/audio/2.mp3';
import audio3 from '../media/audio/3.mp3';

const gallery = document.querySelector('.gallery__items');
const aitems = [
    {
        title: 'Звук 1',
        audioUrl: audio1
    },
    {
        title: 'Звук 2',
        audioUrl: audio2
    },
    {
        title: 'Звук 3',
        audioUrl: audio3
    }
];

aitems.forEach(item => {
    gallery.insertAdjacentHTML('beforeend', `
      <div class="gallery-item">
          <audio controls src="${item.audioUrl}" class="gallery-item__audio"></audio>
          <p class="gallery-item__title">${item.title}</p>
      </div>
  `);
});
