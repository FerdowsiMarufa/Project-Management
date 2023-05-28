function SalesOrderMutualFunction() {
  hidePage();
  SalesOrderDisplay();
  document.getElementById("ApplicationPage").style.display = "none";
  document.querySelector("#saleSection").style.display = "block";
}

function SalesOrderDisplay() {
  var saleSection = document.querySelector("#saleSection");
  // get client data
  const clientdata = [];
  callApi("SalesOrder", "GetAllClient")
    .then((data) => {
      console.log("client data", data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.ClientId = item.clientId;
          obj.ClientName = item.clientName;
          clientdata.push(obj);
        });
        AddInnerHtmlOfSelect(clientdata, ".ClientNameDiv", 1);
      }

      // console.log("client data", clientdata);
    })
    .catch((error) => console.error(error));

  // get Store data
  const Storedata = [];
  callApi("SalesOrder", "GetAllStore")
    .then((data) => {
      // console.log("GetAllStore data", data);

      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.StoreId = item.storeId;
          obj.StoreName = item.storeName;
          obj.StoreShortName = item.storeShortName;
          Storedata.push(obj);
        });
        console.log("Storedata ", Storedata);
      }
    })
    .catch((error) => console.error(error));

  // get Sales Offer data
  const SalesOfferData = [];
  callApi("SalesOrder", "GetAllStore")
    .then((data) => {
      //console.log("SalesOfferData data", data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.SalesOfferMasterId = item.salesOfferMasterId;
          obj.SalesOfferDisplayNo = item.salesOfferDisplayNo;
          obj.SalesOfferDate = item.salesOfferDate;
          SalesOfferData.push(obj);
        });
        console.log("SalesOfferData ", SalesOfferData);
      }
    })
    .catch((error) => console.error(error));

  // get Sales Offer data
  const SalespersonData = [];
  callApi("HrmLeave", "GetAllApproved")
    .then((data) => {
      //console.log("SalesOfferData data", data);
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.EmployeeId = item.employeeId;
          obj.EmployeeName = item.employeeName;

          SalespersonData.push(obj);
        });
        // console.log("SalespersonData ", SalespersonData);
      }
      AddInnerHtmlOfSelect(SalespersonData, ".SalesPersonValueDiv", 2);
    })
    .catch((error) => console.error(error));

  saleSection.innerHTML = `
     
        
    <div id ="SaleSectionName">SalesOrder</div>
    <div class="container SalesInputContainer">
     
     <div class="row saleSectionRow my-3 ms-1">
       <!-- 1st col -->
       <div class="col-4  ">
  
       <!-- 1st row of 1st col -->
         <div class="  row  inputRow  "> 
           <div class="col-4 SalesInputColumn">
             <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Sales Order Id</label>
           </div>        
         
         <div class=" col-7    ">
           <div class="d-flex">
             <input type="text" class="form-control p-0 SalesOrderId    SalesOrderId"   placeholder=" ">             
             <i class="fa-solid fa-file SalesOrderFileIcon" onclick="CreateNewSalesOrder()" ></i>
             <i class="fa-solid fa-magnifying-glass SalesOrderSearchIcon" onclick ="GetingAllSalesOrder()"></i>
           </div>
         </div> 
  
       </div>
       <!-- row end of 1st col -->
  
       <!-- 2nd row -->
  
       <div class=" row  inputRow "> 
  
         <div class="col-4">
           <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Sales Order No</label>
         </div>
      
         <div class="  col-7 ">
          <input type="text" class="form-control p-0 SalesOrderNo" id="SalesOrderNo " placeholder="  ">             
         </div> 
  
       </div>
       <!-- 2nd row end -->
  
           <!-- 3rd row of 1st col -->
       <div class="row inputRow ">
         <div class="col-4">
           <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Order Date </label>
         </div>
         <div class="  col-7 ">
           <input type="date" class="form-control p-0 SalesOrderDate" id="SalesOrderDate " placeholder=" ">             
         </div>
         
       </div>
  
        <!-- 3rd row of 1st col end -->
  
         <!-- 4th row of 1st col -->
         <div class="row inputRow ">
  
           <div class="col-4">
             <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Client </label>
           </div>
           <div class="  col-7 ">
          
             <input   type="button" class="form-control   clientinput  SalesOrderClient  p-0 m-0" id="SalesOrderClient "  value=" Nothing Selected " onclick="SelectDisplay('.ClientOptionValue', '.SalesPersonButtonValue', '.SalesTypeButtonValue')" placeholder=" ">       
          
             <div class="ClientOptionValue border border-1">
               <div class="SearchDiv p-2">
                 <input type="search" class=" SelectInputSearch  border border-1 w-100">
                   
               </div>
                <div class="ClientNameDiv" onclick="Saledropdown(event,'.clientinput','.ClientOptionValue')">
                  <p  >Akij Textile Mills Ltd</p>     
                  <p>Amazing Fashion Ltd.</p>
                </div>
  
             </div>
             <!-- ClientOptionValue end --> 
           </div>  
  
         </div>
          <!-- 4th row of 1st col end -->
       </div>
       
  
  
       <!-- --------------------- 2nd col ------------------------ -->
       <div class="col-4  ">
  
       <!-- 1st row of 2st col -->
       <div class="  row  inputRow  "> 
         <div class="col-4 SalesInputColumn">
           <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Sales Offer</label>
         </div>        
       
       <div class=" col-7    ">
         <div class="d-flex">
           <input type="text" class="form-control p-0 SalesOrderOffer  SalesOfferInput" id="SalesOrderOffer " placeholder=" ">             
           <i class="fa-solid fa-magnifying-glass SalesOrderSearchIcon" onclick= "GetingAllSalesOffer()"></i>
         </div>
       </div> 
  
     </div>
     <!-- row end of 2st col -->
  
     <!-- 2nd row -->
  
     <div class=" row  inputRow "> 
  
       <div class="col-4">
         <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Sales Person</label>
       </div>
       <div class="  col-7 ">
       
  
         <input type="button" class="form-control   SalePersonButton  SalesOrderPerson  p-0 m-0" id="SalesOrderPerson " value="nothing Selected" onclick="SelectDisplay('.SalesPersonButtonValue', '.ClientOptionValue', '.SalesTypeButtonValue')" placeholder=" ">       
  
         <div class="SalesPersonButtonValue border border-1">
           <div class="SearchDiv p-2">
             <input type="search" class=" SelectInputSearch  border border-1 w-100">
               
           </div>
           <div class="SalesPersonValueDiv" onclick="Saledropdown(event,'.SalePersonButton','.SalesPersonButtonValue')">
              
           </div>
  
         </div>
         <!-- ClientOptionValue end -->
  
  
       </div>
      
     </div>
     <!-- 2nd row end -->
  
         <!-- 3rd row of 2st col -->
     <div class="row inputRow ">
       <div class="col-4">
         <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Sales Type </label>
       </div>
       <div class="col-7">
         
         <input type="button" class="form-control   SalesTypeButton SalesOrderSalesType   p-0 m-0" id="SalesOrderSalesType" value="nothing Selected" onclick="SelectDisplay('.SalesTypeButtonValue', '.ClientOptionValue', '.SalesPersonButtonValue')" placeholder=" ">       
  
         <div class="SalesTypeButtonValue border border-1">
           <div class="SearchDiv p-2">
             <input type="search" class=" SelectInputSearch  border border-1 w-100">
               
           </div>
           <div class="SalesTypeSelectDiv h-25" onclick="Saledropdown(event,'.SalesTypeButton','.SalesTypeButtonValue')">
              <p> Cash</p>     
             <p> Credit</p>
           </div>
  
  
         </div>
         <!-- ClientOptionValue end -->
  
       </div>
       
     </div>
  
      <!-- 3rd row of 2st col end -->
  
       <!-- 4th row of 2st col -->
       <div class="row inputRow ">
         
         <div class="col-4">
           <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Discount </label>
         </div>
         <div class="  col-7 ">
           <input type="text" class="form-control p-0" id="SalesOrderDiscount " placeholder=" ">             
          </div>    
  
       </div>
        <!-- 4th row of 2st col end -->
       </div>
       <!----------------------------- 2nd col end-------------------------->
  
  
         <!-- -----------------------------3rd col ------------------------------>
       <div class="col-4  ">
       <!-- 1st row of 3st col -->
       <div class="  row  inputRow  "> 
         <div class="col-4 SalesInputColumn">
           <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Discount(%)</label>
         </div>        
       
       <div class=" col-7    ">
         <div class="d-flex">
           <input type="text" class="form-control p-0" id=" " placeholder=" ">             
          
         </div>
       </div> 
  
     </div>
     <!-- row end of 3st col -->
  
     <!-- 2nd row -->
  
     <div class=" row  inputRow "> 
  
       <div class="col-4">
         <label for="SalesOrderIdLabel" id="SalesOrderIdLabel">Remarks</label>
       </div>
    
       <div class="  col-7 ">
         <textarea class="form-control" id="myTextArea" name="myTextArea" rows="1" cols="50"></textarea>
  
       </div> 
  
     </div>
     <!-- 2nd row end -->
  
         <!-- 3rd row of 3st col -->
     <div class="row inputRow ">
       <div class="col-4">
         <label for="SalesOrderIdLabel" id="SalesOrderIdLabel"> Store Name </label>
       </div>
       <div class="  col-7 d-flex">
         <input type="text" class="form-control p-0 SalesOrderStoreName   storeNameInput" id="SalesOrderStoreName " placeholder=" ">    
         <i class="fa-solid fa-magnifying-glass SalesOrderSearchIcon" onclick ="GetingAllStore()"></i>           
       </div>
       
     </div>
  
      <!-- 3rd row of 3st col end -->
       </div>
         <!--------------------- 3st col ------------------->
  
     </div>
       <!-------------------- row end-------------------- -->
  
  
       <!-- bottom field  table part -->
     <div class="container bottomField ">
        <div class="row bottomField1stRow  ">
            <div class=" col col-auto "  > <i class="fa-solid fa-magnifying-glass bottom-1st-row-icon SalesBottomFieldSearchIcon"  ></i> </div>
            <div class=" col col-2"> Goods Name</div>
            <div class="col"> Unit Set</div>
            <div class="col"> Unit </div>
            <div class="col">Qty</div>   
            <div class="col">Rate</div>  
            <div class="col">Discount(%)</div>  
            <div class="col">Discount Amt.</div>  
            <div class="col">Total</div>  
            <div class="col">  Remarks </div>
        </div>
       
     </div>
     
     <!-- bottom field  table part end-->
     <div class="AddRowDiv">
       <i class="fa-solid fa-plus" onclick="InputFieldCheckFunction('#SalesOrderId')"></i>
       <i class="fa-solid fa-trash deleteButtonBottomField" onclick=deleteBottomFieldRow()></i>
     </div>
  
  
  
          <!------------- button div of sales section--------------- -->
    
           <div class="d-flex justify-content-end button-div">
               <button type="button" class="btn SalesButton" onclick="saveData()"> <i class="fa-solid fa-download"></i> Save </button>
               <button type="button" class="btn SalesButton" onclick="testing()"><i class="fa-sharp fa-solid fa-trash"></i> Delete</button>
               <button type="button" class="btn SalesButton"> <i class="fa-solid fa-arrows-rotate" ></i> clear</button> 
               <button type="button" class="btn SalesButton " onclick ="displayOldData()"><i class="fa-regular fa-eye"></i> Preview</button>
           </div>
          
          <!------------- button div of sales section--------------- -->
    </div>
    `;

  // AddInnerHtmlOf_SaleTypes_Select(data);
}

