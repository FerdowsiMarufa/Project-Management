function PurchaseOrderMutualFunction() {
  // RadioOnclickFunction(
  //   PurchaseOrderPending,
  //   PurchaseOrderApproved,
  //   PurchaseOrderRejected
  // );
  let radio_div = document.querySelector(".radio-div");
  radio_div.innerHTML = `<div class="form-check">
  <input
    class="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault1"
    checked
    onclick="PurchaseOrderPending()"
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
    onclick="PurchaseOrderApproved()"
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
    onclick="PurchaseOrderRejected()"
  />
  <label class="form-check-label me-3" for="flexRadioDefault3">
    Rejected
  </label>
</div>`;
  PurchaseOrderPending();
  hidePage();
}

function PurchaseOrderPending() {
  let pendingData = [];
  hidePage();
  let sectionContainer = document.querySelector("#ApplicationPage");
  sectionContainer.classList = "PurchaseOrder";
  callApi("PurchaseOrder", "GetAllNewPurchaseOrder").then((data) => {
    // console.log("data", data);
    // Initialize the array
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};

      obj.PurchaseID = item.purchaseID;
      obj.VendorName = item.vendorName;
      obj.PurchaseOrderCode = item.purchaseOrderCode;
      obj.PurchaseDate = item.purchaseDate;
      obj.PurchaseTypeName = item.purchaseTypeName;
      obj.VendorSelectionNo = item.vendorSelectionNo;
      obj.OtherCostAmount = item.otherCostAmount;
      obj.DeliveryAddress = item.deliveryAddress;
      obj.ApprovedBy = item.approvedBy;
      obj.ApprovedDate = item.approvedDate;
      obj.ApproveStatus = item.approveStatus;
      pendingData.push(obj);
      // selectedAllRequisitionData.push(selectAll);
    });

    // console.log(purchaseOrder_selectedAllData);
    // console.log("pendingData :", pendingData);
    displayPendingData(pendingData);
  });
  // display data in new page
function displayPendingData(pendingData) {
  DataContainer = document.querySelector("#ApplicationContainer");
  DataContainer.innerHTML = `
  <div class="row row-1st  " style="height: 90px"; >
  <div class="col-1 fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('purchaseOrder_selectall','box')"  id="purchaseOrder_selectall"  name="selectall" value="All">  All </div>
  <div class="col-2 fw-bold"> V Name </div>
  <div class="col-2 fw-bold"> P Type </div>
  <div class="col-1 fw-bold"> Purchase Date </div>
  <div class="col-2 fw-bold">V Selection No</div>
  <div class="col-3 fw-bold">Delivery Address</div>
  <div class="col-1 fw-bold">Action</div>
</div>
  `;
  for (let i = 0; i < pendingData.length; i++) {
    DataContainer.innerHTML +=
      `<div class="row  pending-row text-center" style="height: 90px";>
      <div class="col-1">
      <input
        class="form-check-input purchaseLeave"
        type="checkbox"
        name="box"  
        id= ${pendingData[i].PurchaseID}
      />
    </div> 
<div class="col-2">` +
      pendingData[i].VendorName +
      `
       </div>
       <div class="col-2">  ` +
      pendingData[i].PurchaseTypeName +
      `
       </div>
       
<div class="col-1">` +
      pendingData[i].PurchaseDate +
      `</div>

<div class="col-2">` +
      pendingData[i].VendorSelectionNo +
      `</div>
    
      <div class="col-3">` +
      pendingData[i].DeliveryAddress +
      `</div>
  
      <div class="col-1 individual-select-item"><i class="fa-solid fa-xmark cross"  data-bs-toggle="modal"  data-bs-target="#exampleModalReject"  onclick="IndividualSelectCross( ${pendingData[i].PurchaseID})"></i>
      <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"   onclick="IndividualSelectCross( ${pendingData[i].PurchaseID})"></i><i class="bi bi-eye-fill view-icon" onclick="GetPoReport('${pendingData[i].PurchaseOrderCode}','Pending', ${i},'purchaseLeave')"></i>
     </div>
</div>
`;
  }
 
  const buttonDiv = document.querySelector(".button-div");
 

  // Add some content to the button div element
  buttonDiv.innerHTML = ` <button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>
                 <button type="button" class="reject-button"  id="LeaveRejectbutton" data-bs-toggle="modal" data-bs-target="#exampleModalReject" >Reject</button>`;

 
}
}



