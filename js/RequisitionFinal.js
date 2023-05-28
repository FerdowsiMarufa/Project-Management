function RequisitionMutualFunction() {
  // RadioOnclickFunction(
  //   RequisitionApplicationPending,
  //   RequisitionApplicationApproved,
  //   RequisitionApplicationRejected
  // );
  let radio_div = document.querySelector(".radio-div");
  radio_div.innerHTML = `<div class="form-check">
  <input
    class="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault1"
    checked
    onclick="RequisitionApplicationPending()"
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
    onclick="RequisitionApplicationApproved()"
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
    onclick="RequisitionApplicationRejected()"
  />
  <label class="form-check-label me-3" for="flexRadioDefault3">
    Rejected
  </label>
</div>`;
  hidePage();
  RequisitionApplicationPending();
}

function RequisitionApplicationPending() {
  let pendingData = [];

  let sectionContainer = document.querySelector("#ApplicationPage");
  sectionContainer.classList = "MaterialRequisition";
  callApi("MaterialRequisition", "GetAllMRequisitionPending").then((data) => {
    console.log("data", data);
    // Initialize the array

    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};

      obj.mRequisitionId = item.mRequisitionId;
      obj.mRequisitionCode = item.mRequisitionCode;
      obj.projectMasterCode = item.projectMasterCode;
      obj.manualRequisitionNo = item.manualRequisitionNo;
      obj.requisitionBy = item.requisitionBy;
      obj.date = item.date;
      obj.status = item.status;

      pendingData.push(obj);

      // selectedAllRequisitionData.push(selectAll);
    });
    console.log("data", pendingData);
    displayPendingData();
  });

  // display data in pending page
  function displayPendingData() {
    DataContainer = document.querySelector("#ApplicationContainer");
    // console.log(newApprovalContainer);<button type="button" onclick="SelectAllFunction()" class="selectall-button  ">SelectAll</button>
    DataContainer.innerHTML = `
    <div class="row row-1st  " style="height: 60px"; >
    <div  class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('RequisitionPendingSelectAll','box')"  id="RequisitionPendingSelectAll"  name="selectall" value="All">  All </div>
    <div   class="col-1  fw-bold">  Requisition Id</div>
    <div   class="col-2 fw-bold">Requisition By</div>
    <div class="col fw-bold"> Requisition Code</div>
    <div   class="col-2 fw-bold">Project Master Code</div>
    <div   class="col-1 fw-bold">Date</div>
    <div    class="col-2 fw-bold"> Remarks</div>
    <div   class="col-1 fw-bold">View</div>
  </div>
    `;
    for (let i = 0; i < pendingData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row  requisition-row text-center">
        <div  id="col" class="col-1">
        <input
          class="form-check-input"
          type="checkbox"
          name="box"
           id=${pendingData[i].mRequisitionId}
        />
      </div>
<div id="col" class="col-1 requisition-col">` +
        pendingData[i].mRequisitionId +
        `</div>
        <div class="col-2 requisition-col">` +
        pendingData[i].requisitionBy +
        `</div>
<div id="col"  class="col requisition-col">  ` +
        pendingData[i].mRequisitionCode +
        `
         </div>

<div id="col"  class="col-2 requisition-col">` +
        pendingData[i].projectMasterCode +
        `</div>
<div  id="col" class="col-1 requisition-col">` +
        pendingData[i].date +
        `</div>
        <div  id="col" class="col-2 requisition-col">   <input type="text" id="Remarks" name="Remarks"></div>
        <div id="col"  class="col-1 individual-select-item"><i class="fa-solid fa-xmark cross"  data-bs-toggle="modal"  data-bs-target="#exampleModalReject" onclick="IndividualSelectCross(${pendingData[i].mRequisitionId})"></i>
     <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross(${pendingData[i].mRequisitionId})"></i><i class="bi bi-eye-fill view-icon" ></i>
    </div>
</div>
`;
    }

    const buttonDiv = document.querySelector(".button-div");

    // Add some content to the button div element
    buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>
                 <button type="button" class="reject-button"  id="LeaveRejectbutton" data-bs-toggle="modal" data-bs-target="#exampleModalReject" >Reject</button>`;

    // loop through each row and extract the data
  }
}

//Approved data