function SelectDisplay(x, y, z) {
  var clientName = document.querySelector(x);
  if (clientName.style.display == "block") {
    clientName.style.display = "none";
  } else {
    clientName.style.display = "block";
    document.querySelector(y).style.display = "none";
    document.querySelector(z).style.display = "none";
  }
}

function AddInnerHtmlOfSelect(DataArray, divname, x) {
  console.log("Add Inner  Html  Of  Select ", DataArray);
  console.log(" worked ");
  var select_div = document.querySelector(divname);
  console.log(DataArray, "test");
  for (let i = 0; i < DataArray.length; i++) {
    // console.log(" ashsee ", DataArray[i].ClientName);
    if (x == 1) {
      select_div.innerHTML += `<p> ${DataArray[i].ClientName}</p>`;
    } else if (x == 2) {
      select_div.innerHTML += `<p> ${DataArray[i].EmployeeName}</p>`;
    }
  }
}

function AddInnerHtmlOfClientSelect(SalesfieldDataArray) {
  console.log("Add Inner  Html  Of  Select ", SalesfieldDataArray);

  var select_div = document.querySelector(".ClientNameDiv");
  console.log(SalesfieldDataArray, "test");
  for (let i = 0; i < SalesfieldDataArray.length; i++) {
    console.log(" ashsee ", SalesfieldDataArray[i].employeeFullName);
    select_div[0].innerHTML += `<p> ${SalesfieldDataArray[i].ClientName}</p>`;
  }
}

