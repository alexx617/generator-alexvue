import moment from 'moment';

var filter = {};

// 时间戳转日期
filter.dateFormat = function (datetime, strFormat = 'YYYY-MM-DD') {
    return moment(datetime).format(strFormat);
};

// 电话号码格式化
filter.cellphoneFormat = (val) => {
    if (val) {
        return '(' + val.substring(0, 2) + ') ' + val.substring(2, val.length);
    }
    return val;
};

// 金额格式化：123456789 -> 1.234.567,89
filter.moneyFormatNoCurl = (val) => {
    val += '';//数字先转成字符串
    var len = val.length;

    if (len <= 5 && len > 3) {
        return (val.substring(0, len - 3) + '.' + val.substring(len - 3, len));
    } else {
        return val;
    }
};

// 金额格式化：123456789 -> 1.234.567,89
filter.moneyFormat = (val, notInt, notReal) => {
    const radPoint = notReal ? '.' : ',';
    const splitter = notReal ? ',' : '.';

    val = notInt ? val : parseFloat(val) / 100;

    let parts = (val + '').split('.');
    let intPart = parts[0].split('').reverse();
    let buf = [];
    let counter = 0;
    let len = intPart.length;

    for (let i = 0; i < len; i++) {
        buf.push(intPart[i]);
        counter++;
        if (counter % 3 === 0 && i < len - 1) {
            buf.push(splitter);
        }
    }
    intPart = buf.reverse().join('');

    let tail = parts[1];
    if (!tail) {
        tail = '00';
    } else if (tail.length === 1) {
        tail = tail + '0';
    } else {
        tail = Math.round(parseFloat('0.' + tail) * 100);
    }

    return intPart + radPoint + tail;
};