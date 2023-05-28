let selectedAllData = [];
//pending();
function pending() {
  let pendingData = [];
  hidePage();
  document.querySelector(".LeaveApplication").style.display = "block";
  radio_button = document.getElementsByName("flexRadioDefault");
  radio_button[0].checked = true;
  document.querySelector(".menu-page-header-display").style.display = "block";

  fetch("http://localhost:82/api/HrmLeave/GetAllPending")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // Initialize the array
      // Loop through the data and create objects
      data.forEach((item) => {
        const obj = {};
        const selectAll = {};
        obj.employeeId = item.employeeId;
        obj.EmployeeName = item.employeeName;
        obj.leaveTypeCode = item.leaveTypeCode;
        obj.leaveApplyDate = item.leaveApplyDate;
        obj.leaveFromDate = item.leaveFromDate;
        obj.leaveProcessStatus = item.leaveProcessStatus;
        obj.leaveToDate = item.leaveToDate;
        obj.leaveDaysNo = item.leaveDaysNo;
        obj.ApplicationId = item.applicationId;
        selectAll.ApplicationId = item.applicationId;
        pendingData.push(obj);
        selectedAllData.push(selectAll);
      });
      // console.log(" ok ");
      console.log("selectedAllData", selectedAllData);
      // console.log("pendingData :", pendingData);
      displayPendingData();
    });
  // display data in new page
  function displayPendingData() {
    newApprovalContainer = document.querySelector(".approve-new-page");
    // console.log(newApprovalContainer);<button type="button" onclick="SelectAllFunction()" class="selectall-button  ">SelectAll</button>
    newApprovalContainer.innerHTML = `
    <div class="row row-1st  " style="height: 60px"; >
    <div class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction()"  id="flexCheckDefault"  name="selectall" value="All">  All </div>
    <div class="col-1  fw-bold">  ID</div>
    <div class="col-2 fw-bold"> Name</div>
    <div class="col-2 fw-bold">Leave type Code</div>
    <div class="col-2 fw-bold">Apply Date</div>
    <div class="col-1 fw-bold">From Date</div>
    <div class="col-1 fw-bold">To Date</div>
    <div class="col-1 fw-bold">Total Days</div>
    <div class="col-1 fw-bold">Action</div>
  </div>
    `;
    for (let i = 0; i < pendingData.length; i++) {
      newApprovalContainer.innerHTML +=
        `<div class="row  pending-row text-center">
<div class="col-1">
  <input
    class="form-check-input"
    type="checkbox"
    name="box"
    onclick="checkFunction(${i})"
     id="flexCheckDefault"
  />
</div>
<div class="col-1">` +
        pendingData[i].employeeId +
        `</div>
<div class="col-2">  ` +
        pendingData[i].EmployeeName +
        `
         </div>

<div class="col-2">` +
        pendingData[i].leaveTypeCode +
        `</div>
<div class="col-2">` +
        pendingData[i].leaveApplyDate +
        `</div>
<div class="col-1">` +
        pendingData[i].leaveFromDate +
        `</div>
<div class="col-1">` +
        pendingData[i].leaveToDate +
        `</div>
<div class="col-1">` +
        pendingData[i].leaveDaysNo +
        `</div>
<div class="col-1 individual-select-item"><i class="fa-solid fa-xmark cross"  data-bs-toggle="modal"  data-bs-target="#exampleModalReject" onclick="crossFunction(${i})"></i>
 <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="crossFunction(${i})"></i>
</div>
</div>
`;
    }

    // loop through each row and extract the data
  }
}
// onclick function of check box

//onclick on allselect button

// function SelectAllFunction() {
//   var selectall = document.getElementsByName("selectall");
//   var ele = document.getElementsByName("box");
//   // console.log("selectall :", selectall);
//   if (selectall[0].checked) {
//     // console.log("checked");