function AddInnerHtmlOf_SaleTypes_Select(SalesfieldDataArray) {
  console.log("Add Inner  Html  Of  Select ", SalesfieldDataArray);
  var select_div = document.querySelector(".SalesTypeSelectDiv");
  console.log(" worked ");
  // var select_div = document.querySelector(".SalesTypeSelectDiv");
  console.log(SalesfieldDataArray, "test");
  for (let i = 0; i < SalesfieldDataArray.length; i++) {
    // console.log(" ashsee ", SalesfieldDataArray[i].employeeFullName);
    // select_div.innerHTML += `<p> ${SalesfieldDataArray[i].ClientName}</p>`;
    select_div.innerHTML += `<p> ${SalesfieldDataArray[i].ClientId}</p>`;
  }
}

function SalePopupFunction() {
  document.querySelector("#popupSale").classList.toggle("active");
}

function SalePopupFunction2() {
  document.querySelector("#popupSale").classList.toggle("active");
}

document.querySelector("#SalePopUpclose").onclick = () => {
  document.querySelector("#popupSale").classList.remove("active");
};

function Saledropdown(event, divClass, displayNonedivNAme) {
  let dropDownValue = event.target.innerHTML;
  console.log(dropDownValue);
  var clientinput = document.querySelector(divClass);
  clientinput.value = dropDownValue;
  document.querySelector(displayNonedivNAme).style.display = "none";
}

//checking the field is null or not

