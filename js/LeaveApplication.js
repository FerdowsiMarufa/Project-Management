function createApplication() {
  hidePage();
  document.getElementById("ApplicationPage").style.display = "none";
  document.getElementById("newLeaveApplication").style.display = "block";
  let radio_div = document.querySelector(".radio-div");
  radio_div.innerHTML = ` `;
  let newLeaveApplication = document.querySelector("#newLeaveApplication");

  newLeaveApplication.innerHTML = `
  <div class="  "   >
  <!-- for heading -->
  <div class="text-dark" style="background:   rgb(187, 218, 236);">
     <div class="mx-1 p-1"> <b>Employee Leave Application</b> </div>
  </div>
  <!-- for table and personal Information -->
     
  <div class="m-2 rounded" style="border: 1px solid rgb(187, 218, 236)">
    
  <div class="row  employee_information">



  
  <div class="col-8">

        <div class="m-3">
              <div class="d-flex p-1">
              <div>Leave Application:</div>

              <div class="px-2 ">
                  <input type="text" id="ApplicationCode" name="ApplicationCode"class="w-60 ">
              
                  <button type="button" onclick="PopupFunction()" style="background: #3986AC;" class="rounded" > <i class="fa-solid fa-plus" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>
                  
                  <button type="button"  onclick="PopupFunction()"  style="background: #3986AC;"  class="rounded" > <i class="fa-solid fa-magnifying-glass" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>
              </div>
       
            
        </div>

        <div class="d-flex p-1">
            <div>Employee Code:</div>
            <div class="px-2 ">
              <input type="text" id="EmployeeID" name="EmployeeID" class="w-75 ">
             
                <button type="button"  onclick="LeaveHistoryById()" style="background: #3986AC;" class="rounded"> <i class="fa-solid fa-magnifying-glass" style=" font-size: 15px; width: 15px; height: 15px;  color: #fff;"></i> </button>
                
              </div>
        </div>

        <div class="d-flex p-1">
            <div>Full Name :</div>
            <div class="px-2 ">
            <input type="text"id="EmployeeName" name="EmployeeName" class="  ms-2" style="width: 200px">
            </div>
        </div>

        <div class="d-flex p-1">
            <div>Location :</div>
            <div class="px-2">A2761</div>
        </div>

        <div class="d-flex p-1">
            <div>Department :</div>
            <div class="px-2">A2761</div>
        </div>

        <div class="d-flex p-1">
            <div>Designation :</div>
            <div class="px-2">A2761</div>
        </div>

        <div class="d-flex p-1">
            <div>Assignment :</div>
            <div class="px-2">A2761</div>
        </div>
  </div>

  </div>








  <div class="col-4 px-4 py-2"> 
  <div  id="LeaveBlanceContainer" >
  <div class="text-center LeaveBlanceContainerName text-white "> <b  > Leave Balance</b>  </div>  
  <div class="container p-0">
   <div class="row LeaveBlanceContainer1stRow">
     <div class="col">
       Type
     </div>
     <div class="col">
       Balance
     </div>
     <div class="col">
       Pending
     </div>
     <div class="col">
       Rest
     </div>
   </div>
 </div> 
 <!-- container end -->
</div>

<!-- approved div -->
   <div class="d-flex justify-content-between">
     <div class="m-1">
       <span class="rounded-1 p-1"  > Recomanded By</span> 

       <button type="button"  onclick="RecomandedBy()"   style="background: #3986AC;"  class="rounded" > <i class="fa-solid fa-magnifying-glass" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>


     </div>
     <div class="m-1">
       <span class="rounded-1 p-1"  > Approved By</span>
       
       <button type="button"  onclick="ApprovedBy()"   style="background: #3986AC;"  class="rounded" > <i class="fa-solid fa-magnifying-glass" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>
     
     </div>
   </div>
   <!-- approved div end -->
</div>    
  </div>

</div>
</div>
</div>
</div>
  <!-- About Leave -->
  <div>
      <div class="m-2 rounded" style="border: 1px solid rgb(187, 218, 236) ">
          <div class="" style="background-color: #eeee;">
            <div class="d-flex justify-content-start " style="background-color:#fff;">
              
              <button type="button" onclick="addRow()" class="rounded m-1" style="background: #3986AC;"  > <i class="fa-solid fa-plus" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>

              <button type="button"  onclick="removeRow()" class=" rounded m-1" style="background: #3986AC;"  > <i class="fa-solid fa-minus" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>

              <button type="button"   class="rounded m-1" style="background: #3986AC;" > <i class="fa-solid fa-arrows-rotate" style=" font-size: 15px; width: 15px; height: 15px; color: #fff; " ></i> </button>

          </div>
           </div>
          <div>
          <div class="col-12" style="height:200px; overflow-y:auto; padding: 0px !important;">
          <table class="table table-bordered">
              <thead align="center" style="background-color: #eeee; height: 10px;  padding: 5px; line-height: 20px; position: sticky; top: 0;">
                <tr>
                  <th  scope="col"><input type="checkbox" ></th>
                  <th scope="col">Leave Type</th>
                  <th scope="col">From Date</th>
                  <th scope="col">To Date</th>
                  <th scope="col">Leave Days</th>
                  <th scope="col">Leave Status</th>
                  <th scope="col">Description</th>
                  <th scope="col">Attachment</th>
                </tr>
              </thead>
              <tbody  align="center" class="NewleaveInfo">
              </tbody>
             
            </table>
            </div>
          </div>
        </div>
  </div>
<div class="m-2 rounded" style="border: 1px solid rgb(187, 218, 236)">
  <div class="d-flex justify-content-end">

      <button type="button" class="btn  m-1" onclick="saveApplication()" style="background: #3986AC; color: #ffff"><i class="fa-solid fa-download" style="color: #ffff"></i> Save</button>

      <button type="button" class="btn  m-1" onclick="removeRow()" style="background: #3986AC; color: #ffff"><i class="fa-sharp fa-solid fa-trash" style="color: #ffff"></i> Delete</button>

      <button type="button" class="btn  m-1"onclick="Refresh()" style="background: #3986AC; color: #ffff"><i class="fa-solid fa-arrows-rotate" style="color: #ffff"></i> Refresh</button>
      
      <button type="button" class="btn  m-1" style="background: #3986AC; color: #ffff"><i class="fa-solid fa-print" style="color: #ffff"></i> Print</button>
      
  </div>
</div>
</div>

  `;
}

