import { DateTime, Duration } from "../node_modules/luxon/build/es6/luxon.js";
//import { DateTime, Duration } from "luxon.js";

/**
 * Продолжительность между двумя датами.
 * @param {string} pD1 - Дата 1, 'td' - Текущая дата
 * @param {string} pD2 - Дата 2
 * @returns {object}  ['years', 'months', 'days']
 * @example 
 * const r = diffDt(d1, d2); 
 * elResult.innerHTML =`Осталось: дн = ${r.days} ч = ${r.hours} мин = ${r.minutes} сек = ${Math.trunc(r.seconds)}`;
 */
export function diffDt(pD1, pD2) {
    let mr;
    if (pD1 == 'td') {
        let md1 = DateTime.now();
        let md2 = DateTime.fromISO(pD2);

        mr = md2.diff(md1, ['days', 'hours', 'minutes', 'seconds']).toObject();
        let dur = Duration.fromObject(mr);
        let dursec = dur.as('seconds');
        let durmsec = dur.toMillis();
    }
    else {
        let md1 = DateTime.fromISO(pD1);
        let md2 = DateTime.fromISO(pD2);
        if (md1 > md2) { md2 = [md1, md1 = md2][0]; }
        mr = md2.diff(md1, ['years', 'months', 'days']).toObject();
    }
    return mr;

}


/**
 * Форматированный вывод структуры времени
 * @param {object} d - {'years', 'months', 'days'} - структура времени
 * @returns {string}  - html разметка
 * @example 
 * const r = diffDt(d1, d2);
 * elR1.innerHTML = diffToHtml(r);
 */
export const diffToHtml = d => `
<span> ${d.years ? 'лет ' + d.years : ''} 
<span> ${d.months ? 'мес. ' + d.months : ''} 
<span> ${d.days ? 'дн. ' + d.days : ''} 
`;
