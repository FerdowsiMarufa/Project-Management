function LeaveApplicationMutualFunction() {
  // RadioOnclickFunction(
  //   LeaveApplicationPending,
  //   LeaveApplicationApproved,
  //   LeaveApplicationReject
  // );

  let radio_div = document.querySelector(".radio-div");
  radio_div.innerHTML = `<div class="form-check">
  <input
    class="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault1"
    checked
    onclick="LeaveApplicationPending()"
  />
  <label class="form-check-label me-3" for="flexRadioDefault1">
    New
  </label>
</div>
<div class="form-check">
  <input
    class="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault2"
    onclick="LeaveApplicationApproved()"
  />
  <label class="form-check-label me-3" for="flexRadioDefault2">
    Approved
  </label>
</div>
<div class="form-check">
  <input
    class="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault3"
    onclick="LeaveApplicationReject()"
  />
  <label class="form-check-label me-3" for="flexRadioDefault3">
    Rejected
  </label>
</div>`;
  hidePage();
  LeaveApplicationPending();

 
}

function LeaveApplicationPending() {
  let leaveAppPendingData = [];

  callApi("HrmLeave", "GetAllPending")
    .then((data) => {
      data.forEach((item) => {
        const obj = {};

        obj.employeeId = item.employeeId;
        obj.EmployeeName = item.employeeName;
        obj.leaveTypeCode = item.leaveTypeCode;
        obj.leaveApplyDate = item.leaveApplyDate;
        obj.leaveFromDate = item.leaveFromDate;
        obj.leaveProcessStatus = item.leaveProcessStatus;
        obj.leaveToDate = item.leaveToDate;
        obj.leaveDaysNo = item.leaveDaysNo;
        obj.ApplicationId = item.applicationId;

        leaveAppPendingData.push(obj);
      });

      displayleaveAppPendingData(leaveAppPendingData);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayleaveAppPendingData(leaveAppPendingData) {
  console.log(leaveAppPendingData);
  hidePage();
  
  DataContainer = document.querySelector("#ApplicationContainer");
  // here we add {HrmLeave} as a class that we can access  update(api) url data
  let sectionContainer = document.querySelector("#ApplicationPage");
  sectionContainer.classList = "HrmLeave";
  // console.log(newApprovalContainer);<button type="button" onclick="SelectAllFunction()" class="selectall-button  ">SelectAll</button>
  DataContainer.innerHTML = `
        <div class="row row-1st  " style="height: 60px"; >
        <div class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('LeavePendingSelectAll','box')"  id="LeavePendingSelectAll"  name="selectall" value="All">  All </div>
        <div class="col-1  fw-bold"> ID</div>
        <div class="col-2 fw-bold"> Name</div>
        <div class="col-2 fw-bold">Leave type Code</div>
        <div class="col-2 fw-bold">Apply Date</div>
        <div class="col-1 fw-bold">From Date</div>
        <div class="col-1 fw-bold">To Date</div>
        <div class="col-1 fw-bold">Total Days</div>
        <div class="col-1 fw-bold">Action</div>
      </div>
        `;
  for (let i = 0; i < leaveAppPendingData.length; i++) {
    DataContainer.innerHTML +=
      `<div class="row  pending-row text-center">
    <div class="col-1">
      <input
        class="form-check-input  leaveCheckbox"
        type="checkbox"
        name="box"
        id= ${leaveAppPendingData[i].ApplicationId}
      />
    </div>
    <div class="col-1">` +
      leaveAppPendingData[i].employeeId +
      `</div>
    <div class="col-2">  ` +
      leaveAppPendingData[i].EmployeeName +
      `
             </div>
    
    <div class="col-2">` +
      leaveAppPendingData[i].leaveTypeCode +
      `</div>
    <div class="col-2">` +
      leaveAppPendingData[i].leaveApplyDate +
      `</div>
    <div class="col-1">` +
      leaveAppPendingData[i].leaveFromDate +
      `</div>
    <div class="col-1">` +
      leaveAppPendingData[i].leaveToDate +
      `</div>
    <div class="col-1">` +
      leaveAppPendingData[i].leaveDaysNo +
      `</div>
    <div class="col-1 individual-select-item"><i class="fa-solid fa-xmark cross"  data-bs-toggle="modal"  data-bs-target="#exampleModalReject" onclick="IndividualSelectCross(${leaveAppPendingData[i].ApplicationId})"></i>
     <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross(${leaveAppPendingData[i].ApplicationId})"></i><i class="bi bi-eye-fill view-icon" onclick="GetLeaveReport(${leaveAppPendingData[i].ApplicationId},'Pending', ${i},'leaveCheckbox')"></i>
    </div>
    </div>
    `;
  }
 

 
 

  const buttonDiv = document.querySelector(".button-div");
 

  // Add some content to the button div element
  buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>
                 <button type="button" class="reject-button"  id="LeaveRejectbutton" data-bs-toggle="modal" data-bs-target="#exampleModalReject" >Reject</button>`;

 
 
}

//show approved data

function LeaveApplicationApproved() {
  let ApprovedData = [];
  hidePage();
  callApi("HrmLeave", "GetAllApproved")
    .then((data) => {
      // Initialize the array
      console.log(data);
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
    })
    .catch((error) => {
      console.error(error);
    });

  //display function
  function displayApprovedData() {
    DataContainer = document.querySelector("#ApplicationContainer");

    DataContainer.innerHTML = `
        <div class="row row-1st">
        <div class="col fw-bold">Employee Id</div>
        <div class="col fw-bold">Employee Name</div>
        <div class="col fw-bold">Leave type Code</div>
        <div class="col fw-bold">Leave apply date</div>
        <div class="col fw-bold">Leave from Date</div>
        <div class="col-auto fw-bold">Leave to Date</div>
        <div class="col fw-bold">Leaves Day Number</div>
        <div class="col fw-bold">Action</div>
      </div>
        `;
    for (let i = 0; i < ApprovedData.length; i++) {
      DataContainer.innerHTML +=
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
        <div class="col"><i class="bi bi-eye-fill view-icon" onclick="GetLeaveReport(${ApprovedData[i].ApplicationId})"></i></div>
  </div>
  `;
    }
 
    const buttonDiv = document.querySelector(".button-div");
 

    // Add some content to the new div element
    buttonDiv.innerHTML = "";
  
 
  }
}

//show Rejected data

function LeaveApplicationReject() {
  let DisApprovedData = [];
  hidePage();
  callApi("HrmLeave", "GetAllDisApproved").then((data) => {
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
      obj.ApplicationId = item.applicationId;
      DisApprovedData.push(obj);
    });
    displayDisApprovedData(DisApprovedData);
  });
  // Approval function call
  // display data
  function displayDisApprovedData() {
    // document.getElementById("approved-page").style.display='block';
    DataContainer = document.querySelector("#ApplicationContainer");
    DataContainer.innerHTML = `
  <div class="row row-1st  "  >
  <div class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('LeaveRejectSelectAll','box')"  id="LeaveRejectSelectAll"  name="selectall" value="All">  All </div>
  <div class="col-1 fw-bold">Employee Id</div>
  <div class="col-2 fw-bold">Employee Name</div>
  <div class="col fw-bold">Leave type Code</div>
  <div class="col fw-bold">Leave apply date</div>
  <div class="col-2 fw-bold">Leave from Date</div>
  <div class="col fw-bold">Leave to Date</div>
  <div class="col fw-bold">Leaves Day Number</div>
  <div class="col fw-bold">Action</div>
</div>
  `;
    for (let i = 0; i < DisApprovedData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row text-center">
        <div class="col-1">
        <input
          class="form-check-input rejectCheckbox"
          type="checkbox"
          name="box"
         
          id= ${DisApprovedData[i].ApplicationId}
        />
      </div>
<div class="col-1">` +
        DisApprovedData[i].employeeId +
        `</div>
<div class="col-2">` +
        DisApprovedData[i].employeeName +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveTypeCode +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveApplyDate +
        `</div>
<div class="col-2">` +
        DisApprovedData[i].leaveFromDate +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveToDate +
        `</div>
<div class="col">` +
        DisApprovedData[i].leaveDaysNo +
        `</div>  
         <div class="col ">
        <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross( ${DisApprovedData[i].ApplicationId})"></i><i class="bi bi-eye-fill view-icon" onclick="GetLeaveReport(${DisApprovedData[i].ApplicationId},'Rejected',${i},'rejectCheckbox')"></i>
        </div>
</div>
`;
    }

 

 
    const buttonDiv = document.querySelector(".button-div");
 

    // Add some content to the new div element
    buttonDiv.innerHTML = `<button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>`;
  
  }
}

