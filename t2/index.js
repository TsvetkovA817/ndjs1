const colors = require("colors/safe");
console.log(colors.red("hello ") + colors.green("color ") + colors.bold("timers!"));

const evnt = require("events");


/**
 * Класс счетчика времени, выдает время в секундах
 * @param {string} stringTimeDate - время в формате чч-дд-мм-год
 * @param {string} sep - разделитель значений в строке чч-дд-мм-год, по умолчанию '-'
 * @param {number} color - цвет от 1 до 3 
 * @example
 * const f3 = new Counter('13-23-12-2023', '-', 2);
 */

class Counter {

    constructor(stringTimeDate, sep = '-', color) {
        this.stringTimeDate = stringTimeDate;
        this.sep = sep;
        this.color = color;
    }

    getTimeInSeconds() {

        if (this.stringTimeDate.indexOf(this.sep) > 0) {

            let [mHour, mDay, mMonth, mYear] = this.stringTimeDate.split(this.sep);

            if (mYear.length == 2) mYear = '20' + mYear;

            const dtFromString = new Date(Number(mYear), Number(mMonth) - 1, Number(mDay), Number(mHour));
            return dtFromString.getTime();
        }
        else {
            return (-1);
        }
    }
}


/**
 * Класс для событий счетчиков времени
 */
class Handler {

    static arrTimers = [];
    static idInterval = null;
    static lang = 'ru';
    static setTimer(timer) {
        this.arrTimers.push(timer);
    }

    static twoDigits(num) {
        return (num < 10) ? '0' + num.toString() : num.toString();
    }

    static ConvertTimeToString(time, color) {

        const seconds = this.twoDigits(Math.floor((time / 1000) % 60));
        const minutes = this.twoDigits(Math.floor((time / 1000 / 60) % 60));
        const hours = this.twoDigits(Math.floor((time / (1000 * 60 * 60)) % 24));
        const days = this.twoDigits(Math.floor(time / (1000 * 60 * 60 * 24)));

        let s = new Messages().getMsg('TimeRemains', this.lang) + ` ${days} ` +
            new Messages().getMsg('DaysAnd', this.lang) + ` ${hours}:${minutes}`;
        if (color == 1) s = s + `:${colors.red(seconds)}`;
        else if (color == 2) s = s + `:${colors.bold(seconds)}`;
        else if (color == 3) s = s + `:${colors.green(seconds)}`;
        else s = s + `:${seconds}`;

        return s;
    }

    static render() {

        if (this.arrTimers.length < 1) {
            console.log(new Messages().getMsg('NoTimers', this.lang));
            clearInterval(this.idInterval);
        } else {
            this.arrTimers.forEach(el => {
                const leftSeconds = el.getTimeInSeconds() - Date.now();
                if (leftSeconds > 0) {
                    if (el.color == 1)
                        console.log(colors.red(el.stringTimeDate), this.ConvertTimeToString(leftSeconds, 1));
                    else if (el.color == 2)
                        console.log(colors.bold(el.stringTimeDate), this.ConvertTimeToString(leftSeconds, 2));
                    else if (el.color == 3)
                        console.log(colors.green(el.stringTimeDate), this.ConvertTimeToString(leftSeconds, 3));
                    else
                        console.log(el.stringTimeDate, this.ConvertTimeToString(leftSeconds, 0));
                } else {

                    console.log(el.stringTimeDate, new Messages().getMsg('EndCount', this.lang));
                    this.arrTimers = this.arrTimers.filter(item => item !== el);
                }
            })
        }
        console.log("*");
    }
}


/**
 * Класс сообщений
 * @param {string} lang - язык
 * @example
 * console.log(new Messages().getMsg('NoArg', lang));
 */
class Messages {
    constructor(lang = 'ru') {
        this.lang = lang;
        this.arrMsg = {
            RezInCons: {
                ru: 'Результат выведен в консоль',
                en: 'Result in console',
                cn: '结果 在 控制台'
            },
            NoArg: {
                ru: 'Не указаны аргументы в строке запуска программы',
                en: 'Arguments not specified in program launch line',
                cn: '程序 启动 行 中未 指定 的 参数'
            },
            EndCount: {
                ru: 'Счетчик закончил отсчет',
                en: 'Finished the countdown',
                cn: '倒计时 结束'
            },
            NoTimers: {
                ru: 'Нет счетчиков',
                en: 'No timers',
                cn: '没 有 计时器'
            },
            TimeRemains: {
                ru: 'Осталось',
                en: 'Time remains',
                cn: '剩下'
            },
            DaysAnd: {
                ru: 'дней и',
                en: 'days and',
                cn: '天 和'
            },
            NoSep: {
                ru: 'Нет разделителя',
                en: 'No separator',
                cn: '无分隔符'
            },

        }
    }
    getMsg(id) {
        return this.arrMsg[id][this.lang];
    }
}


/**
 * Функция для запуска 
 * @example
 * runTimer();
 */
const runTimer = () => {

    class EventTime extends evnt { }
    const emitter = new EventTime();

    emitter.on('eventTimers', Handler.render.bind(Handler));

    Handler.idInterval = setInterval(() => emitter.emit('eventTimers'), 1000);

    const args = process.argv.slice(2);
    const lang = 'ru';
    const sep = '-';
    if (args.length < 1) {
        console.log(new Messages().getMsg('NoArg', lang));
    }
    else {
        let ncolor = 1;
        args.forEach(item => {

            if (item.indexOf(sep) > 0) {
                Handler.setTimer(new Counter(item, sep, ncolor));
                ncolor = ncolor + 1; if (ncolor > 3) ncolor = 1;
            }
            else {
                console.log(new Messages().getMsg('NoSep', lang));
            }
        })
    }
}

runTimer();