function EmployeeLeaveBalanceInformation(EmployeeID) {
  console.log(EmployeeID);
  fetch(
    `https://localhost:7160/api/EmployeeLeaveBalance/GetEmployeeLeaveBalance/${EmployeeID}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.LeaveBalance = item.leaveBalance;
          showLeaveBalance(obj.LeaveBalance);
          // selectedAllRequisitionData.push(selectAll);
        });
      } else {
        alert(" Employee id not found");
      }
    })
    .catch((error) => console.error(error));
}

function showLeaveBalance(leaveBalance) {
  var LeaveBlanceContainer = document.querySelector("#LeaveBlanceContainer");
  LeaveBlanceContainer.innerHTML +=
    `<div class="row">
                      <div class="col">
                        Type
                      </div>
                      <div class="col">
                      ` +
    leaveBalance +
    `
                      </div>
                      <div class="col">
                          0
                      </div>
                      <div class="col">
                       0
                      </div>
                    </div>`;
}

function SaveDataToMasterTable() {
  const MasterLeaveData = [];
  let ApplicationCode = document.querySelector('input[name="ApplicationCode"]');
  let Employee_ID = document.querySelector('input[name="EmployeeID"]');
  let Employee_Name = document.querySelector('input[name="EmployeeName"]');
  let LeaveCode = ApplicationCode.value;
  let EmployeeId = Employee_ID.value;
  let EmployeeName = Employee_Name.value;

  MasterLeaveData.push({
    LeaveCode,
    EmployeeId,
    EmployeeName,
  });
  console.log(MasterLeaveData);
  const MasterLeaveDataStringData = JSON.stringify(MasterLeaveData);
  console.log("MasterLeaveDataStringData", MasterLeaveDataStringData);
  const formData = new FormData();
  formData.append("MasterLeaveformationData", MasterLeaveDataStringData);

  fetch("https://localhost:7160/api/EmployeeLeaveBalance/leaveMaster", {
    method: "POST",
    body: formData,
  })
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

function saveApplication() {
  
  

  const CreateApplicationRow = document.querySelectorAll(".CreateApplicationRow");
const obj = [];
const Employee_ID = document.querySelector('input[name="EmployeeID"]');
const EmployeeId = Employee_ID.value;
 
  for (let i = 0; i < CreateApplicationRow.length; i++) {
    var LeaveType = CreateApplicationRow[i].querySelector("#LeaveType").value;
    var FromDate = CreateApplicationRow[i].querySelector("#FromDate").value;
    var ToDate = CreateApplicationRow[i].querySelector("#ToDate").value;
    var LeaveDays = CreateApplicationRow[i].querySelector("#DayType").value;
  console.log("hoy naaaaaaaaaaaaaaaaaaaa");
  if (
    FromDate.value != null ||
    FromDate !== "" ||
    ToDate.value != null ||
    ToDate !== ""
  ) {
    obj.push({
      EmployeeId,
      LeaveType,
      FromDate,
      ToDate,
      LeaveDays,
    }); } else {
      alert("Give valid input!");
    }}
    console.log("NewLeaveApplicationsData" ,obj);
    const objJSON = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("NewLeaveApplicationsData", objJSON);
    fetch(
      "https://localhost:7160/api/EmployeeLeaveBalance/NewLeaveApplication",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Data Added!");
      })
      .catch((error) => {
        //console.error("Error:", error);
      });
 
  SaveDataToMasterTable();
  EmployeeLeaveBalanceInformation(document.getElementById("EmployeeID").value);
 
  // Employee_ID.value = "";
  document.getElementById("ApplicationCode").value = "";
  document.getElementById("EmployeeName").value = "";
  let tbodyEl = document.querySelector(".NewleaveInfo");
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    let trEl = tbodyEl.rows[i];
    trEl.remove();
  }
}

// const addButton = document.getElementById("addBtn");
// addButton.addEventListener("click", addRow);
function addRow() {
  const tbodyEl = document.querySelector(".NewleaveInfo");
  const trEl = document.createElement("tr");
  trEl.className = "CreateApplicationRow";
  trEl.innerHTML = `
    <td><input type="checkbox" id="checkBox"></td>
    <td>
      <select name="LeaveType" id="LeaveType" class="w-100">
        <option value="EL">EL</option>
        <option value="SL">SL</option>
      </select>
    </td>
    <td><input type="date" id="FromDate"></td>
    <td><input type="date" id="ToDate"></td>
    <td>
      <select name="DayType" id="DayType" class="w-100">
        <option value="1">Full</option>
        <option value="0.5">1st Half</option>
        <option value="0.5">2nd Half</option>
      </select>
    </td>
    <td>Pending</td>
    <td>dfsksfd</td>
    <td>sdhfsfdk</td>
  `;

  tbodyEl.appendChild(trEl);
}

function removeRow() {
  const checkBoxes = document.querySelectorAll(
    ".NewleaveInfo input[type='checkbox']"
  );
  let tbodyEl = document.querySelector(".NewleaveInfo");
  for (let i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      let row = checkBoxes[i].closest("tr");
      tbodyEl.removeChild(row);
    }
  }
}

function PopupFunction() {
  document.querySelector("#popup").classList.toggle("active");
}

document.querySelector("#LeavePopUpclose").onclick = () => {
  document.querySelector("#popup").classList.remove("active");
};

function LeaveHistoryById() {
  document.querySelector("#popup").classList.toggle("active");
  var EmployeeID = document.getElementById("EmployeeID").value;

  fetch(
    `https://localhost:7160/api/EmployeeLeaveBalance/GetEmployeePostleaveHistory/${EmployeeID}`
  )
    .then((response) => response.json())
    .then((data) => {
      const LeaveHistoryDataById = [];
      console.log(data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.EmployeeId = item.employeeId;
          obj.LeaveType = item.leaveType;
          obj.LeaveFromDate = item.fromDate;
          obj.LeaveToDate = item.toDate;
          obj.LeaveBalance = item.leaveBalance;
          LeaveHistoryDataById.push(obj);
        });

        ShowLeaveHistoryById(LeaveHistoryDataById);
      } else {
        alert(" Employee id not found");
      }
    })
    .catch((error) => console.error(error));

  function ShowLeaveHistoryById(LeaveHistoryDataById) {
    console.log("hfuef");
    var leavePopUpContainerTable = document.querySelector(
      "#leavePopUpContainerTable"
    );
    leavePopUpContainerTable.innerHTML = `
  <div class="row leavePopUp-1st-row">
           <div class="col">Leave Code</div>
           <div class="col">From Date</div>
           <div class="col">To Date</div>
           <div class="col"> Applied Date</div>
           <div class="col"> Leave Days</div>
          </div> `;
    for (var i = 0; i < LeaveHistoryDataById.length; i++) {
      leavePopUpContainerTable.innerHTML += `
            <div class="row">
            <div class="col">  ${LeaveHistoryDataById[i].EmployeeId}</div>
            <div class="col">  ${LeaveHistoryDataById[i].LeaveType}</div>
            <div class="col"> ${LeaveHistoryDataById[i].LeaveFromDate}</div>
            <div class="col">  ${LeaveHistoryDataById[i].LeaveToDate}</div>
            <div class="col">  ${LeaveHistoryDataById[i].LeaveBalance}</div>
           </div> 
            `;
    }
  }
}



