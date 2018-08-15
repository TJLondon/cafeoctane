export default class Helpers {
    static transformDate = (date) => {
        let input = new Date(Date.parse(date));
        return input.toLocaleString('en-gb', {day: "numeric", month: "short", year: "numeric" });
    };
}