function RateCollectionMutualFunction() {
  // RadioOnclickFunction(
  //   RateCollectionPending,
  //   RateCollectionApproved,
  //   RateCollectionRejected
  // );

  let radio_div = document.querySelector(".radio-div");
  radio_div.innerHTML = `<div class="form-check">
  <input
    class="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault1"
    checked
    onclick="RateCollectionPending()"
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
    onclick="RateCollectionApproved()"
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
    onclick="RateCollectionRejected()"
  />
  <label class="form-check-label me-3" for="flexRadioDefault3">
    Rejected
  </label>
</div>`;
  RateCollectionPending();
  hidePage();
}

function RateCollectionPending() {
  let pendingData = [];
  let sectionContainer = document.querySelector("#ApplicationPage");
  hidePage();
  //RateCollection is a part of fetch url. we are using it as a class that we can  retrive it
  sectionContainer.classList = "RateCollection";
  callApi("RateCollection", "GetAllNewRateCollection").then((data) => {
    console.log("data rate", data);
    // Initialize the array
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      obj.RateCollectionMasterID = item.rateCollectionMasterID;
      obj.RCCode = item.rcCode;
      obj.RCDate = item.rcDate;
      obj.ProjectMasterCode = item.projectMasterCode;
      obj.EffectiveDate = item.effectiveDate;
      obj.CompanyId = item.companyId;
      obj.AddedBy = item.addedBy;
      obj.DateAdded = item.dateAdded;
      obj.ApproveStatus = item.approveStatus;
      pendingData.push(obj);
    });

    // console.log(purchaseOrder_selectedAllData);
    console.log("pendingData :", pendingData);
    displayPendingData(pendingData);
  });

  function displayPendingData(pendingData) {
    DataContainer = document.querySelector("#ApplicationContainer");
    DataContainer.innerHTML = `
        <div class="row row-1st  " style="height: 60px"; >
        <div class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('RateCollectionSelectall','box')"  id="RateCollectionSelectall"  name="selectall" value="All">  All </div>
        <div class="col-2   fw-bold">RateCollectionMaster ID</div>
        <div class="col-2 fw-bold"> RC Code</div>
        <div class="col-2 fw-bold">RCDate </div>
        <div class="col-2 fw-bold">ProjectMasterCode </div>
        <div class="col-1 fw-bold">CompanyId</div>
        <div class="col-1 fw-bold">AddedBy </div>
        <div class="col-1 fw-bold">Action </div>
      </div>
        `;
    for (let i = 0; i < pendingData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row  pending-row text-center">
            <div class="col-1">
            <input
              class="form-check-input"
              type="checkbox"
              name="box"
               id= ${pendingData[i].RateCollectionMasterID}
            />
          </div>
      <div class="col-2">` +
        pendingData[i].RateCollectionMasterID +
        `</div>
         
      <div class="col-2">  ` +
        pendingData[i].RCCode +
        `
             </div>
             <div class="col-2">  ` +
        pendingData[i].RCDate +
        `
             </div>
             
      <div class="col-2">` +
        pendingData[i].ProjectMasterCode +
        `</div>
      
      <div class="col-1">` +
        pendingData[i].CompanyId +
        `</div>
          
            <div class="col-1">` +
        pendingData[i].AddedBy +
        `</div>
    
        
            <div class="col-1 individual-select-item"><i class="fa-solid fa-xmark cross"  data-bs-toggle="modal"  data-bs-target="#exampleModalReject" onclick="IndividualSelectCross(${pendingData[i].RateCollectionMasterID})"></i>
            <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross(${pendingData[i].RateCollectionMasterID})"></i><i class="bi bi-eye-fill view-icon" onclick="GetPoReport('${pendingData[i].ProjectMasterCode}')"></i>
           </div>
      </div>
      `;
    }
    // const divAfterContainer = DataContainer.nextSibling;

    // Remove the div element
    // divAfterContainer.remove();

    // const buttonDiv = document.createElement("div");
    // buttonDiv.classList = "button-div";

    // Add some content to the new div element
    // buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>
    //                    <button type="button" class="reject-button"  id="LeaveRejectbutton" data-bs-toggle="modal" data-bs-target="#exampleModalReject" >Reject</button>`;

    // Insert the new div element before the container element
    // DataContainer.insertAdjacentElement("afterend", buttonDiv);

    // loop through each row and extract the data

    
  const buttonDiv = document.querySelector(".button-div");
 

  // Add some content to the button div element
  buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>
                 <button type="button" class="reject-button"  id="LeaveRejectbutton" data-bs-toggle="modal" data-bs-target="#exampleModalReject" >Reject</button>`;

 
  }
}

//approved data
function RateCollectionApproved() {
  let ApprovedData = [];
  hidePage();
  callApi("RateCollection", "GetAllApprovedRateCollection").then((data) => {
    // Initialize the array
    console.log("data ap :", data);
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      obj.RateCollectionMasterID = item.rateCollectionMasterID;
      obj.RCCode = item.rcCode;
      obj.RCDate = item.rcDate;
      obj.ProjectMasterCode = item.projectMasterCode;
      obj.EffectiveDate = item.effectiveDate;
      obj.CompanyId = item.companyId;
      obj.AddedBy = item.addedBy;
      obj.DateAdded = item.dateAdded;
      obj.ApproveStatus = item.approveStatus;
      ApprovedData.push(obj);
    });

    console.log("ApprovedData :", ApprovedData);
    displayApprovedData(ApprovedData);
  });
  function displayApprovedData(ApprovedData) {
    DataContainer = document.querySelector("#ApplicationContainer");

    DataContainer.innerHTML = `
          <div class="row row-1st  "  >
          <div class="col-2 fw-bold"> RC Code</div>
          <div class="col-2 fw-bold">RCDate </div>
          <div class="col-2 fw-bold">ProjectMasterCode </div>
          <div class="col-1 fw-bold">Approved By</div>
          <div class="col-2 fw-bold">Added by </div>
          <div class="col-2 fw-bold">Approved Date</div>
          <div class="col-1 fw-bold"> View  </div>
        </div>
          `;
    for (let i = 0; i < ApprovedData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row text-center">
    <div class="col-2">` +
        ApprovedData[i].RCCode +
        `</div>
            <div class="col-2">` +
        ApprovedData[i].RCDate +
        `</div>
    <div class="col-2">` +
        ApprovedData[i].ProjectMasterCode +
        `</div>
    <div class="col-1">` +
        ApprovedData[i].ApprovedBy +
        `</div>
    <div class="col-2">` +
        ApprovedData[i].AddedBy +
        `</div>
    <div class="col-2">` +
        ApprovedData[i].DateAdded +
        `</div>
          <div class="col-1"><i class="bi bi-eye-fill view-icon" onclick="GetPoReport('${ApprovedData[i].ProjectMasterCode}')"></i></div>
    </div>
    `;
    }
    const divAfterContainer = DataContainer.nextSibling;

    // Remove the div element
    divAfterContainer.remove();

    const buttonDiv = document.createElement("div");
    buttonDiv.classList = "button-div";

    // Add some content to the new div element
    buttonDiv.innerHTML = `  `;

    // Insert the new div element before the container element
    DataContainer.insertAdjacentElement("afterend", buttonDiv);
  }
}

