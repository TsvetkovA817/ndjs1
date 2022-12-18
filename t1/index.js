const colors = require("colors/safe");
console.log(colors.red("hello ") + colors.green("numbers!"));

let n1 = 0, n2 = 0;

n1 = Number(process.argv[2]);
n2 = Number(process.argv[3]);

if (isNaN(n1) || isNaN(n2)) {
    console.log("Параметр не число " + colors.yellow("not a nubmer"));
    process.exit(1);
}

let currentNumber = n1;

let c = 1;
let k = 0;

while (currentNumber <= n2) {
    if (isNatural(currentNumber)) {
        if (c == 1) console.log(colors.green(currentNumber));
        if (c == 2) console.log(colors.yellow(currentNumber));
        if (c == 3) console.log(colors.red(currentNumber));
        c = c + 1; k = k + 1;
        if (c > 3) { c = 1; }
    }
    currentNumber++;
}

if (k == 0) { console.log(colors.red(`В этом диапазоне [${n1} - ${n2}] нет простых чисел`)); }

function isNatural(number) {
    for (let i = 2; i <= number / 2; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}
