//import * as howler from '../node_modules/howler/src/howler.core.js';
import { Howl } from '../node_modules/howler/src/howler.core.js';

/**
 * Остановка таймера 
 * @example 
 * elBtnStop.addEventListener("click", stopTimer);
 */
export async function stopTimer(event) {
    let idi;
    if (event) idi = event.currentTarget?.idInterval;
    if (idi) {
        clearInterval(idi);
        const mp3file = 'sound.mp3';
        var sound = new Howl({
            src: [mp3file],
            autoplay: false
        });
        sound.play();
    }
}

//Очистить поле вывода таймера
export function clearTimer() {
    leDate.innerHTML = "";
}
