const date = new Date();

let year = date.getFullYear();
let month = date.getMonth()+1;
let day = date.getDate();

const a = document.getElementById("day-input")
console.log(a)
    a.addEventListener("change", () => {
    if (Number.isInteger(+a.value) && 1<=a.value && a.value <= 31) {
       alert("true")
    } else {
      // let b = document.getElementById("day-input").innerHTML
        console.log(+b.value-500)
        alert("false")
    }
})

function getTheAge() {
    let inpDay = document.getElementById("day-input").value;
    let inpMonth = document.getElementById("month-input").value;
    let inpYear = document.getElementById("year-input").value;

    console.log(inpDay, inpMonth, inpYear)
    // console.log(year - inpYear)
    
    document.getElementById("year-change").innerHTML = year - inpYear
    document.getElementById("month-change").innerHTML = month - inpMonth
    document.getElementById("day-change").innerHTML = day - inpDay
}