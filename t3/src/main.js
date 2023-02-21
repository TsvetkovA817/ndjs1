import { getPage } from "./tabpage.js";
import { addTime } from "./utils.js";
import { formatErr } from "./utils.js";
import { diffDt, diffToHtml } from "./datecalc.js";
import { clearTimer, stopTimer } from "./timer.js";


const elF1 = document.datecalc;
elF1.addEventListener("submit", handleCalcDates);

const elR1 = document.getElementById("dtResult");

const elBtnTab1 = document.getElementById("btnTab1");
elBtnTab1.addEventListener("click", getPage);

const elBtnTab2 = document.getElementById("btnTab2");
elBtnTab2.addEventListener("click", getPage);

const elBtnTab3 = document.getElementById("btnTab3");
elBtnTab3.addEventListener("click", getPage);

const elBtnAddTime = document.getElementById("btnAddTime");
elBtnAddTime.addEventListener("click", addTime);

//Обработчик событий Калькулятора дат
export function handleCalcDates(event) {
    elR1.innerHTML = "";
    event.preventDefault();
    let { firstDate, secondDate } = event.target.elements;
    let d1 = firstDate.value;
    let d2 = secondDate.value;

    if (d1 && d2) {
        const r = diffDt(d1, d2);
        elR1.innerHTML = diffToHtml(r);
    }
    else {
        console.log('date empty');
        elR1.innerHTML = formatErr("date empty");
    }
}


let idi;
const elF2 = document.getElementById("fTimer");
elF2.addEventListener("submit", handleCalcTimer);
const elInpToDate = document.getElementById("toDate");
const elR2 = document.getElementById("secTimer");
const leDate = document.getElementById("leDate");

const elBtnStop = document.getElementById("btnStop");
elBtnStop.addEventListener("click", stopTimer);
elBtnStop.idInterval = idi;
const elBtnClear = document.getElementById("btnClear");
elBtnClear.addEventListener("click", clearTimer);

//Обработчик событий таймера
export function handleCalcTimer(event) {
    event.preventDefault();
    let { toDate } = event.target.elements;
    let d2 = toDate.value;
    let d1 = 'td';
    if (d1 && d2) {
        idi = setInterval(() => {
            const r = diffDt(d1, d2);
            leDate.innerHTML = `Осталось: дн = ${r.days} ч = ${r.hours} мин = ${r.minutes} сек = ${Math.trunc(r.seconds)}`;
            if (r.days <= 0 && r.hours <= 0 && r.minutes <= 0 && r.seconds <= 0) {
                const obj = { 'currentTarget': { 'idInterval': idi } };
                stopTimer(obj);
                leDate.innerHTML = `Таймер завершен: дн = 0 ч = 0 мин = 0 сек = 0`;
            }
        }, 1000);
        elBtnStop.idInterval = idi;
    }
    else {
        console.log('date empty');
        elR2.innerHTML = formatErr("date empty");
    }
}
