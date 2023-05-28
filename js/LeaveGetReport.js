function GetLeaveReport(mstId, datatype, rowIndex ,CheckBoxClassName) {
  //     let value = mstId;
  //   console.log("mstid:", value);

  //   fetch(`//localhost:82/api/HrmLeave/GetLeaveApplicationReportData/${mstId}`)
  fetch(
    `https://localhost:7160/api/HrmLeave/GetLeaveApplicationReportData/${mstId}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length) {
        document.getElementById("LeaveReportSection").style.display = "block";
        document.getElementById("ApplicationPage").style.display = "none";
        GetLeaveData(data);
        console.log("rowIndex", rowIndex);
        CreateReportButton(datatype, "LeaveReportContainer");
        ReportViewCheckBox(CheckBoxClassName, rowIndex);
      } else {
        alert("Report not found");
      }
    })
    .catch((error) => console.error(error));
}
function ReportViewCheckBox(boxClassName, rowIndex) {
  console.log("boxClassName, rowIndex", boxClassName, rowIndex);
  checkBox = document.getElementsByClassName(boxClassName);
  checkBox[rowIndex].checked = true;
  console.log(" leave view chec", checkBox[rowIndex].checked);
}

function CreateReportButton(value, ContainerName) {
  let container = document.getElementById(ContainerName);
  const divAfterContainer = container.nextSibling;

  // // Remove the div element
  divAfterContainer.remove();

  const buttonDiv = document.createElement("div");
  buttonDiv.classList = "button-div report-button";

  // Add some content to the new div element
  if (value == "Pending") {
    buttonDiv.innerHTML = `<button type="button" class="approve-button"  id="RequisitionApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>
       <button type="button" class="reject-button"  id="RequisitionRejectbutton" data-bs-toggle="modal" data-bs-target="#exampleModalReject" >Reject</button>`;

    // Insert the new div element before the container element
    container.insertAdjacentElement("afterend", buttonDiv);
  } else if (value == "Rejected") {
    buttonDiv.innerHTML = `<button type="button" class="approve-button"  id="RequisitionApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove">Approve</button>`;
    container.insertAdjacentElement("afterend", buttonDiv);
  }
}
function GetLeaveData(data) {
  console.log(data);
  let container = document.getElementById("LeaveReportContainer");
  container.innerHTML = `
      <div class="row h-25 border border-dark   mt-3 ms-2">
      <div class="border-1 px-0 border-end  border-dark col-3">
        <div class="border-bottom border-dark px-2 second-col"><img src="logo.png" alt=""></div>
        <div class="border-1 border-bottom  border-dark fw-bold px-2">VERSION :  1</div>
        <div class="border-1  border-dark fw-bold px-2">DATE  : ${data[0].applyDate}</div>
     </div>
    <div class="border-1 px-0 border-end  border-dark col-6 text-center">
           <div id="second-col-frow" class="border-bottom border-dark fs-5 second-col">Integrated Management system</div>
           <div id="second-col-srow" class="border-1 border-bottom  border-dark  second-col fw-bold">HUMAN RESOURCES</div>
           <div class="border-1  border-dark  fs-4 py-2 fw-bold r">Leave Application</div>
    </div>
    <div class="border-1 px-0 border-dark col-3 text-center">
         <div id="third-col-frow" class="border-bottom border-dark fw-bold third-col-par ">
               DOC. NO. IMS/HR/LA/06
         </div>
         <div id="third-col-srow" class="border-bottom border-dark fw-bold third-col-par">
               REVISION : 00
         </div>
         <div id="third-col-trow" class="border-bottom border-dark fw-bold third-col-par">DATE:${data[0].applyDate}</div>
         <div class="fw-bold third-col-par">PAGE : 1 of 1</div>
    </div>
</div>
<div class="row mt-5">
 <div class="col-6">
         <div class="border border-dark d-flex">
               <div class="border-end border-dark px-3 py-2 ">
                <p class="fw-bold">Date:</p>
               </div>
               <div class="d-flex flex-column justify-content-center">
                <p class="ps-1">${data[0].applyDate}</p>
              </div>
         </div>
         <div class="border border-dark d-flex mt-3">
               <div class="border-end border-dark px-3 py-2 ">
                <p class="fw-bold">Name:</p>
               </div>
               <div class="d-flex flex-column justify-content-center">
                <p class="ps-1">${data[0].employeeFullName}</p>
              </div>
         </div>
         <div class="border border-dark d-flex mt-3">
               <div class="border-end border-dark px-3 py-2 ">
                <p class="fw-bold">Designation:</p>
               </div>
               <div class="d-flex flex-column justify-content-center">
                <p class="ps-1">${data[0].employeeDesignation}</p>
              </div>
         </div>
 </div>
 <div class="col-6">
        <div class="border border-dark d-flex">
               <div class="border-end border-dark px-3 py-2 ">
                <p class="fw-bold">App SI. No.</p>
               </div>
               <div class="d-flex flex-column justify-content-center">
                <p class="ps-1"></p>
              </div>
         </div>
         <div class="border border-dark d-flex mt-3">
               <div class="border-end border-dark px-3 py-2 ">
                <p class="fw-bold">Code No.</p>
               </div>
               <div class="d-flex flex-column justify-content-center">
                <p class="ps-1">${data[0].employeDisplayeId}</p>
              </div>
         </div>
         <div class="border border-dark d-flex mt-3">
               <div class="border-end border-dark px-3 py-2 ">
                <p class="fw-bold">Name of Dept./Project:</p>
               </div>
               <div class="d-flex flex-column justify-content-center">
                <p class="ps-1">${data[0].employeeDepartment}</p>
              </div>
         </div>
 </div>
</div>
<div class="mt-3 text-center">
 <p><b>Purpose: </b></p>
 <p class="mt-3"><b>Applicant's Signatue: ............................................................</b></p>
</div>
<div class="mt-3 row border border-2 border-dark text-center fw-bold">
    <div class="col-8 border-2 border-end border-dark">
         <div class="">
                Leave
         </div>
         <div class="row border-2 border-top border-dark">
               <div class="col-3 px-0 border-2 border-end border-dark">
                        <div class="border-2 border-bottom border-dark">
                              From
                        </div>
                        <div class="mt-3">
                             ${data[0].fromDate}
                        </div>
               </div>
               <div class="col-3 px-0 border-2 border-end border-dark">
                      <div class="border-2 border-bottom border-dark">
                             To
                       </div>
                       <div class="mt-3">
                        ${data[0].toDate}
                       </div>
               </div>
               <div class="col-6 px-0">
                          <div class="border-2 border-bottom border-dark">
                              Day
                          </div>
                          <div class="row">
                                 <div class="col-4 pe-0 border-2 border-end border-dark">
                                   <p class="border-2 border-bottom border-dark">Full</p>
                                    <p class="mt-2">${data[0].leaveDaysNo}</p>
                                 </div>
                                 <div class="col-8 ps-0 ">
                                     <p class="border-2 border-bottom border-dark"> Half <p>
                                     <div class="row">
                                             <div class="col-6">
                                                   1st
                                             </div>
                                             <div class="col-6">
                                                   2<sup>nd</sup>
                                             </div>
                                     </div>
                                     <div class="row">
                                           <div class="col-6">
                                                 yes
                                            </div>
                                            <div class="col-6">
                                                  NO
                                            </div>
                                     </div>
                                 </div>
                          </div>
               </div>
         </div>
    </div>
    <div class="col-4 px-0">
       <div id="department-recomendation" class="border-2 border-2 border-bottom border-dark">
        Departmental Recommendation
       </div>
         <div class="row">
               <div class="col-4">
                    <p></p>
               </div>
              <div class="col-8 ps-0 border-2 border-dark border-start py-2">
               <div class="pb-2">
               <p id="recName"></p>
              </div>
               <div class="border-2 border-dark border-top">
                Recommended By
               </div>
             </div>
        </div>
    </div>
</div>
<!-- Leave Statement (HR Department use only) -->
<div class="row border border-2 border-dark mt-3">
 <div class="px-0 col-12">
   <p class="fw-bold text-center">Leave Statement (HR Department use only)</p>
 </div>
   <div class="col-12 border-2 border-top border-bottom border-dark">
      <div class="row fw-bold">
         <div class="col-2  border-2 border-end border-dark">
               Opening balance
         </div>
         <div class="col-2  border-2 border-end border-dark">
               Addition <br>(monthly)
         </div>
         <div class="col-2  border-2 border-end border-dark">
               Leave approved
         </div>
         <div class="col-2  border-2 border-end border-dark">
               Present balance
         </div>
         <div class="col-2  border-2 border-end border-dark">
               Application For days
         </div>
         <div class="col-2 ">
               Closing balance
        </div>
     </div>
 </div>
 <div class="col-12 border-2  border-bottom border-dark">
        <div class="row fw-bold">
           <div class="col-2  border-2 border-end border-dark">
                ${data[0].leaveOpeningBalance}
           </div>
           <div class="col-2  border-2 border-end border-dark">
                  2
           </div>
           <div class="col-2  border-2 border-end border-dark">
           </div>
           <div class="col-2  border-2 border-end border-dark">
           ${data[0].leavePresentBalance}
           </div>
           <div class="col-2  border-2 border-end border-dark">
           </div>
           <div class="col-2 ">
           ${data[0].leaveClosingBalance}
          </div>
       </div>
   </div>
 <div class="col-12 py-2">
        <div class="row">
          <div class="col-6 d-flex flex-column  align-items-center">
                 <p class="fw-bold"></p>
                 <p>...........................................................</p>
                 <p>Officer,Hr</p>
          </div>
          <div class="col-6 d-flex flex-column  align-items-center">
               <p class="fw-bold"></p>
               <p>.............................................................</p>
                <p>Checked By</p>
         </div>
        </div>
 </div>
</div>
<div class="mt-3 d-flex flex-column align-items-end">
 <p class="fw-bold"></p>
 <p>...............................................................</p>
  <p>Approved By</p>
</div>
      `;
}
