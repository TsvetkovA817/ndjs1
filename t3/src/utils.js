/**
 * Форматированный вывод сообщения об ошибке
 * @param {string} text - Сообщение 
 * @returns {string}    - html разметка
 * @example
 * elR1.innerHTML = formatErr("date is empty");
 */
export const formatErr = (text) => `<span style="color:red;"> ${text} </span>`;


/**
 * Добавить минуты к тэгу input ДатеВремя. 
 * @param {number} Использует "addMinutes" - ID элемента input в html верстке со значением минут.  
 * @param {datetime} "toDate"     - ID элемента input в html верстке, элемент получатель
 * @example 
 * elBtnAddTime.addEventListener("click", addTime);
 */
export function addTime() {
    const m = document.getElementById("addMinutes").value;
    const [date, time] = formatDate(new Date(), m, 0).split(' ');
    const datetimeLocalInput = document.getElementById('toDate');
    datetimeLocalInput.value = date + 'T' + time;
}


/**
 * Преобразование Даты в Строку для ввода в тэг input
 * @param {Date} date  - Дата 
 * @param {Number} pMn - Прибавить минут
 * @param {Number} pSc - Прибавить секунд
 * @returns {string}   - "2023-02-21 09:44"
 * @example 
 * const [date, time] = formatDate(new Date(), 0, 0).split(' ');
 * datetimeLocalInput.value = date + 'T' + time;
 */
export function formatDate(date, pMn, pSc) {

    let m = date.getMinutes() + Number(pMn);
    let s = date.getSeconds() + Number(pSc);
    if (m > 59) m = 59;
    if (s > 59) s = 59;

    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(m),
            //padTo2Digits(s),  // секунды
        ].join(':')
    );
}

//Добавим 0 впереди
export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