function Refresh(){
  Employee_ID = document.getElementById('EmployeeID');
  Employee_ID.value = "";
  document.getElementById('ApplicationCode').value="";
  document.getElementById('EmployeeName').value="";
  let tbodyEl = document.querySelector(".NewleaveInfo");
for (let i = 0; i < tbodyEl.rows.length; i++) {
    let trEl = tbodyEl.rows[i];
    trEl.remove();
}
}




// RecomandedBy
function RecomandedBy() {
  document.querySelector("#popup").classList.toggle("active");
  // var EmployeeID = document.getElementById("EmployeeID").value;
  fetch(
    `https://localhost:7160/api/EmployeeLeaveBalance/LeaveRecommendedBy`
  )
    .then((response) => response.json())
    .then((data) => {
      const recomandedarr = [];
      console.log("employee data:",data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.EmployeeDesignation = item.employeeDesignation;
          obj.EmployeeDepartment = item.employeeDepartment;
          obj.EmployeeId = item.employeeId;
          recomandedarr.push(obj);
        });
        ShowLeaveHistoryById(recomandedarr);
      } else {
        alert(" Employee id not found");
      }
    })
    .catch((error) => console.error(error));
  function ShowLeaveHistoryById(recomandedarr) {
    console.log("hfuef");
    var leavePopUpContainerTable = document.querySelector(
      "#leavePopUpContainerTable"
    );
    leavePopUpContainerTable.innerHTML = `
  <div class="row leavePopUp-1st-row">
           <div class="col">Id</div>
           <div class="col">Designation</div>
           <div class="col">Department </div>
          </div> `;
    for (var i = 0; i < recomandedarr.length; i++) {
      leavePopUpContainerTable.innerHTML += `
            <div class="row">
            <div class="col">  ${recomandedarr[i].EmployeeId}</div>
            <div class="col">  ${recomandedarr[i].EmployeeDesignation}</div>
            <div class="col">  ${recomandedarr[i].EmployeeDepartment}</div>
           </div>
            `;
    }
  }
}