function RequisitionApplicationApproved() {
  callApi("MaterialRequisition", "GetAllMRequisitionApproved").then((data) => {
    console.log(data);
    let ApprovedData = [];
    // Initialize the array
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      // obj.mRequisitionId = item.mRequisitionId;
      obj.mRequisitionCode = item.mRequisitionCode;
      obj.projectMasterCode = item.projectMasterCode;
      obj.manualRequisitionNo = item.manualRequisitionNo;
      obj.requisitionBy = item.requisitionBy;
      obj.date = item.date;
      ApprovedData.push(obj);
    });
    displayApprovedData(ApprovedData);
  });
  // Approval function call
  // display data in new page
  function displayApprovedData(ApprovedData) {
    //  document.getElementById("approved-page").style.display='block';
    DataContainer = document.querySelector("#ApplicationContainer");
    DataContainer.innerHTML = `
  <div class=" row row-1st " style="height: 60px"; >
  <div class=" col fw-bold "> Requisition Code</div>
  <div class=" col fw-bold ">Project Master Code</div>
  <div class=" col fw-bold ">Anual Requisition No</div>
  <div class=" col fw-bold ">Requisition By</div>
  <div class=" col fw-bold ">Date</div>
  <div class=" col-1 fw-bold ">Action</div>
</div>
    `;
    for (let i = 0; i < ApprovedData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row text-center">
      
<div class="col">  ` +
        ApprovedData[i].mRequisitionCode +
        `
       </div>

<div class="col">` +
        ApprovedData[i].projectMasterCode +
        `</div>
<div class="col">` +
        ApprovedData[i].manualRequisitionNo +
        `</div>

<div class="col">` +
        ApprovedData[i].requisitionBy +
        `</div>
<div class="col">` +
        ApprovedData[i].date +
        `</div>
        <div class="col-1"><i class="bi bi-eye-fill view-icon"></i> </div>
</div>
`;
    }

    const buttonDiv = document.querySelector(".button-div");

    // Add some content to the button div element
    buttonDiv.innerHTML = "";
  }
}

//Rejected data

function RequisitionApplicationRejected() {
  callApi("MaterialRequisition", "GetAllMRequisitionDisApproved").then(
    (data) => {
      console.log("data ", data);
      let DisApprovedData = [];
      // Initialize the array
      // Loop through the data and create objects
      data.forEach((item) => {
        const obj = {};
        obj.mRequisitionId = item.mRequisitionId;
        obj.mRequisitionCode = item.mRequisitionCode;
        obj.projectMasterCode = item.projectMasterCode;
        obj.manualRequisitionNo = item.manualRequisitionNo;
        obj.requisitionBy = item.requisitionBy;
        obj.date = item.date;
        DisApprovedData.push(obj);
      });
      displayDisApprovedData(DisApprovedData);
    }
  );
  // Approval function call
  // display data in new page
  function displayDisApprovedData(DisApprovedData) {
    // document.getElementById("approved-page").style.display='block';
    DataContainer = document.querySelector("#ApplicationContainer");
    DataContainer.innerHTML = `
  <div class="row row-1st  " style="height: 60px"; >
  <div class="col fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('LeaveRejectSelectAll','box')"  id="LeaveRejectSelectAll"  name="selectall" value="All">  All </div>
  <div class="col fw-bold"> Requisition Code</div>
  <div class="col fw-bold">Project Master Code</div>
  <div class="col fw-bold">Anual Requisition No</div>
  <div class="col fw-bold">RequisitionBy</div>
  <div class="col fw-bold">Date</div>
  <div class="col fw-bold">Action</div>
</div>
    `;
    for (let i = 0; i < DisApprovedData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row text-center">
        <div class="col">
        <input
          class="form-check-input"
          type="checkbox"
          name="box"
        
          id=${DisApprovedData[i].mRequisitionId}
        />
      </div>
      
<div class="col">  ` +
        DisApprovedData[i].mRequisitionCode +
        `
       </div>

<div class="col">` +
        DisApprovedData[i].projectMasterCode +
        `</div>
<div class="col">` +
        DisApprovedData[i].manualRequisitionNo +
        `</div>

<div class="col">` +
        DisApprovedData[i].requisitionBy +
        `</div>
<div class="col">` +
        DisApprovedData[i].date +
        `</div>
        <div class="col-1 individual-select-item"> 
        <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross(${DisApprovedData[i].mRequisitionId})"></i><i class="bi bi-eye-fill view-icon" ></i>
       </div>
</div>
`;
    }

    const buttonDiv = document.querySelector(".button-div");

    // Add some content to the button div element
    buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>`;
  }
}

function RetriveDataFromRows() {
  const rows = document.querySelectorAll(".requisition-row"); // select the row using its ID
  let remarks = document.querySelectorAll('input[name="Remarks"]');
  const cellData = [];
  var checkbox = document.getElementsByName("box");
  const cells = rows[i].querySelectorAll("#col"); // get all cells of the current row
  console.log(cells);
  for (let i = 0; i < rows.length; i++) {
    if (remarks[i].value != "" && checkbox[i].checked) {
      const MRequisitionId =
        rows[i].getElementsByClassName("requisition-col")[0].innerText;
      const RequisitionBy =
        rows[i].getElementsByClassName("requisition-col")[1].innerText;
      const MRequisitionCode =
        rows[i].getElementsByClassName("requisition-col")[2].innerText;
      const ProjectMasterCode =
        rows[i].getElementsByClassName("requisition-col")[3].innerText;
      const RequisitionDate =
        rows[i].getElementsByClassName("requisition-col")[4].innerText;
      const Remarks = remarks[i].value;
      cellData.push({
        MRequisitionId,
        RequisitionBy,
        MRequisitionCode,
        ProjectMasterCode,
        RequisitionDate,
        Remarks,
      });
      console.log(cellData);
    }
  }
  const StringData = JSON.stringify(cellData);
  console.log("StringData", StringData);
  const formData = new FormData();
  formData.append("insertRequisition", StringData);
  // console.log("objectData", objectData);

  fetch(
    "https://localhost:7160/api/MaterialRequisition/AddMaterialWithRemarks",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => {
      console.log(response);
      console.log();
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// [{"MRequisitionId":"1","MRequisitionCode":"0","ProjectMasterCode":"1","RequisitionBy":"uts","RequisitionDate":"2023-03-23" ,"Remarks":"Hello"}]
