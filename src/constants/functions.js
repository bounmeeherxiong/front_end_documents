export function getFormatNumber(value = 0) {
    if (value == 0) {
        return '-';
    }
    return (+value).toLocaleString();
}
export function getFormatPrice(value = 0) {
    return (+value).toLocaleString();
}
export function getCeilFormatNumber(value, dicimal = 3) {
    let thisValue = getFormatNumber(value);
    thisValue = thisValue.replace(/,/g, '.');
    thisValue = Math.ceil(thisValue);
    thisValue = getFormatNumber(thisValue + "0".repeat(dicimal));
    return thisValue;
}

export function add_zero(your_number, length) {
    var num = '' + your_number;
    while (num.length < length) {
        num = '0' + num;
    }
    return num;
}

export function getDateMonthYear(date) {
    let laoMonth = [
        'ມັງກອນ',
        'ກຸມພາ',
        'ມີນາ',
        'ເມສາ',
        'ພຶດສະພາ',
        'ມິຖຸນາ',
        'ກໍລະກົດ',
        'ສິງຫາ',
        'ກັນຍາ',
        'ຕຸລາ',
        'ພະຈິກ',
        'ທັນວາ'
    ]
    let dateFormat = new Date(parseInt(date));
    return `${add_zero(dateFormat.getDate(), 2)} ${laoMonth[dateFormat.getMonth()]} ${dateFormat.getFullYear()}`
}
export function getDateMonthYearHourMinute(date) {
    let laoMonth = [
        'ມັງກອນ',
        'ກຸມພາ',
        'ມີນາ',
        'ເມສາ',
        'ພຶດສະພາ',
        'ມິຖຸນາ',
        'ກໍລະກົດ',
        'ສິງຫາ',
        'ກັນຍາ',
        'ຕຸລາ',
        'ພະຈິກ',
        'ທັນວາ'
    ]
    let dateFormat = new Date(date);
    return `  ${add_zero(dateFormat.getHours(), 2)}:${add_zero(dateFormat.getMinutes(), 2)}, ${add_zero(dateFormat.getDate(), 2)} ${laoMonth[dateFormat.getMonth()]} ${dateFormat.getFullYear()}`
}
export function getDateHourMinute(date) {
    let dateFormat = new Date(date);
    return `${dateFormat.getHours()}: ${add_zero(dateFormat.getMinutes(), 2)}`
}
export function getLimitStringLength(text, length = 20) {
    if (text.length > length) {
        return `${text.substring(0, length)}... `;
    }
}

export function getLaoMonth(month) {
    let laoMonth = [
        'ມັງກອນ',
        'ກຸມພາ',
        'ມີນາ',
        'ເມສາ',
        'ພຶດສະພາ',
        'ມິຖຸນາ',
        'ກໍລະກົດ',
        'ສິງຫາ',
        'ກັນຍາ',
        'ຕຸລາ',
        'ພະຈິກ',
        'ທັນວາ'
    ]
    return laoMonth[month];
}
export const inputOnChange = (e) => {
    let allowNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', null, 'null'];
	
    if (allowNumber.indexOf(e.nativeEvent.data) !== -1) {
        let theNumber = e.target.value;
        theNumber = theNumber.replace(/,/g, '');
        // setPrice(getFormatNumber(theNumber));
    }
}
export const getTheRealMoney = (money) => {
    if (!money) {
        return 0;
    }
    let this_money = +money;
    if (typeof this_money === "number") {
        let degits = money.toString().split('');
        let degitsLength = degits.length;
        let decisionDigit = degits[degitsLength - 3];
        if (decisionDigit < 5) {
            degits[degitsLength - 3] = 0;
            degits[degitsLength - 2] = 0;
            degits[degitsLength - 1] = 0;
            return parseFloat(degits.join(''));
        } else {
            let scalableDigit = degits.slice(0, degitsLength - 3);
            scalableDigit = +scalableDigit.join('');
            scalableDigit++;
            let this_scalableDigit = scalableDigit.toString() + '000';
            return parseFloat(this_scalableDigit);
        }
    } else {
        return 0;
    }
}