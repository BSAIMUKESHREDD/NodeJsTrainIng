

//To get data from input
function getLoanAmount() {
    return document.getElementById("loanAmount").value;
}
function getTenure() {
    return document.getElementById("tenure").value;
}
function getIntrestRate() {
    return document.getElementById("interestRate").value;
}

// To start 
function start() {
    calculateLoan();
}

//  To get Emi for Each Month
function getEmi() {
    let a = Math.pow(1 + getIntrestRate() / 12 / 100, getTenure() * 12);
    return (getLoanAmount() * getIntrestRate() / 12 / 100 * (a / (a - 1))).toFixed();
}

//To GeT Amount Payable
function TotalAmountPayable() {
    return (getEmi() * getTenure() * 12).toFixed();
}

// Calulate All Values for Display 
function calculateLoan() {
    getValues();
    tableCreation()
    // displayAmortizationSchedule(array);
    document.getElementById("EMI").innerHTML = getEmi();
    document.getElementById("interestAmount").innerHTML = (TotalAmountPayable() - getLoanAmount()).toFixed();
    document.getElementById("amountPayable").innerHTML = TotalAmountPayable();

}

//Calculate Output Values And send in an array
function getValues() {
    let array = [];
    let openAmount = getLoanAmount();
    let emi = getEmi();
    for (i = 1; i <= getTenure() * 12; i++) {
        let monthlyinterestPaid = (openAmount * (getIntrestRate() / 12 / 100)).toFixed();
        let closingBalance = openAmount - emi;
        if (closingBalance < 0) { closingBalance = 0; }
        let obj = {
            month: i,
            openingBalance: openAmount,
            EMI: emi,
            interestPaid: monthlyinterestPaid,
            principalPaid: emi - monthlyinterestPaid,
            closingBalance: closingBalance
        }

        openAmount = openAmount - emi;
        array.push(obj);


    }

    return array;
}

console.log(...getValues());







//function to Create data in table formayt

function tableCreation() {
    let table = document.createElement('Table');
    let row = table.insertRow();
    let ce = row.insertCell();ce.textContent = "Month";
    ce = row.insertCell();ce.textContent = "Begining Loan Balance";
    ce = row.insertCell(); ce.textContent = "EMI";
    ce = row.insertCell(); ce.textContent = "Principal";
    ce = row.insertCell(); ce.textContent = "Monthly Interest";
    ce = row.insertCell(); ce.textContent = "Outstanding Balance";
    for (let i of getValues()) {
        table.insertRow();
        let key = Object.values(i);
        
        for (let cell of key) {
            let newCell = table.rows[table.rows.length - 1].insertCell();
            newCell.textContent = cell;
        }
    }
    document.table.appendChild(Table);
}
// working table code


//  let table = document.createElement('table');
// let row = table.insertRow();
// let cell = row.insertCell();
// cell.textContent = "New Cell!";
// cell = row.insertCell();
// cell.textContent = "Second Cell";

// document.body.appendChild(table);


// console.log(table);