// ApprovedBy
function ApprovedBy() {
  document.querySelector("#popup").classList.toggle("active");
  // var EmployeeID = document.getElementById("EmployeeID").value;
  fetch(
    `https://localhost:7160/api/EmployeeLeaveBalance/LeaveRecommendedBy`
  )
    .then((response) => response.json())
    .then((data) => {
      const recomandedarr = [];
      console.log("employee data:",data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.EmployeeDesignation = item.employeeDesignation;
          obj.EmployeeDepartment = item.employeeDepartment;
          obj.EmployeeId = item.employeeId;
          recomandedarr.push(obj);
        });
        ShowLeaveHistoryById(recomandedarr);
      } else {
        alert(" Employee id not found");
      }
    })
    .catch((error) => console.error(error));
  function ShowLeaveHistoryById(recomandedarr) {
    console.log("hfuef");
    var leavePopUpContainerTable = document.querySelector(
      "#leavePopUpContainerTable"
    );
    leavePopUpContainerTable.innerHTML = `
  <div class="row leavePopUp-1st-row">
           <div class="col">Id</div>
           <div class="col">Designation</div>
           <div class="col">Department </div>
          </div> `;
    for (var i = 0; i < recomandedarr.length; i++) {
      leavePopUpContainerTable.innerHTML += `
            <div class="row">
            <div class="col">  ${recomandedarr[i].EmployeeId}</div>
            <div class="col">  ${recomandedarr[i].EmployeeDesignation}</div>
            <div class="col">  ${recomandedarr[i].EmployeeDepartment}</div>
           </div>
            `;
    }
  }
}