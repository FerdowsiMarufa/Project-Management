// let POValue = "PO-19-0249";
function GetDateInWords(date) {
  const dobString = date;
  const dob = new Date(dobString);
  const dobArr = dob.toDateString().split(" ");
  const dobFormat = dobArr[2] + " " + dobArr[1] + " " + dobArr[3];
  return dobFormat;
}
const wordify = (num) => {
  num = parseInt(num);
  if (num == 0) return "zero";
  const single = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const double = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const formatTenth = (digit, prev) => {
    return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit]);
  };
  const formatOther = (digit, next, denom) => {
    return (
      (0 != digit && 1 != next ? " " + single[digit] : "") +
      (0 != next || digit > 0 ? " " + denom : "")
    );
  };
  let res = "";
  let index = 0;
  let digit = 0;
  let next = 0;
  let words = [];
  if (((num += ""), isNaN(parseInt(num)))) {
    res = "";
  } else if (parseInt(num) > 0 && num.length <= 10) {
    for (index = num.length - 1; index >= 0; index--)
      switch (
        ((digit = num[index] - 0),
        (next = index > 0 ? num[index - 1] - 0 : 0),
        num.length - index - 1)
      ) {
        case 0:
          words.push(formatOther(digit, next, ""));
          break;
        case 1:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? " " +
                  single[digit] +
                  " Hundred" +
                  (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "")
              : ""
          );
          break;
        case 3:
          words.push(formatOther(digit, next, "Thousand"));
          break;
        case 4:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 5:
          words.push(formatOther(digit, next, "Lakh"));
          break;
        case 6:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 7:
          words.push(formatOther(digit, next, "Crore"));
          break;
        case 8:
          words.push(formatTenth(digit, num[index + 1]));
          break;
        case 9:
          words.push(
            0 != digit
              ? " " +
                  single[digit] +
                  " Hundred" +
                  (0 != num[index + 1] || 0 != num[index + 2]
                    ? " and"
                    : " Crore")
              : ""
          );
      }
    res = words.reverse().join("");
  } else res = "";
  return res;
};
// GetPoReport();
function GetPoReport(value, datatype, rowIndex ,CheckBoxClassName) {
 

  let POValue = value;
  radio_button = document.getElementsByName("flexRadioDefault");
  document.getElementById("ApplicationPage").style.display = "none";
  document.getElementById("PO-Report").style.display = "block";
  radio_button[0].checked = false;
  // fetch(`//localhost:82/api/PurchaseOrder/GetPurchaseReportData/${POValue}`)
  fetch(`https://localhost:7160/api/PurchaseOrder/GetPurchaseReportData/${POValue}`)
    .then((response) => response.json())
    .then((data) => {
      GetData(data);
      CreateReportButton(datatype,"pdiv");
      ReportViewCheckBox(CheckBoxClassName, rowIndex);
    })
    .catch((error) => console.error(error));
  function GetData(data) {
    let head = document.getElementById("head");
    let pdiv = document.getElementById("pdiv");
    head.innerHTML = `
         <p>PO: ${POValue}</p>
         <p>Date: ${GetDateInWords(data[0].poDate)}</p>
         <p><span class="fw-bold">${data[0].vendorName}</span></p>
         <address>${data[0].officeAddress}</address>
         <p>Attn:Mr. ${data[0].ownerName}</p>
         <p class="fw-bold">Sub:Purchase Order</p>
         <p>Dear Mr. ${data[0].ownerName}</p>
         <article>With reference to Quotation no: dated ${GetDateInWords(
           data[0].poDate
         )}, we are pleased to issue this Purchase Order for supply goods </br> as per details, terms and conditions given below:
          </article>
         `;
    let tbl = document.getElementById("tbody");
    tbl.innerHTML = `<tr>
    <th>Req. No.</th>
    <th >Description</td>
    <th>Brand</th>
    <th>Unit</th>
    <th>Qty</th>
    <th>Unit Rate</th>
    <th>Original Amount</th>
    <th>Discount(BDT)</th>
    <th>Amount(BDT)</th>
</tr>`;
    let TotalOrginalAmount = 0;
    let TotalAmount = 0;
    for (let i = 0; i < data.length; i++) {
      let Trow = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerText = "" + data[i].requisitionNo;
      Trow.appendChild(td1);
      let td2 = document.createElement("td");
      td2.innerText = "" + data[i].description;
      Trow.appendChild(td2);
      let td3 = document.createElement("td");
      td3.innerText = "" + data[i].brandName;
      Trow.appendChild(td3);
      let td4 = document.createElement("td");
      td4.innerText = "" + data[i].unit;
      Trow.appendChild(td4);
      let td5 = document.createElement("td");
      td5.innerText = "" + data[i].qty;
      Trow.appendChild(td5);
      let td6 = document.createElement("td");
      td6.innerText = "" + parseFloat(data[i].unitRate).toLocaleString();
      Trow.appendChild(td6);
      let td7 = document.createElement("td");
      td7.innerText = "" + parseFloat(data[i].originalAmount).toLocaleString();
      Trow.appendChild(td7);
      let td8 = document.createElement("td");
      td8.innerText = "" + parseFloat(data[i].discountTk).toLocaleString();
      Trow.appendChild(td8);
      let td9 = document.createElement("td");
      // let am=data[i].amount.toLocaleString()
      td9.innerText = "" + parseFloat(data[i].amount).toLocaleString();
      Trow.appendChild(td9);
      TotalAmount += parseFloat(data[i].amount);
      TotalOrginalAmount += parseFloat(data[i].originalAmount);
      tbl.appendChild(Trow);
    }
    let Trow = document.createElement("tr");
    Trow.innerHTML = `
         <td colspan="6" class="text-end fw-bold">Sub Total (${
           data[i].name
         })</td>
         <td class="fw-bold">${TotalOrginalAmount.toLocaleString()}</td>
         <td></td>
         <td class="fw-bold">${TotalAmount.toLocaleString()}</td>
         `;
    tbl.appendChild(Trow);
    tbl.innerHTML += ` <tr>
         <td colspan="6" class="text-end fw-bold">${data[0].otherCost.toLocaleString()}</td>
         <td class="fw-bold"></td>
         <td class="fw-bold"></td>
         <td class="fw-bold">${data[0].otherCostAmount.toLocaleString()}</td>
         </tr>`;
    TotalAmount += parseFloat(data[0].otherCostAmount);
    tbl.innerHTML += `<tr>
                <td colspan="6" class="text-end fw-bold">Total (BDT)</td>
                <td class="fw-bold"></td>
                <td class="fw-bold"></td>
                <td class="fw-bold">${TotalAmount.toLocaleString()}</td>
              </tr> `;
    pdiv.innerHTML = `<div>
              <p>Total Value (in Word): <b>${TotalAmount.toLocaleString()}/ -</b> ( ${wordify(
      TotalAmount
    )} ) only.</p>
              <p class="fw-bold">Terms & Conditions:</p>
              <p>${data[0].termsCondition}
                </p>
             <p>Delivery Address:${data[0].deliveryAddress}
             </p>
             <p>VAT Reg.No ${data[0].vatRegNo}</p>
             <p>3. Contract Person:${data[0].deliveryContactPerson}</p>
            <p>${
              data[0].otherCost
            } (${data[0].otherCostAmount.toLocaleString()}/-approx)</p>
           </div>
                 `;
    console.log(document.getElementById("PO-Report"));
  }
}