//     console.log("ele", ele);
//     // console.log(selectedAllData);
//     for (var i = 0; i < ele.length; i++) {
//       ele[i].checked = true;
//       clickedID[i] = i;
//     }
//   } else {
//     for (var i = 0; i < ele.length; i++) {
//       ele[i].checked = false;
//       clickedID[i] = i;
//     }
//   }
// }

// function for pop up NO
function Function_NO() {
  // clickedID = [];
  console.log("Function_NO ", clickedID);
  var selectall = document.getElementsByName("selectall");
  selectall[0].checked = false;
  for (let i = 0; i < clickedID.length; i++) {
    var checkbox = document.getElementsByName("box");
    var value = clickedID[i];
    // console.log("no :", value);
    checkbox[value].checked = false;
  }
}

// // onclick function of check box
let clickedID = [];
function checkFunction(value) {
  // clickedID = [];
  // console.log("checkFunction:", value);
  clickedID.push(value);
  console.log("checkFunction", clickedID);
}
//individual cross
function crossFunction(value) {
  clickedID = [];
  var checkbox = document.getElementsByName("box");
  for (let i = 0; i < checkbox.length; i++) {
    if (i == value) {
      checkbox[value].checked = true;
    } else {
      checkbox[i].checked = false;
    }
  }
  checkbox[value].checked = true;
  clickedID.push(value);
}

