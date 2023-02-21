import { formatDate } from "./utils.js";

/**
 * Переключение вкладок 
 * @example 
 * elBtnTab1.addEventListener("click", getPage);
 * elBtnTab2.addEventListener("click", getPage);
 */
export function getPage(event) {
    let i, tabcontent, tablinks;
    const pageName = event.target.name;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(pageName).style.display = "block";
    event.currentTarget.className += " active";
    if (pageName == 'page3') {
        const [date, time] = formatDate(new Date(), 0, 0).split(' ');
        const datetimeLocalInput = document.getElementById('toDate');
        datetimeLocalInput.value = date + 'T' + time;
        datetimeLocalInput.setAttribute("min", date + 'T' + time);
    }
}