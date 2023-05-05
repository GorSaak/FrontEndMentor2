const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

const a = document.getElementById("day-input")
a.addEventListener("input", () => {
    if ((Number.isInteger(+a.value) && 0 < a.value && a.value < 32) || a.value == '') {
        document.getElementById("day-top-text").style.color = "gray";
        document.getElementById("day-input").style.border = "2px solid gray";
        document.getElementById("day-bottom-text").style.visibility = "hidden";
    } else {
        document.getElementById("day-top-text").style.color = "red";
        document.getElementById("day-input").style.border = "3px solid red";
        document.getElementById("day-bottom-text").style.visibility = "visible";
        document.getElementById("day-bottom-text").innerHTML = "Must be a valid day";
    }
})

const b = document.getElementById("month-input")
b.addEventListener("input", () => {
    if ((Number.isInteger(+b.value) && 1 <= b.value && b.value <= 12) || b.value == '') {
        document.getElementById("month-top-text").style.color = "gray";
        document.getElementById("month-input").style.border = "2px solid gray";
        document.getElementById("month-bottom-text").style.visibility = "hidden";
    } else {
        document.getElementById("month-top-text").style.color = "red";
        document.getElementById("month-input").style.border = "3px solid red";
        document.getElementById("month-bottom-text").style.visibility = "visible";
        document.getElementById("month-bottom-text").innerHTML = "Must be a valid month";
    }
})

const c = document.getElementById("year-input")
c.addEventListener("input", () => {
    if ((Number.isInteger(+c.value) && 1 <= c.value && c.value <= year) || c.value == '') {
        document.getElementById("year-top-text").style.color = "gray";
        document.getElementById("year-input").style.border = "2px solid gray";
        document.getElementById("year-bottom-text").style.visibility = "hidden";
    } else {
        document.getElementById("year-top-text").style.color = "red";
        document.getElementById("year-input").style.border = "3px solid red";
        document.getElementById("year-bottom-text").style.visibility = "visible";
        document.getElementById("year-bottom-text").innerHTML = "Must be a valid year";
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

    if (inpDay > checkedTheLastDayOfTheInputMonth) {
        document.getElementById("day-top-text").style.color = "red";
        document.getElementById("day-input").style.border = "3px solid red";
        document.getElementById("day-bottom-text").style.visibility = "visible";
        document.getElementById("day-bottom-text").innerHTML = "Must be a valid date";

        document.getElementById("year-change").innerHTML = "--";
        document.getElementById("month-change").innerHTML = "--";
        document.getElementById("day-change").innerHTML = "--";
    } else {
        
        let theLastDayOfRealTimePreviousMonth = new Date(year, month - 1, 0).getDate();

        if (inpDay == "") {
            document.getElementById("day-top-text").style.color = "red";
            document.getElementById("day-input").style.border = "3px solid red";
            document.getElementById("day-bottom-text").style.visibility = "visible";
            document.getElementById("day-bottom-text").innerHTML = "This field is required";
        }

        if (inpMonth == "") {
            document.getElementById("month-top-text").style.color = "red";
            document.getElementById("month-input").style.border = "3px solid red";
            document.getElementById("month-bottom-text").style.visibility = "visible";
            document.getElementById("month-bottom-text").innerHTML = "This field is required";
        }

        if (inpYear == "") {
            document.getElementById("year-top-text").style.color = "red";
            document.getElementById("year-input").style.border = "3px solid red";
            document.getElementById("year-bottom-text").style.visibility = "visible";
            document.getElementById("year-bottom-text").innerHTML = "This field is required";
        }

        if (inpDay != "" && inpMonth != '' && inpYear != '' && inpDay <= checkedTheLastDayOfTheInputMonth) {

            document.getElementById("day-top-text").style.color = "gray";
            document.getElementById("day-input").style.border = "2px solid gray";
            document.getElementById("day-bottom-text").style.visibility = "hidden";

            document.getElementById("month-change").innerHTML = "--";
            document.getElementById("day-change").innerHTML = "--";

            if (month >= inpMonth) {
                document.getElementById("year-change").innerHTML = year - inpYear;
            } else {
                document.getElementById("year-change").innerHTML = year - inpYear - 1;
            }
            if (day >= inpDay) {
                setTimeout(() => {
                    document.getElementById("month-change").innerHTML = month + 12 - inpMonth;
                }, 800);

                setTimeout(() => {
                    document.getElementById("day-change").innerHTML = day - inpDay;
                }, 1500);
            } else {
                setTimeout(() => {
                    document.getElementById("month-change").innerHTML = month + 11 - inpMonth;
                }, 800);
                setTimeout(() => {
                    document.getElementById("day-change").innerHTML = day + theLastDayOfRealTimePreviousMonth - inpDay;
                }, 1500);
            }
        }  else {
            document.getElementById("year-change").innerHTML = "--";
            document.getElementById("month-change").innerHTML = "--";
            document.getElementById("day-change").innerHTML = "--";
        }
    }
}