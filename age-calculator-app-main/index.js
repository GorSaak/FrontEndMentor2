const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const a = document.getElementById("day-input")
a.addEventListener("input", () => {
    if ((Number.isInteger(+a.value) && 1 <= a.value && a.value <= 31) || a.value == '') {
    } else {
        alert("you can input only from 1 to 31");
        document.getElementById("day-input").value = ''
    }
})

const b = document.getElementById("month-input")
b.addEventListener("input", () => {
    if ((Number.isInteger(+b.value) && 1 <= b.value && b.value <= 12) || b.value == '') {
    } else {
        alert("you can input only from 1 to 12");
        document.getElementById("month-input").value = ''
    }
})

const c = document.getElementById("year-input")
c.addEventListener("input", () => {
    if ((Number.isInteger(+c.value) && 1 <= c.value && c.value <= year) || c.value == '') {
    } else {
        alert("this year is in the future");
        document.getElementById("year-input").value = ''
    }
})

function getTheAge() {
    let inpDay = document.getElementById("day-input").value;
    let inpMonth = document.getElementById("month-input").value;
    let inpYear = document.getElementById("year-input").value;

    let yearForCheckIfTheDayExestInHistory
    
    if ((0 == inpYear % 4) && (0 != inpYear % 100) || (0 == inpYear % 400)) {
         yearForCheckIfTheDayExestInHistory = 2020;
    } else {
         yearForCheckIfTheDayExestInHistory = 2023;
    }

    let checkedTheLastDayOfTheInputMonth = new Date(yearForCheckIfTheDayExestInHistory, inpMonth, 0).getDate();
    
    if ( inpDay > checkedTheLastDayOfTheInputMonth) {
        alert(`The last day of your input month in this year is ${checkedTheLastDayOfTheInputMonth}`);
        document.getElementById("day-input").value = ''
    }else {
        
        let theLastDayOfRealTimePreviousMonth = new Date(year, month-1, 0).getDate();
        console.log(theLastDayOfRealTimePreviousMonth)

        if (inpDay != "" && inpMonth != '' && inpYear != '') {

            if (month >= inpMonth) {
                document.getElementById("year-change").innerHTML = year - inpYear;
                document.getElementById("month-change").innerHTML = month - inpMonth;
            } else {
                document.getElementById("year-change").innerHTML = year - inpYear - 1;
                document.getElementById("month-change").innerHTML = month + 12 - inpMonth;
            }
            if (day >= inpDay) {
                document.getElementById("day-change").innerHTML = day - inpDay;
            } else {
                document.getElementById("month-change").innerHTML = month + 11 - inpMonth;
                document.getElementById("day-change").innerHTML = day + theLastDayOfRealTimePreviousMonth - inpDay;
            }
        } else {
            alert("Need to fill all fields")
        }
    }
}