function InputFieldCheckFunction(x) {
  const salesOrderIdInput = document.querySelector(".SalesOrderId").value;

  console.log("salesOrderIdValue", salesOrderIdInput);

  var salesOderID = document.querySelector(".SalesOrderNo").value;
  var OderDate = document.querySelector(".SalesOrderDate").value;
  var Client = document.querySelector(".SalesOrderClient").value;
  var SalesPerson = document.querySelector(".SalesOrderPerson").value;
  var SalesType = document.querySelector(".SalesOrderSalesType").value;
  var StoreName = document.querySelector(".SalesOrderStoreName").value;
   
  if (
    salesOrderIdInput != "" &&
    salesOderID != "" &&
    OderDate != "" &&
    Client != "" &&
    SalesPerson != "" &&
    SalesType != "" &&
    StoreName != ""
  ) {
    alert("it works");
    AddBottomFieldRow();

  } else {
    alert("fill the input please");
  }
}

function AddBottomFieldRow() {
  var bottomField = document.querySelector(".bottomField");
  bottomField.innerHTML += ` 
  <div class="row  ">
  <div class=" col col-auto"  onclick ="GetingAllGoods()"><i class="fa-solid fa-magnifying-glass SalesBottomFieldSearchIcon  SalesBottomFieldSearchIconColor"></i></div>
  <div class=" col col-2 goodsName" id="GoodsInput"> Nut</div>
  <div class="col  "><input type="text" /></div>
  <div class="col "><input type="text" /> </div>
  <div class="col Quantity"><input type="text"value="0" /></div>
  <div class="col Rate"><input type="text" value="0"/></div>
  <div class="col discount"><input type="text"value="0"/></div>
  <div class="col discountAmount"><input type="text"  class="discountAmount" value="0"/> </div>
  <div class="col totalValue"></div>
  <div class="col Remarks"><input type="text"   /></div>
</div> `;

  // Get the input fields and relevant divs
  const quantityInput = document.querySelector(".Quantity input");
  const rateInput = document.querySelector(".Rate input");
  const discountInput = document.querySelector(".discount input");
  const discountAmountDiv = document.querySelector(".discountAmount");
  const totalValueDiv = document.querySelector(".totalValue");

  // Add event listeners to the quantity, rate, and discount input fields
  quantityInput.addEventListener("input", calculateTotal);
  rateInput.addEventListener("input", calculateTotal);
  discountInput.addEventListener("input", calculateTotal);

  // Function to calculate the total and discount amount
  function calculateTotal() {
    // Get the values from the quantity, rate, and discount input fields
    const quantity = parseFloat(quantityInput.value);
    const rate = parseFloat(rateInput.value);
    const discount = parseFloat(discountInput.value);

    // Calculate the total value and discount amount
    const totalValue = quantity * rate;
    const discountAmount = totalValue * (discount / 100);
    if (discount > 0) {
      const totalValueAfterDiscount = totalValue - discountAmount;
      totalValueDiv.textContent = totalValueAfterDiscount.toFixed(2);
      discountAmountDiv.textContent = discountAmount.toFixed(2);
    } else {
      totalValueDiv.innerHTML = totalValue.toFixed(2);
    }
  }
}

// deleting the row

function deleteBottomFieldRow() {
  // Assuming you have a button with a class "deleteButton" that triggers the row deletion
  const deleteButton = document.querySelector(".deleteButtonBottomField");

  // Add event listeners to the delete buttons

  deleteButton.addEventListener("click", deleteRow);

  // Function to delete the row
  function deleteRow(event) {
    const button = event.target;
    const row = button.closest(".row");

    // Remove the row element from the DOM
    row.remove();
  }
}

// geting all stores