// rejectall button
function rejectAll() {
  console.log("rejectAll i:", clickedID);
  console.log("selectedAllData", selectedAllData);
  var totalID = "";
  for (let i = 0; i < clickedID.length; i++) {
    var checkbox = document.getElementsByName("box");
    var checked_id = clickedID[i];
    //checking the checkbox is checked or not
    if (checkbox[checked_id].checked) {
      // const id = selectedAllData[checked_id].ApplicationId;
      var id = selectedAllData[checked_id].ApplicationId;
      // Replace with the ID of the resource you want to update
      if (totalID == "") {
        totalID = id;
      } else {
        totalID = totalID + "," + id;
      }
      console.log("totalID:", totalID);

      console.log("check id :", id);
      // Replace with the value you want to set for the LeaveProcessStatus
    }
  }
  if (clickedID.length > 0) {
    const value = "DisApproved";
    fetch(`http://localhost:82/api/HrmLeave/UpdateStatus/${totalID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        console.log(response);
        pending();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  clickedID.length = 0;
  // selectedAllData.length = 0;
  // location.reload();
}

// approve all button
function approveAll() {
  console.log("approvedAll i:", clickedID);
  console.log("selectedAllData", selectedAllData);
  var totalID = "";
  for (let i = 0; i < clickedID.length; i++) {
    var checkbox = document.getElementsByName("box");
    var checked_id = clickedID[i];
    //checking the checkbox is checked or not
    if (checkbox[checked_id].checked) {
      // const id = selectedAllData[checked_id].ApplicationId;
      var id = selectedAllData[checked_id].ApplicationId;
      // Replace with the ID of the resource you want to update
      if (totalID == "") {
        totalID = id;
      } else {
        totalID = totalID + "," + id;
      }
      console.log("totalID:", totalID);

      console.log("check id :", id);
      // Replace with the value you want to set for the LeaveProcessStatus
    }
  }
  if (clickedID.length > 0) {
    const value = "Approved";
    fetch(`http://localhost:82/api/HrmLeave/UpdateStatus/${totalID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        console.log(response);
        pending();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  clickedID.length = 0;
  // location.reload();
}
// display data in Approved Page
function Approved() {
  document.querySelector(".LeaveApplication").style.display = "none";
  document.getElementById("approved-page").style.display = "block";
  document.getElementById("reject-page").style.display = "none";
  // data load from Api
  const ApprovedData = [];
  fetch("http://localhost:82/api/HrmLeave/GetAllApproved")
    .then((response) => response.json())
    .then((data) => {
      // Initialize the array
      // Loop through the data and create objects
      data.forEach((item) => {
        const obj = {};
        obj.employeeId = item.employeeId;
        obj.employeeName = item.employeeName;
        obj.leaveTypeCode = item.leaveTypeCode;
        obj.leaveApplyDate = item.leaveApplyDate;
        obj.leaveFromDate = item.leaveFromDate;
        obj.leaveProcessStatus = item.leaveProcessStatus;
        obj.leaveToDate = item.leaveToDate;
        obj.leaveDaysNo = item.leaveDaysNo;
        ApprovedData.push(obj);
      });
      displayApprovedData(ApprovedData);
    });
  // Approval function call
  // display data in new page
  function displayApprovedData() {
    // document.getElementById("approved-page").style.display='block';
    ApprovedContainer = document.querySelector(".approve-containner");

    ApprovedContainer.innerHTML = `
      <div class="row row-1st  "  >
      <div class="col fw-bold">Employee Id</div>
      <div class="col fw-bold">Employee Name</div>
      <div class="col fw-bold">Leave type Code</div>
      <div class="col fw-bold">Leave apply date</div>
      <div class="col fw-bold">Leave from Date</div>
      <div class="col-auto fw-bold">Leave to Date</div>
      <div class="col fw-bold">Leaves Day Number</div>
    </div>
      `;
    for (let i = 0; i < ApprovedData.length; i++) {
      ApprovedContainer.innerHTML +=
        `<div class="row text-center">
<div class="col">` +
        ApprovedData[i].employeeId +
        `</div>
        <div class="col">` +
        ApprovedData[i].employeeName +
        `</div>
<div class="col">` +
        ApprovedData[i].leaveTypeCode +
        `</div>
<div class="col">` +
        ApprovedData[i].leaveApplyDate +
        `</div>
<div class="col">` +
        ApprovedData[i].leaveFromDate +
        `</div>
<div class="col">` +
        ApprovedData[i].leaveToDate +
        `</div>
<div class="col">` +
        ApprovedData[i].leaveDaysNo +
        `</div>
</div>
`;
    }
  }
}
// display Rejected Page
function Rejected() {
  document.querySelector(".LeaveApplication").style.display = "none";
  document.getElementById("approved-page").style.display = "none";
  document.getElementById("reject-page").style.display = "block";
  // data load from Api
  const DisApprovedData = [];
  fetch("http://localhost:82/api/HrmLeave/GetAllDisApproved")
    .then((response) => response.json())
    .then((data) => {
      // Initialize the array
      // Loop through the data and create objects
      data.forEach((item) => {
        const obj = {};
        obj.employeeId = item.employeeId;
        obj.employeeName = item.employeeName;
        obj.leaveTypeCode = item.leaveTypeCode;
        obj.leaveApplyDate = item.leaveApplyDate;
        obj.leaveFromDate = item.leaveFromDate;
        obj.leaveProcessStatus = item.leaveProcessStatus;
        obj.leaveToDate = item.leaveToDate;
        obj.leaveDaysNo = item.leaveDaysNo;
        DisApprovedData.push(obj);
      });
      displayDisApprovedData(DisApprovedData);
    });
  // Approval function call
  // display data in new page
  function displayDisApprovedData() {
    // document.getElementById("approved-page").style.display='block';
    DisApprovedContainer = document.querySelector(".Disapprove-containner");
    DisApprovedContainer.innerHTML = `
    <div class="row row-1st  "  >
    <div class="col fw-bold">Employee Id</div>
    <div class="col fw-bold">Employee Name</div>
    <div class="col fw-bold">Leave type Code</div>
    <div class="col fw-bold">Leave apply date</div>
    <div class="col fw-bold">Leave from Date</div>
    <div class="col fw-bold">Leave to Date</div>
    <div class="col fw-bold">Leaves Day Number</div>
  </div>
    `;
    for (let i = 0; i < DisApprovedData.length; i++) {
      DisApprovedContainer.innerHTML +=
        `<div class="row text-center">
<div class="col">` +
        DisApprovedData[i].employeeId +
        `</div>
<div class="col">` +
        DisApprovedData[i].employeeName +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveTypeCode +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveApplyDate +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveFromDate +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveToDate +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveDaysNo +
        `</div>
</div>
`;
    }
  }
}
