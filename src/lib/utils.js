/**
 * changes time format from pure seconds to h:mm:ss
 * @param {number} time time in seconds
 * @returns string representing the time seperated by units
 */
export function formatTime(time) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    let sec = time % 60;
    return `${hour}:${addprecedingZero(min)}:${addprecedingZero(sec)}`;
}

/**
 * adds a preceding zero to a number if it is less than 10
 * @param {number} num a number
 * @returns string of the resulting number
 */
function addprecedingZero(num) {
    return num < 10 ? `0${num}` : num;
}

/**
 * returns a JSON object formatted for the FlowBrite Pie Chart Plugin using the given data
 * @param {number[]} numbers values of each pie slice
 * @param {string[]} colors colors of each pie slice
 * @param {string[]} labels name of each pie slice
 * @returns 
 */
export function generatePieChartData(numbers, colors, labels) {
    return {
        series: numbers,
        colors: colors,
        chart: {
            height: 600,
            width: '100%',
            type: 'pie'
        },
        labels: labels,
        legend: {
            position: 'bottom',
            fontFamily: 'Inter, sans-serif'
        },
        yaxis: {
            labels: {
                formatter: (value) => formatTime(value)
            }
        }
    };
}