function GetingAllStore() {
  document.querySelector("#popupSale").classList.toggle("active");

  const Storedata = [];
  callApi("SalesOrder", "GetAllStore")
    .then((data) => {
      console.log("GetAllStore data", data);

      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.StoreId = item.storeId;
          obj.StoreName = item.storeName;
          obj.StoreShortName = item.storeShortName;
          Storedata.push(obj);
        });
        console.log("Storedata ", Storedata);
      }

      ShowStoreData(Storedata);
    })
    .catch((error) => console.error(error));

  function ShowStoreData(Storedata) {
    var SalePopUpContainerTable = document.querySelector(
      "#SalePopUpContainerTable"
    );

    SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">
          <div class="col"> Store location</div>
          <div class="col">Store name</div>
        </div> `;

    for (var i = 0; i < Storedata.length; i++) {
      SalePopUpContainerTable.innerHTML += `
                    <div class="row">
                    <div class="col">  ${Storedata[i].StoreName}</div>
                    <div class="col">  ${Storedata[i].StoreShortName}</div>
                   </div>
                    `;
    }
  }
}

// Geting all gooods

function GetingAllGoods() {
  document.querySelector("#popupSale").classList.toggle("active");

  fetch(`https://localhost:7160/api/MaterialStock/GetAllMaterialStocks`)
    .then((response) => response.json())
    .then((data) => {
      console.log(" goods data :", data);
      const goodsData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.GoodsID = item.goodsId;
          obj.GoodsName = item.goodsName;
          goodsData.push(obj);
        });
        ShowGoodsData(goodsData);
        //console.log("store data: ",Storedata);
      } else {
        alert(" goodsData not found");
      }
    })
    .catch((error) => console.error(error));

  function ShowGoodsData(goodsData) {
    console.log("function working..........");

    var SalePopUpContainerTable = document.querySelector(
      "#SalePopUpContainerTable"
    );

    SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">
          <div class="col"> Goods Id</div>
          <div class="col"> SalesOfferDetailsId </div>
          <div class="col">Goods Name</div>
        </div> `;

    for (var i = 0; i < goodsData.length; i++) {
      SalePopUpContainerTable.innerHTML += `
                    <div class="row">
                    <div class="col">  ${goodsData[i].GoodsID}</div>
                    <div class="col"> - </div>
                    <div class="col">  ${goodsData[i].GoodsName}</div>
                   </div>
                    `;
    }
  }
}

// Sales offer

function GetingAllSalesOffer() {
  document.querySelector("#popupSale").classList.toggle("active");

  //console.log("okay");
  fetch(`https://localhost:7160/api/SalesOrder/GetAllSalesOffer`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      const SalesOffer = [];
      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.SalesOfferMasterId = item.salesOfferMasterId;
          obj.SalesOfferDisplayNo = item.salesOfferDisplayNo;
          obj.SalesOfferDate = item.salesOfferDate;
          SalesOffer.push(obj);
        });
        ShowSalesOfferData(SalesOffer);
        console.log("store data: ", SalesOffer);
      } else {
        alert(" SalesOffer not found");
      }
    })
    .catch((error) => console.error(error));

  function ShowSalesOfferData(SalesOffer) {
    //console.log("function working..........");

    var SalePopUpContainerTable = document.querySelector(
      "#SalePopUpContainerTable"
    );

    SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">

          <div class="col"> Sales Offer Id </div>
          <div class="col">  SalesOffer.No</div>
          <div class="col">  Offer Date</div>

        </div> `;

    for (var i = 0; i < SalesOffer.length; i++) {
      SalePopUpContainerTable.innerHTML += `
                    <div class="row">
                    <div class="col">  ${SalesOffer[i].SalesOfferMasterId}</div>
                    <div class="col">  ${SalesOffer[i].SalesOfferDisplayNo}</div>
                    <div class="col">  ${SalesOffer[i].SalesOfferDate}</div>
                   </div>
                    `;
    }
  }
}

// Sales Order


function GetingAllSalesOrder() {
  document.querySelector("#popupSale").classList.toggle("active");

  //console.log("okay");
  fetch(
    `https://localhost:7160/api/SalesOrder/GetSalesOrder`
  )
  .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      const SalesOrder = [];
      if (data.length > 0) {
            data.forEach((item) => {
              const obj = {};
              obj.SalesOfferMasterId = item.salesOfferMasterId;
              obj.DisplayNo = item.displayNo;
              obj.SalesOrderDate = item.salesOrderDate;
              SalesOrder.push(obj);
            });
            ShowSalesOfferData(SalesOrder);
            console.log("store data: ",SalesOrder);
          } else {
            alert(" SalesOffer not found");
          }
        })
        .catch((error) => console.error(error));


        function ShowSalesOfferData(SalesOrder) {
          //console.log("function working..........");


          var SalePopUpContainerTable = document.querySelector(
            "#SalePopUpContainerTable"
          );

          SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">

          <div class="col"> SalesOfferMasterId</div>
          <div class="col">Display No</div>
          <div class="col">SalesOrderDate</div>

        </div> `;
        
            for (var i = 0; i < SalesOrder.length; i++) {
              SalePopUpContainerTable.innerHTML += `
                    <div class="row" onclick="tableValueForSalesOrder(event)">
                    <div class="col">  ${SalesOrder[i].SalesOfferMasterId}</div>
                    <div class="col">  ${SalesOrder[i].DisplayNo}</div>
                    <div class="col">  ${SalesOrder[i].SalesOrderDate}</div>
                   </div>
                    `;
            }
        

        }   

}


function CreateNewSalesOrder() {
  document.querySelector(".SalesOrderId").placeholder = "****<< NEW >>****";
  document.querySelector(".SalesOrderNo").placeholder = "****<< NEW >>****";
}

function saveData() {
  const obj = [];
  var SalesOrderId = document.querySelector(".SalesOrderId");
  // Get the value of the input
  var SalesOrderMasterId = SalesOrderId.value;

  var SalesOrderNo = document.querySelector(".SalesOrderNo");
  // Get the value of the input
  var SalesOrderDetailsId = SalesOrderNo.value;

  var SalesOrderOffer = document.querySelector(".SalesOrderOffer");
  // Get the value of the input
  var SalesOfferDetailsId = SalesOrderOffer.value;
 

  // var SalesOrderId = document.querySelector('.SalesOrderId');
  // // Get the value of the input
  // var SalesOrderDetailsId = SalesOrderId.value;
 
  
  var Sales_OrderDate = document.querySelector(".SalesOrderDate");
  // Get the value of the input
  var SalesdOderDate = Sales_OrderDate.value;

    const SalesOrderQty = document.querySelector(".Quantity input").value;
    const SalesOrderRate = document.querySelector(".Rate input").value;
    const DiscountPercent = document.querySelector(".discount input").value;
    // const DiscountAmount = document.querySelector(".discountAmount input").value;
    // var GoodsName = document.querySelector('.goodsName').textContent.trim();
    var GoodsName = "nut";
    // Display the value in the console
 
    

    // var Remarks = document.getElementById('myTextArea').value;
    var Remarks =  "very good";
    // var GoodsName = document.getElementById("goodsName").querySelector("input").value;
  

        // var DiscountAmount = document.querySelector('.discountAmount ').value;
        DiscountAmount =0;
    // var UnitSetId = document.getElementById("UnitSet").querySelector("input").value;
    // var UnitId = document.getElementById("Unit").querySelector("input").value;
    // var SalesOrderQty = document.getElementById("Qty").querySelector("input").value;
    // var SalesOrderRate = document.getElementById("Rate").querySelector("input").value;
    // var DiscountPercent = document.getElementById("Discount").querySelector("input").value;
    // var DiscountAmount = document.getElementById("DiscountAmt").querySelector("input").value;
  //  var Total = document.getElementById("Total").querySelector("input").value;
  //   var Remarks = document.getElementById("Remarks").querySelector("input").value;
    obj.push({
       SalesOrderDetailsId,
      SalesOrderMasterId,
      SalesOfferDetailsId,
      // GoodsId,
      SalesOrderQty,
      SalesOrderRate,
      // UnitSetId,
      // UnitId,
       Remarks,
      DiscountAmount,
      DiscountPercent,

       GoodsName
    });
    console.log("objectdshdh : ", obj);
    const objJSON = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("NewOrderDetailsData", objJSON);
    fetch(
      "https://localhost:7160/api/SalesOrder/NewOrderDetails",
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
      console.error("Error:", error);
    });


    Clear();




}




function Clear(){

  var SalesOrderId = document.querySelector(".SalesOrderId");
  // Get the value of the input
 SalesOrderId.value ="";

  var SalesOrderNo = document.querySelector(".SalesOrderNo");
  // Get the value of the input
 SalesOrderNo.value ="";

  var SalesOrderOffer = document.querySelector(".SalesOrderOffer");
  // Get the value of the input
  SalesOrderOffer.value ="";

 

  // var SalesOrderId = document.querySelector('.SalesOrderId');
  // // Get the value of the input
  // var SalesOrderDetailsId = SalesOrderId.value;
 
 
  
  var Sales_OrderDate = document.querySelector(".SalesOrderDate");
  Sales_OrderDate.value="";

     document.querySelector(".Quantity input").value ="";
  document.querySelector(".Rate input").value="";
 document.querySelector(".discount input").value="";
 
    var discountAmount = document.querySelector('.discountAmount');
    // Get the value of the input
    discountAmount.value ="";
  


}

function addDataToMasterTable() {






}

function displayOldData() {
  const displayMasterTableData = [];
  var id = 1;
  fetch(`https://localhost:7160/api/SalesOrder/GetOldSalesOrder/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length) {
        const obj = [];
        data.forEach((item) => {
          obj.SalesOrderMasterId = item.salesOrderMasterId;
          obj.SalesOrderDetailsId = item.salesOrderDetailsId;
          obj.SalesOfferMasterId = item.salesOfferMasterId;
          obj.SalesOrderQty = item.salesOrderQty;
          obj.Remarks = item.remarks;
          obj.SalesType = item.salesType;
          obj.DiscountAmount = item.discountAmount;
          obj.SalesOrderRate = item.salesOrderRate;
          obj.EmployeeId = item.employeeId;
          obj.DiscountPercent = item.discountPercent;
          displayMasterTableData.push(obj);
        });
      }
         AddBottomFieldRow();
      displayData(displayMasterTableData);
      console.log("displayMasterTableData", displayMasterTableData);
    })
    .catch((error) => console.error(error));

  //displaying tha data
  function displayData() {
 
    var SalesOrderId = document.querySelector(".SalesOrderId");
    // Get the value of the input
    SalesOrderId.value = displayMasterTableData[0].SalesOfferMasterId;

    var SalesOrderNo = document.querySelector(".SalesOrderNo");
    // Get the value of the input
    SalesOrderNo.value = displayMasterTableData[0].SalesOrderDetailsId;

    var SalesOrderOffer = document.querySelector(".SalesOrderOffer");
    // Get the value of the input
    SalesOrderOffer.value = displayMasterTableData[0].SalesOrderMasterId;
   
    var remarks = document.querySelector(".Remarks");
    // Get the value of the input
    remarks.value = displayMasterTableData[0].Remarks;

    var salesOrderSalesType = document.querySelector(".SalesOrderSalesType");
    // Get the value of the input
    salesOrderSalesType.value = displayMasterTableData[0].SalesType;

    document.querySelector(".discountAmount").value =
      displayMasterTableData[0].DiscountAmount;
    // var GoodsName = document.getElementById("goodsName").querySelector("input").value;

    document.getElementById("Qty").querySelector("input").value =
      displayMasterTableData[0].SalesOrderQty;
    document.getElementById("Rate").querySelector("input").value =
      displayMasterTableData[0].SalesOrderRate;
    document.getElementById("Discount").querySelector("input").value =
      displayMasterTableData[0].DiscountPercent;
  }
}





