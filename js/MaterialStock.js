function MaterialStockMutualFunction() {
  // RadioOnclickFunction(
  //   LeaveApplicationPending,
  //   LeaveApplicationApproved,
  //   LeaveApplicationReject
  // );
  let radio_div = document.querySelector(".radio-div");
  radio_div.innerHTML = ` `;
  hidePage();
  MaterialStockALL();
}

function MaterialStockALL() {
  let MaterialStockAllData = [];

  callApi("MaterialStock", "GetAllMaterialStocks")
    .then((data) => {
      console.log("data ", data);
      data.forEach((item) => {
        const obj = {};

        obj.GroupCode = item.groupCode;
        obj.GoodsID = item.goodsId;
        obj.GoodsName = item.goodsName;
        obj.Specification = item.specification;
        obj.StockQty = item.stockQty;

        obj.ProjectName = item.projectName;
        obj.StoreCode = item.storeCode;
        MaterialStockAllData.push(obj);
      });
      console.log("MaterialStockAllData ", MaterialStockAllData);
      displayMaterialStockData();
    })
    .catch((error) => {
      console.error(error);
    });

  function displayMaterialStockData() {
    hidePage();

    DataContainer = document.querySelector("#ApplicationContainer");
    // here we add {HrmLeave} as a class that we can access  update(api) url data
    //let sectionContainer = document.querySelector("#ApplicationPage");
    //   sectionContainer.classList = "HrmLeave";
    // console.log(newApprovalContainer);<button type="button" onclick="SelectAllFunction()" class="selectall-button  ">SelectAll</button>
    DataContainer.innerHTML = `
        <div class="row row-1st" style="height: 60px"; >
        <div class="col fw-bold px-4"><input type="checkbox" class="form-check-input" onclick="SelectAllFunction('MaterialAllSelectAll','box')"  id="MaterialAllSelectAll"  name="selectall" value="All">  All </div>
        <div class="col fw-bold ">Goods id</div>
        <div class="col fw-bold">Store Code</div>
        <div class="col fw-bold ">Group code</div>
        <div class="col-2 fw-bold">Goods Name</div>
        <div class="col-2 fw-bold">Specification</div>
        <div class="col fw-bold">Stock Qty</div>
        <div class="col fw-bold">Approved Qty</div>
        <div class="col fw-bold">Project Name</div>
  
        <div class="col fw-bold">Action</div>
      </div>
        `;
    for (let i = 0; i < MaterialStockAllData.length; i++) {
      DataContainer.innerHTML +=
        `<div class="row  MaterialStock-row text-center">
    <div class="col-1">
      <input
        class="form-check-input  leaveCheckbox"
        type="checkbox"
        name="box"
        id= ${MaterialStockAllData[i].GoodsID}
        onclick="MaterialStockCheckboxClick(${i})"
      />
    </div>
        
    <div class="col MaterialColumn  ">` +
        MaterialStockAllData[i].GoodsID +
        `</div>
    <div class="col MaterialColumn  ">` +
        MaterialStockAllData[i].StoreCode +
        `</div>
    <div class="col MaterialColumn ">` +
        MaterialStockAllData[i].GroupCode +
        `</div>
      <div class="col-2 MaterialColumn ">` +
        MaterialStockAllData[i].GoodsName +
        `</div>
    <div class="col-2 MaterialColumn ">  ` +
        MaterialStockAllData[i].Specification +
        `</div>
        <div class="col MaterialColumn ">` +
        MaterialStockAllData[i].StockQty +
        `</div>
    <div class="col MaterialColumn "> <input type="text" class="MaterialStockInput" id="${MaterialStockAllData[i].StockQty}" name="StockInput"  ></div>
    <div class="col MaterialColumn ">` +
        MaterialStockAllData[i].ProjectName +
        `</div> 
    <div class="col individual-select-item"> <i class="fa-solid fa-check select"  data-bs-toggle="modal"  data-bs-target="#exampleModalApprove"  onclick="IndividualSelectCross(${MaterialStockAllData[i].GoodsID})"></i> 
    </div>
    </div>
    `;
    }
  }

  const buttonDiv = document.querySelector(".button-div");

  // Add some content to the button div element
  // buttonDiv.innerHTML = `<button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal"   onclick="changeTarget()">Update</button>`;
  buttonDiv.innerHTML = `<button type="button"  class="approve-button" id="LeaveApprovebutton" data-bs-toggle="modal" data-bs-target="#exampleModalApprove"  >Update</button>`;

  //  buttonDiv.innerHTML = `<button onclick="showModal()">Show modal</button>`;
}

function RetriveMaterialRowsData(StockInputArray) {
  console.log(StockInputArray);

  const rows = document.querySelectorAll(".MaterialStock-row"); // select the row using its ID
  let StockInput = document.querySelectorAll('input[name="StockInput"]');

  const RowData = [];

  for (let i = 0; i < StockInputArray.length; i++) {
    const GoodsId =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[0]
        .innerText;
    const StoreCode =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[1]
        .innerText;
    const GroupCode =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[2]
        .innerText;
    const GoodsName =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[3]
        .innerText;
    const Specification =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[4]
        .innerText;
    const StockQty =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[5]
        .innerText;

    const ApproveQty = StockInput[StockInputArray[i]].value;
    const ProjectName =
      rows[StockInputArray[i]].getElementsByClassName("MaterialColumn")[7]
        .innerText;

    RowData.push({
      GoodsId,
      StoreCode,
      GroupCode,
      GoodsName,
      Specification,
      StockQty,
      ApproveQty,
      ProjectName,
    });
    console.log(RowData);
  }
  const StringData = JSON.stringify(RowData);
  console.log("StringData", StringData);
  const formData = new FormData();
  formData.append("approvedStock", StringData);

  fetch("https://localhost:7160/api/MaterialStock/MaterialStocksUpdate", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      console.log();
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":" + pair[1]);
        MaterialStockALL();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function changeTarget() {
  console.log("ieyriyeuj");
  let StockInput = document.querySelectorAll('input[name="StockInput"]');
  // console.log("StockInputvalue",StockInputvalue);
  var checkbox = document.getElementsByName("box");
  let cnt = 0;
  let m = 0;
  for (let i = 0; i < StockInput.length; i++) {
    if (checkbox[i].checked) {
      if (StockInput[i].value == "") {
        cnt++;
      }
      m++;
    }
  }
  console.log("cnt < StockInput.length", cnt, StockInput.length);
  if (cnt < m) {
    alert("give some input");
  }
}

function MaterialStockCheckboxClick(checkboxClicked) {
  console.log("checkboxClicked", checkboxClicked);
  let StockInputvalue = document.querySelectorAll('input[name="StockInput"]');
  var checkbox = document.getElementsByName("box");
  console.log("StockInputvalue", StockInputvalue[checkboxClicked].value);
  if (StockInputvalue[checkboxClicked].value == "") {
    console.log("StockInputvalue null");
    alert("give new stock data on selected goods");
    checkbox[checkboxClicked].checked = false;
  }
  //   let StockInputvalue = document.querySelectorAll('input[name="StockInput"]');
  // if (StockInputvalue[checkboxClicked] !== null) {
  //   console.log("StockInputvalue", StockInputvalue[checkboxClicked].value);
  // } else {
  //   console.log("StockInputvalue is null");
  // }
}
