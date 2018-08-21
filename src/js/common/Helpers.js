export default class Helpers {
    static transformDate = (date) => {
        let input = new Date(Date.parse(date));
        let dateObj = [];
        dateObj.push(input.toLocaleString('en-gb', {day: "numeric"}));
        dateObj.push(input.toLocaleString('en-gb', {month: "short"}));
        dateObj.push(input.toLocaleString('en-gb', {year: "numeric"}));
        dateObj.push(input.toLocaleString('en-gb', {weekday: "long"}));
        return dateObj;
    };
}