//BY shihab===========================================================


function SalePopupGetingValue(event) {

  tableValueForGoods(event);

  tableValueForStores(event);

  tableValueForSalesOrder(event);

  tableValueForSalesOffer(event);

 document.querySelector("#popupSale").classList.remove("active");

}


// goods popup selected value.

function tableValueForGoods(event) {
  let clickedRow = event.target.closest('.row');
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(clickedRow);
    let rowValues = Array.from(clickedRow.children).map(column => column.innerHTML);
    console.log('Row Values:', rowValues);
    console.log('Row Number:', rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll('.row.selected');
    selectedRows.forEach(row => row.classList.remove('selected'));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add('selected');

    var GoodsInput = document.getElementById("GoodsInput");

    GoodsInput.innerHTML = rowValues[2]; 

  } else {
    console.log('No matching row found');
  }
}




// Store Name popup selected value.
function tableValueForStores(event) {

  let clickedRow = event.target.closest('.row');
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(clickedRow);
    let rowValues = Array.from(clickedRow.children).map(column => column.innerHTML);
    console.log('Row Values:', rowValues);
    console.log('Row Number:', rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll('.row.selected');
    selectedRows.forEach(row => row.classList.remove('selected'));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add('selected');

   var storeNameInput = document.querySelector('.storeNameInput');
   console.log("store: ", storeNameInput);

   storeNameInput.value = rowValues[0];

  } else {
    console.log('No matching row found');
  }
}


