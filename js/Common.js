// For api

function callApi(...arg) {
  let controllerName = arg[0];
  let funcName = arg[1];
  return new Promise((resolve, reject) => {
    //  https://localhost:7160/api/HrmLeave/GetAllApplication

    fetch(`https://localhost:7160/api/${controllerName}/${funcName}`)
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function ModalYes() {
  return "Yes";
}

// update status
function ApproveAll() {
  let value = "Approved";
  console.log(value);
  UpdateDatabase(value);
}

function RejectAll() {
  let value = "disapproved";
  UpdateDatabase(value);
}

function UpdateDatabase(value) {
  const ApplicationPage = document.querySelector("#ApplicationPage");
  const className = ApplicationPage.className;
  var checkbox = document.getElementsByName("box");

  // checking Material  stock value changed or not
  var StockInputArray = MaterialInputCkeck();
  console.log("StockInputIndex", StockInputArray);
  if (StockInputArray.length > 0) {
    RetriveMaterialRowsData(StockInputArray);
  } else {
    let totalID = "";
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        if (totalID == "") {
          totalID = checkbox[i].id;
        } else {
          totalID = totalID + "," + checkbox[i].id;
        }
        console.log("totalID:", totalID);
      }
    }

    console.log("totalID length:", totalID.length);
    if (totalID.length > 0) {
      //  https://localhost:7160/api/HrmLeave/GetAllApplication
      fetch(`https://localhost:7160/api/${className}/UpdateStatus/${totalID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((response) => {
          console.log(response);

          // creating  radio button opbject
          let PendingRadio = document.getElementById("flexRadioDefault1");
          let ApprovedRadio = document.getElementById("flexRadioDefault2");
          let RejectedRadio = document.getElementById("flexRadioDefault3");

          // checking which page is open
          if (className == "HrmLeave") {
            if (PendingRadio.checked) {
              // The radio button is checked
              LeaveApplicationPending();
            }
            if (ApprovedRadio.checked) {
              // The radio button is checked
              LeaveApplicationApproved();
            }
            if (RejectedRadio.checked) {
              // The radio button is checked
              LeaveApplicationReject();
            }
          } else if (className == "MaterialRequisition") {
            if (PendingRadio.checked) {
              // The radio button is checked
              RequisitionApplicationPending();
            }
            if (ApprovedRadio.checked) {
              // The radio button is checked
              RequisitionApplicationApproved();
            }
            if (RejectedRadio.checked) {
              // The radio button is checked
              RequisitionApplicationRejected();
            }
          } else if (className == "PurchaseOrder") {
            if (PendingRadio.checked) {
              // The radio button is checked
              PurchaseOrderPending();
            }
            if (ApprovedRadio.checked) {
              // The radio button is checked
              PurchaseOrderApproved();
            }
            if (RejectedRadio.checked) {
              // The radio button is checked
              PurchaseOrderRejected();
            }
          } else if (className == "RateCollection") {
            if (PendingRadio.checked) {
              // The radio button is checked
              RateCollectionPending();
            }
            if (ApprovedRadio.checked) {
              // The radio button is checked
              RateCollectionApproved();
            }
            if (RejectedRadio.checked) {
              // The radio button is checked
              RateCollectionRejected();
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // requisiton
    let remarks = document.querySelectorAll('input[name="Remarks"]');
    let remarksInputIndex = [];
    for (let i = 0; i < remarks.length; i++) {
      if (remarks[i].value != "" && checkbox[i].checked)
        // console.log(remarks[i].value);
        remarksInputIndex.push(i);
    }
    console.log(remarksInputIndex);
    if (remarksInputIndex.length > 0) {
      RetriveDataFromRows();
    }
  }
}

//material input check
function MaterialInputCkeck() {
  var checkbox = document.getElementsByName("box");
  let StockInputvalue = document.querySelectorAll('input[name="StockInput"]');
  console.log("StockInputvalue", StockInputvalue);
  let StockInputArray = [];

  let checkedCount = 0;
  for (let i = 0; i < StockInputvalue.length; i++) {
    if (StockInputvalue[i].value != null && checkbox[i].checked) {
      checkedCount++;
      // if (
      //   StockInputvalue[i].value != StockInputvalue[i].id &&
      //   StockInputvalue[i].value != null
      // ) {
      //   console.log(" value", StockInputvalue[i].value);
      //   console.log(" id", StockInputvalue[i].id);
      StockInputArray.push(i);

      // }
    }
    console.log("StockInputArray", StockInputArray);
  }
  // console.log(
  //   "StockInputArray.lenght <checkedCount",
  //   StockInputArray.length,
  //   checkedCount
  // );
  // if (StockInputArray.length < checkedCount) {
  //   var myModal = document.getElementById("exampleModalApprove");
  //   console.log("myModal", myModal);
  //   myModal.style.display = "none";

  //   alert("give new stock data on selected goods");
  // }
  // if (StockInputvalue[i].value == null && checkbox[i].checked) {
  //   alert("give new stock data on selected goods");
  // }
  return StockInputArray;
}

function hidePage() {
  document.querySelector(".home-page").style.display = "none";
  document.querySelector("#saleSection").style.display = "none";
  document.getElementById("ApplicationPage").style.display = "block";
  document.querySelector(".menu-page-header-design").style.display = "flex";
  document.getElementById("PO-Report").style.display = "none";
  document.getElementById("LeaveReportSection").style.display = "none";
  document.getElementById("newLeaveApplication").style.display = "none";
  // document.querySelector(".report-button").style.display = "none";
}

function SelectAllFunction(selectall, box) {
  console.log(selectall, box);
  var selectall = document.getElementById(selectall);
  var box = document.getElementsByName(box);
  if (selectall.checked) {
    console.log("box", box);
    for (var i = 0; i < box.length; i++) {
      box[i].checked = true;
    }
  } else {
    for (var i = 0; i < box.length; i++) {
      box[i].checked = false;
    }
  }
}

//individual cross ,select
function IndividualSelectCross(boxID) {
  console.log("BOX id", boxID);
  var box = document.getElementsByName("box");
  for (let i = 0; i < box.length; i++) {
    box[i].checked = false;
  }
  var checkbox = document.getElementById(boxID);
  checkbox.checked = true;
}

//modal no

function Function_NO() {
  var selectall = document.getElementsByName("selectall");
  var checkbox = document.getElementsByName("box");
  selectall.checked = false;
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].checked = false;
  }
}

function Alert() {
  alert("b wghn");
}

function showModal() {
  var modal = document.getElementById("exampleModalApprove");
  console.log("modal", modal);
  modal.style.display = "block";
  console.log((modal.style.display = "block"));
}

// for Block page

// function BlockPage(PageName) {
//   document.getElementById("Application-header-display").style.display = "none";
//   document.querySelector("#LeaveApplicationApproved-page").style.display =
//     "none";
//   document.querySelector("#LeaveApplicationReject-page").style.display = "none";
//   document.querySelector(".home-page").style.display = "none";
//   document.querySelector(".requisition-header-display").style.display = "none";
//   document.getElementById("RequisitionApplication").style.display = "none";
//   document.getElementById("LeaveApplication").style.display = "none";
//   document.getElementById("requisition-approved-page").style.display = "none";
//   document.getElementById("requisition-rejected-page").style.display = "none";
//   document.getElementById("purchaseOrder").style.display = "none";
//   document.getElementById(".purchase-header-display").style.display = "none";
//   document.getElementById("purchaseOrder-approved-page").style.display = "none";
//   document.getElementById("purchaseOrder-rejected-page").style.display = "none";
//   document.getElementById("PO-Report").style.display = "none";

//   // for block
//   document.getElementById(`${PageName}`).style.display = "block";
// }

// function RadioOnclickFunction(pending, approved, rejected) {
//   let PendingRadio = document.getElementById("flexRadioDefault1");
//   let ApprovedRadio = document.getElementById("flexRadioDefault2");
//   let RejectedRadio = document.getElementById("flexRadioDefault3");
//   PendingRadio.checked = true;
//   console.log(RejectedRadio);
//   PendingRadio.removeEventListener("click", (event) => {
//     event.target.removeEventListener;
//   });
//   PendingRadio.addEventListener("click", pending);

//   ApprovedRadio.removeEventListener("click", (event) => {
//     event.target.removeEventListener;
//   });
//   ApprovedRadio.addEventListener("click", approved);

//   RejectedRadio.removeEventListener("click", (event) => {
//     event.target.removeEventListener;
//   });
//   RejectedRadio.addEventListener("click", rejected);
// }