//Rejected data
function RateCollectionRejected() {
  const RejectedData = [];
  hidePage();
  callApi("RateCollection", "GetAllDisApprovedRateCollection").then((data) => {
    // Initialize the array
    console.log("data r:", data);
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      obj.RateCollectionMasterID = item.rateCollectionMasterID;
      obj.RCCode = item.rcCode;
      obj.RCDate = item.rcDate;
      obj.ProjectMasterCode = item.projectMasterCode;
      obj.EffectiveDate = item.effectiveDate;
      obj.CompanyId = item.companyId;
      obj.AddedBy = item.addedBy;
      obj.DateAdded = item.dateAdded;
      obj.ApproveStatus = item.approveStatus;

      RejectedData.push(obj);
    });

    console.log("RejectedData :", RejectedData);
    displayRejectedData(RejectedData);
  });

  function displayRejectedData(RejectedData) {
    DataContainer = document.querySelector("#ApplicationContainer");

    DataContainer.innerHTML = `
            <div class="row row-1st  "  >
            <div class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('RateRejectSelectAll','box')"  id="RateRejectSelectAll"  name="selectall" value="All">  All </div>
            <div class="col-2 fw-bold">Rate Collection Master ID </div>
            <div class="col-2 fw-bold"> RC Code</div>
            <div class="col-2 fw-bold">RC Date </div>
            <div class="col-2 fw-bold">Project Master Code </div>    
            <div class="col-2 fw-bold">Added by </div>
            <div class="col-1 fw-bold"> Action</div>
          </div>
            `;
    for (let i = 0; i < RejectedData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row text-center">
          <div class="col-1">
          <input
            class="form-check-input"
            type="checkbox"
            name="box"
            id= ${RejectedData[i].RateCollectionMasterID}
          />
        </div>
      <div class="col-2">` +
        RejectedData[i].RateCollectionMasterID +
        `</div>
              <div class="col-2">` +
        RejectedData[i].RCCode +
        `</div>
      <div class="col-2">` +
        RejectedData[i].RCDate +
        `</div>
      <div class="col-2">` +
        RejectedData[i].ProjectMasterCode +
        `</div>
      <div class="col-2">` +
        RejectedData[i].AddedBy +
        `</div>
          <div class="col-1 ">
          <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross( ${RejectedData[i].RateCollectionMasterID})"></i><i class="bi bi-eye-fill view-icon" onclick="GetPoReport('${RejectedData[i].ProjectMasterCode}')"></i>
          </div>
      </div>
      `;
    }
    const divAfterContainer = DataContainer.nextSibling;

    // Remove the div element
    divAfterContainer.remove();

    const buttonDiv = document.createElement("div");
    buttonDiv.classList = "button-div";

    // Add some content to the new div element
    buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>`;

    // Insert the new div element before the container element
    DataContainer.insertAdjacentElement("afterend", buttonDiv);
  }
}