// SalesOrderId

function tableValueForSalesOrder(event) {

  let clickedRow = event.target.closest('.row');
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(clickedRow);
    let rowValues = Array.from(clickedRow.children).map(column => column.innerHTML);
    console.log('Row Values:', rowValues);
    console.log('Row Number:', rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll('.row.selected');
    selectedRows.forEach(row => row.classList.remove('selected'));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add('selected');

   var SalesOrder = document.querySelector('.SalesOrderId');
   console.log("store: ", SalesOrder);

   SalesOrder.value = rowValues[0];

  } else {
    console.log('No matching row found');
  }
}




// SalesOffre

function tableValueForSalesOffer(event) {

  let clickedRow = event.target.closest('.row');
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(clickedRow);
    let rowValues = Array.from(clickedRow.children).map(column => column.innerHTML);
    console.log('Row Values:', rowValues);
    console.log('Row Number:', rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll('.row.selected');
    selectedRows.forEach(row => row.classList.remove('selected'));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add('selected');

   var SalesOfferInput = document.querySelector('.SalesOfferInput');
   console.log("store: ", SalesOfferInput);

   SalesOfferInput.value = rowValues[0];

  } else {
    console.log('No matching row found');
  }
}














//==============================


// geting all stores  

function GetingAllStore() {
  document.querySelector("#popupSale").classList.toggle("active");

  const Storedata = [];
  callApi("SalesOrder", "GetAllStore")
    .then((data) => {
      console.log("GetAllStore data", data);

      if (data.length > 0) {
        data.forEach((item) => {
          const obj = {};
          obj.StoreId = item.storeId;
          obj.StoreName = item.storeName;
          obj.StoreShortName = item.storeShortName;
          Storedata.push(obj);
        });
        console.log("Storedata ", Storedata);
      }

      ShowStoreData(Storedata);
    })
    .catch((error) => console.error(error));


        function ShowStoreData(Storedata) {
         


          var SalePopUpContainerTable = document.querySelector(
            "#SalePopUpContainerTable"
          );

          SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">
          <div class="col"> Store location</div>
          <div class="col">Store name</div>
        </div> `;
        
            for (var i = 0; i < Storedata.length; i++) {
              SalePopUpContainerTable.innerHTML += `
                    <div class="row" onclick="tableValueForStores(event)">
                    <div class="col d-none">  ${Storedata[i].StoreId}</div>
                    <div class="col">  ${Storedata[i].StoreName}</div>
                    <div class="col">  ${Storedata[i].StoreShortName}</div>
                   </div>
                    `;
            }
        

        }   

}



// Geting all gooods


function GetingAllGoods() {
  document.querySelector("#popupSale").classList.toggle("active");


  fetch(
    `https://localhost:7160/api/MaterialStock/GetAllMaterialStocks`
  )
  .then((response) => response.json())
    .then((data) => {
      const goodsData = [];
      if (data.length > 0) {
          console.log("goods Data", data);
            data.forEach((item) => {
              const obj = {};
              obj.GoodsID = item.goodsId;
              obj.GoodsName = item.goodsName;
              goodsData.push(obj);
            });
            ShowGoodsData(goodsData);
            //console.log("store data: ",Storedata);
          } else {
            alert(" goodsData not found");
          }
        })
        .catch((error) => console.error(error));


        function ShowGoodsData(goodsData) {
          console.log("function working..........");


          var SalePopUpContainerTable = document.querySelector(
            "#SalePopUpContainerTable"
          );

          SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">
          <div class="col"> Goods Id</div>
          <div class="col"> SalesOfferDetailsId </div>
          <div class="col">Goods Name</div>
        </div> `;
        
            for (var i = 0; i < goodsData.length; i++) {
              SalePopUpContainerTable.innerHTML += `
                    <div class="row" onclick="tableValueForGoods(event)">
                      <div class="col" >  ${goodsData[i].GoodsID}</div>
                      <div class="col"> - </div>
                      <div class="col">  ${goodsData[i].GoodsName}</div>
                   </div>
                    `;
            }
        

        }   

}





// Sales offer 

function GetingAllSalesOffer() {
  document.querySelector("#popupSale").classList.toggle("active");

  //console.log("okay");
  fetch(
    `https://localhost:7160/api/SalesOrder/GetAllSalesOffer`
  )
  .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      const SalesOffer = [];
      if (data.length > 0) {
            data.forEach((item) => {
              const obj = {};
              obj.SalesOfferMasterId = item.salesOfferMasterId;
              obj.SalesOfferDisplayNo = item.salesOfferDisplayNo;
              obj.SalesOfferDate = item.salesOfferDate;
              SalesOffer.push(obj);
            });
            ShowSalesOfferData(SalesOffer);
            console.log("store data: ",SalesOffer);
          } else {
            alert(" SalesOffer not found");
          }
        })
        .catch((error) => console.error(error));


        function ShowSalesOfferData(SalesOffer) {
          //console.log("function working..........");


          var SalePopUpContainerTable = document.querySelector(
            "#SalePopUpContainerTable"
          );

          SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">

          <div class="col"> Sales Offer Id </div>
          <div class="col">  SalesOffer.No</div>
          <div class="col">  Offer Date</div>

        </div> `;
        
            for (var i = 0; i < SalesOffer.length; i++) {
              SalePopUpContainerTable.innerHTML += `
                    <div class="row" onclick=" tableValueForSalesOffer(event)">
                    <div class="col">  ${SalesOffer[i].SalesOfferMasterId}</div>
                    <div class="col">  ${SalesOffer[i].SalesOfferDisplayNo}</div>
                    <div class="col">  ${SalesOffer[i].SalesOfferDate}</div>
                   </div>
                    `;
            }
        

        }   

}








// Sales Order


function GetingAllSalesOrder() {
  document.querySelector("#popupSale").classList.toggle("active");

  //console.log("okay");
  fetch(
    `https://localhost:7160/api/SalesOrder/GetSalesOrder`
  )
  .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      const SalesOrder = [];
      if (data.length > 0) {
            data.forEach((item) => {
              const obj = {};
              obj.SalesOfferMasterId = item.salesOfferMasterId;
              obj.DisplayNo = item.displayNo;
              obj.SalesOrderDate = item.salesOrderDate;
              SalesOrder.push(obj);
            });
            ShowSalesOfferData(SalesOrder);
            console.log("store data: ",SalesOrder);
          } else {
            alert(" SalesOffer not found");
          }
        })
        .catch((error) => console.error(error));


        function ShowSalesOfferData(SalesOrder) {
          //console.log("function working..........");


          var SalePopUpContainerTable = document.querySelector(
            "#SalePopUpContainerTable"
          );

          SalePopUpContainerTable.innerHTML = `
          <div class="row Sale_1strow bg-light">

          <div class="col"> SalesOfferMasterId</div>
          <div class="col">Display No</div>
          <div class="col">SalesOrderDate</div>

        </div> `;
        
            for (var i = 0; i < SalesOrder.length; i++) {
              SalePopUpContainerTable.innerHTML += `
                    <div class="row" onclick="tableValueForSalesOrder(event)">
                    <div class="col">  ${SalesOrder[i].SalesOfferMasterId}</div>
                    <div class="col">  ${SalesOrder[i].DisplayNo}</div>
                    <div class="col">  ${SalesOrder[i].SalesOrderDate}</div>
                   </div>
                    `;
            }
        

        }   

}



