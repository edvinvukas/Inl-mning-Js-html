let totalAntalProgram = 0;
const outputContainer = document.getElementById("output");
function visaLagrat_filter_rensa(filteredData) {


    const outputDiv = document.getElementById("output");

    outputDiv.innerHTML = "";

    const dataToShow = filteredData || getAllDataFromLocalStorage();

    for (const programObj of dataToShow) {

        const programInfo =
            "<p><strong>Titel: </strong>" + programObj.titel + "</p>" +
            "<p><strong>Beskrvning:</strong>" + programObj.beskrivning + "</p>" +
            "<p><strong>Åldersgräns:</strong>" + programObj.åldersgräns + "</p>" +
            "<hr>";

        outputDiv.innerHTML += programInfo;
    }

    document.getElementById("antalProgram").innerText = "Antal lagrade program är: " + totalAntalProgram;
}

function getAllDataFromLocalStorage() {

    const data = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.includes("sparadData")) {
            const programData = localStorage.getItem(key);
            const programObj = JSON.parse(programData);
            data.push(programObj);
        }
    }
    return data;
}

const rensning = document.getElementById("rensa");
rensning.addEventListener("click", function () {

    localStorage.clear();
    totalAntalProgram = 0;
    outputContainer.style.display = "none";
    visaLagrat_filter_rensa();

});

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const allData = getAllDataFromLocalStorage();

    const filteredData = allData.filter(programObj =>
        programObj.titel.toLowerCase().includes(searchInput) ||
        programObj.åldersgräns.toLowerCase().includes(searchInput)
    );
    visaLagrat_filter_rensa(filteredData);
    outputContainer.style.display = "flex";

});

function sparaData(data) {
    const timestamp = new Date().getTime();
    const key = `sparadData_${timestamp}`;
    localStorage.setItem(key, JSON.stringify(data));
}

document.querySelector(".programForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const inputTitel = document.getElementById("inputTitel").value;
    const inputBeskrivning = document.getElementById("inputBeskrivning").value;
    const inputÅlder = document.getElementById("inputÅlder").value;

    if (inputÅlder.trim() !== "" && !isNaN(inputÅlder)) {

        const program = {
            titel: inputTitel,
            beskrivning: inputBeskrivning,
            åldersgräns: inputÅlder,
        };

        sparaData(program);
        totalAntalProgram++;
        visaLagrat_filter_rensa();

        this.reset();

    }
    else {
        alert("Vänligen ange en siffra i ålder :)");
    };

});

const visaProgramButton = document.getElementById("visaProgram");

visaProgramButton.addEventListener("click", function () {
    const allData = getAllDataFromLocalStorage();
    visaLagrat_filter_rensa(allData);
    if (allData != 0) {
        outputContainer.style.display = "flex";
    }
    else {
        outputContainer.style.display = "none";
    }

});