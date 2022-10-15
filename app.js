window.onload = function () {
    currencyTable.init();
}

class CurrencyTable {

    // currentDate = null;
    url = 'https://api.nbp.pl/api/exchangerates/tables/a/today/?format=json';
    currTable = document.querySelector("#exchangeRates tbody");
    chosenRates = document.querySelector("#singleRate tbody");

    init() {
        console.log("app started");
        document.getElementById("currentDate").innerHTML = new Date().toLocaleString();
        this.loadData();
    }

    loadData() {
        const data = fetch(this.url)
            .then(res => res.json())
            .then(data => this.parseData(data));
    }

    parseData(data) {
        data = data[0];
        console.log(data);
        this.table = data.table;
        this.effectiveDate = data.effectiveDate;
        this.dataNo = data.no;
        this.rates = data.rates;

        document.querySelector("#dataSheetNo").innerText = `Sheet no: ${this.dataNo} from ${this.effectiveDate}`;

        this.addChoosenRates(data.rates);

        for (const dataKey in data.rates) {
            this.addRateToTable(data.rates[dataKey]);
        }
    }

    addRateToTable(currRecord) {
        console.log(currRecord);
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td class="align-middle"> ${currRecord.code} </td>
            <td class="align-middle"> ${currRecord.currency} </td>
            <td class="align-middle"> ${(currRecord.mid).toFixed(3)} pln</td>
        `;
        this.currTable.appendChild(tableRow);
    }

    addChoosenRates(singleRate) {
        let usdRate = document.createElement("tr");
        let eurRate = document.createElement("tr");
        let chfRate = document.createElement("tr");
        let gbpRate = document.createElement("tr");
        let dkkRate = document.createElement("tr");
        usdRate.innerHTML = `
            <td class="align-middle"> ${singleRate[1].code} </td>
            <td class="align-middle"> ${singleRate[1].currency} </td>
            <td class="align-middle"> ${(singleRate[1].mid).toFixed(3)} pln</td>
        `;
        eurRate.innerHTML = `
            <td class="align-middle"> ${singleRate[7].code} </td>
            <td class="align-middle"> ${singleRate[7].currency} </td>
            <td class="align-middle"> ${(singleRate[7].mid).toFixed(3)} pln</td>
        `;
        chfRate.innerHTML = `
            <td class="align-middle"> ${singleRate[9].code} </td>
            <td class="align-middle"> ${singleRate[9].currency} </td>
            <td class="align-middle"> ${(singleRate[9].mid).toFixed(3)} pln</td>
        `;
        gbpRate.innerHTML = `
            <td class="align-middle"> ${singleRate[10].code} </td>
            <td class="align-middle"> ${singleRate[10].currency} </td>
            <td class="align-middle"> ${(singleRate[10].mid).toFixed(3)} pln</td>
        `;
        dkkRate.innerHTML = `
            <td class="align-middle"> ${singleRate[14].code} </td>
            <td class="align-middle"> ${singleRate[14].currency} </td>
            <td class="align-middle"> ${(singleRate[14].mid).toFixed(3)} pln</td>
        `;
        this.chosenRates.appendChild(usdRate);
        this.chosenRates.appendChild(eurRate);
        this.chosenRates.appendChild(chfRate);
        this.chosenRates.appendChild(gbpRate);
        this.chosenRates.appendChild(dkkRate);
    }
    //
    // myFunction = () => {
    //     let input, filter, ul, li, a, i, txtValue;
    //     input = document.getElementById('myInput');
    //     filter = input.value.toUpperCase();
    //     ul = document.getElementById("myUL");
    //     li = ul.getElementsByTagName('li');
    //
    //     for (i = 0; i < li.length; i++) {
    //         a = li[i].getElementsByTagName("a")[0];
    //         txtValue = a.textContent || a.innerText;
    //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //             li[i].style.display = "";
    //         } else {
    //             li[i].style.display = "none";
    //         }
    //     }
    // }
}

const currencyTable = new CurrencyTable();