//approved data
function PurchaseOrderApproved() {
  let ApprovedData = [];
  hidePage();
  callApi("PurchaseOrder", "GetAllApprovedPurchaseOrder").then((data) => {
    // Initialize the array
    // console.log("data :", data);
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      obj.PurchaseID = item.purchaseID;
      obj.VendorName = item.vendorName;
      obj.PurchaseDate = item.purchaseDate;
      obj.PurchaseTypeName = item.purchaseTypeName;
      obj.VendorSelectionNo = item.vendorSelectionNo;
      obj.ApprovedBy = item.approvedBy;
      obj.ApprovedDate = item.approvedDate;
      obj.PurchaseOrderCode = item.purchaseOrderCode;
      ApprovedData.push(obj);
    });

    console.log("ApprovedData :", ApprovedData);
    displayApprovedData(ApprovedData);
  });
}
function displayApprovedData(ApprovedData) {
  DataContainer = document.querySelector("#ApplicationContainer");

  DataContainer.innerHTML = `
      <div class="row row-1st  "  >
      <div class="col fw-bold">Purchase ID</div>
      <div class="col fw-bold">Vendor Name</div>
      <div class="col fw-bold">Purchase Date</div>
      <div class="col fw-bold">Purchase Type Name</div>
      <div class="col fw-bold">Vendor Selection No</div>
      <div class="col-auto fw-bold">Approved By</div>
      <div class="col fw-bold">Approved Date</div>
      <div class="col fw-bold"> View  </div>
    </div>
      `;
  for (let i = 0; i < ApprovedData.length; i++) {
    DataContainer.innerHTML +=
      `<div class="row text-center">
<div class="col">` +
      ApprovedData[i].PurchaseID +
      `</div>
        <div class="col">` +
      ApprovedData[i].VendorName +
      `</div>
<div class="col">` +
      ApprovedData[i].PurchaseDate +
      `</div>
<div class="col">` +
      ApprovedData[i].PurchaseTypeName +
      `</div>
<div class="col">` +
      ApprovedData[i].VendorSelectionNo +
      `</div>
<div class="col">` +
      ApprovedData[i].ApprovedBy +
      `</div>
<div class="col">` +
      ApprovedData[i].ApprovedDate +
      `</div>
      <div class="col"><i class="bi bi-eye-fill view-icon" onclick="GetPoReport('${ApprovedData[i].PurchaseOrderCode}')"></i></div>
</div>
`;
  }

 
  const buttonDiv = document.querySelector(".button-div");
 

  // Add some content to the button div element
  buttonDiv.innerHTML = "";

 
}
//Rejected data
function PurchaseOrderRejected() {
  const RejectedData = [];
  hidePage();
  callApi("PurchaseOrder", "GetAllDisApprovedPurchaseOrder").then((data) => {
    // Initialize the array
    // console.log("data :", data);
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      obj.PurchaseID = item.purchaseID;
      obj.PurchaseOrderCode = item.purchaseOrderCode;
      obj.VendorName = item.vendorName;
      obj.PurchaseDate = item.purchaseDate;
      obj.PurchaseTypeName = item.purchaseTypeName;
      obj.VendorSelectionNo = item.vendorSelectionNo;
      obj.ApprovedBy = item.approvedBy;
      obj.ApprovedDate = item.approvedDate;

      RejectedData.push(obj);
    });

    console.log("RejectedData :", RejectedData);
    displayRejectedData(RejectedData);
  });
  
function displayRejectedData(RejectedData) {
  DataContainer = document.querySelector("#ApplicationContainer");

  DataContainer.innerHTML = `
        <div class="row row-1st  "  >
        <div class="col fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('PurchaseRejectSelectAll','box')"  id="PurchaseRejectSelectAll"  name="selectall" value="All">  All </div>
        <div class="col fw-bold">Vendor Name</div>
        <div class="col fw-bold">Purchase Date</div>
        <div class="col fw-bold">Purchase Type Name</div>
        <div class="col fw-bold">Vendor Selection No</div>
        <div class="col-auto fw-bold">Approved By</div>
        <div class="col fw-bold">Approved Date</div>
        <div class="col fw-bold"> Action</div>
      </div>
        `;
  for (let i = 0; i < RejectedData.length; i++) {
    DataContainer.innerHTML +=
      `<div class="row text-center">
      <div class="col-1">
      <input
        class="form-check-input purchaseReject"
        type="checkbox"
        name="box"
       
        id= ${RejectedData[i].PurchaseID}
      />
    </div>
          <div class="col">` +
      RejectedData[i].VendorName +
      `</div>
  <div class="col">` +
      RejectedData[i].PurchaseDate +
      `</div>
  <div class="col">` +
      RejectedData[i].PurchaseTypeName +
      `</div>
  <div class="col">` +
      RejectedData[i].VendorSelectionNo +
      `</div>
  <div class="col">` +
      RejectedData[i].ApprovedBy +
      `</div>
  <div class="col">` +
      RejectedData[i].ApprovedDate +
      `</div>
      <div class="col ">
      <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross( ${RejectedData[i].PurchaseID})"></i><i class="bi bi-eye-fill view-icon" onclick="GetPoReport('${RejectedData[i].PurchaseOrderCode}','Rejected',${i},'purchaseReject')"></i>
      </div>
  </div>
  `;
  }
  
 
  const buttonDiv = document.querySelector(".button-div");
 

  // Add some content to the new div element
  buttonDiv.innerHTML = `<button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>`;

}
}

