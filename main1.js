var getLoanAmount=()=>{return document.getElementById("loanAmount").value;}
var gettenure=()=>{return document.getElementById("tenure").value;}
var getInterestRate=()=>{return document.getElementById("interestRate").value;}

function start(){
    calculateHomeLoan();
}

function getEMI(){
    let monthlyInterest=getInterestRate()/12/100;
    let x=Math.pow(1+monthlyInterest,gettenure()*12);
    return getLoanAmount()*monthlyInterest*(x/(x-1));
}

function TotalAmountPayable(){
    return (getEMI()*gettenure()*12);
}
function calculateHomeLoan(){
    document.getElementById("EMI").innerHTML=getEMI().toFixed();
    document.getElementById("interestAmount").innerHTML=(TotalAmountPayable()-getLoanAmount()).toFixed();
    document.getElementById("amountPayable").innerHTML=TotalAmountPayable().toFixed();
    getarray();
    console.log(getarray());
     printTable() 
}

function getarray(){
let array=[];
let openAmount=TotalAmountPayable().toFixed();
let emi=getEMI().toFixed();
for(i=1;i<=gettenure()*12;i++){
    let monthlyinterestPaid=(openAmount*(getInterestRate()/12/100)).toFixed();
    let closingBalance = openAmount-emi;
    if(closingBalance<0){closingBalance=0;}
    array[i]={month:i,openingBalance:openAmount,EMI:emi,interestPaid:monthlyinterestPaid,principalPaid:emi-monthlyinterestPaid,closingBalance:closingBalance}
    openAmount=openAmount-emi;
}
    return array;
}

function printTable(){
    var a=getarray();
var tb="<table ><tr><th>Month</th><th>Opening Balance</th><th>EMI</th><th>Monthly Interest Paid</th><th>Monthly Principal Paid</th><th>Closing Balance</th></tr><tr>";
for(var i=0;i<a.length;i++){
    tb+="<tr>";
for(j in a[i]){
    tb+="<td>"+a[i][j]+"</td>";
}
tb+="</tr>";
}
tb+="</table>";

document.getElementById("fetch").innerHTML=tb;
}
