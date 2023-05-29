function SalesOrderMutualFunction() {
  hidePage();
  SalesOrderDisplay();
  document.getElementById("ApplicationPage").style.display = "none";
  document.querySelector("#saleSection").style.display = "block";
}

function SalesOrderDisplay() {
  // var saleSection = document.querySelector("#saleSection");
  const StoreData = [];
  //retriving Data
  callApi("SalesOrder", "RetriveSalesOderdata")
    .then((data) => {
      console.log("Retrive", data);
      // Parse the response and store it in variables
      console.log("data", data);
      const storeData = data.stores;
      console.log("store", storeData[0]);
      const clientData = data.clients;
      const employeeData = data.employees;
      const materialData = data.materials;
      const SalesOrderMasters = data.salesOrderMasters;
      // Do something with the data
      console.log(storeData);
      console.log(clientData);
      console.log(employeeData);
      console.log(materialData);
      console.log(SalesOrderMasters);
      // You can also iterate over the arrays and access individual properties
      // storeData.forEach(store => {
      // const  obj={};
      //   console.log(store.storeId);
      //   console.log(store.storeName);
      //   console.log(store.storeShortName);
      // });
      storeData.forEach((item) => {
        const obj = {};
        obj.StoreId = item.storeId;
        obj.StoreName = item.storeName;
        obj.StoreShortName = item.storeShortName;
        StoreData.push(obj);
        console.log(obj.StoreData);
      });
      //for display
      displayTopSalesField(
        storeData,
        clientData,
        employeeData,
        materialData,
        SalesOrderMasters
      );
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);
    });
  // AddInnerHtmlOf_SaleTypes_Select(data);
}
function displayTopSalesField(
  storeData,
  clientData,
  employeeData,
  materialData,
  SalesOrderMasters
) {
  var saleSection = document.querySelector("#saleSection");
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
           <i class="fa-solid fa-magnifying-glass SalesOrderSearchIcon" onclick ="DisplaySaleMasterData('${encodeURIComponent(
             JSON.stringify(SalesOrderMasters)
           )}')"></i>
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
              <div class="ClientNameDiv" onclick="Saledropdown(event,'.clientinput','.ClientOptionValue','.ClientValue')">
             
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
           <input type="search" class=" SelectInputSearch   border border-1 w-100">
             
         </div>
         <div class="SalesPersonValueDiv" onclick="Saledropdown(event,'.SalePersonButton','.SalesPersonButtonValue','.EmployeeValue')">
            
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
       
       <input type="button" class="form-control salesTypeInput  SalesTypeButton SalesOrderSalesType   p-0 m-0" id="SalesOrderSalesType" value="nothing Selected" onclick="SelectDisplay('.SalesTypeButtonValue', '.ClientOptionValue', '.SalesPersonButtonValue')" placeholder=" ">       

       <div class="SalesTypeButtonValue border border-1">
         <div class="SearchDiv p-2">
           <input type="search" class=" SelectInputSearch  border border-1 w-100">
             
         </div>
         <div class="SalesTypeSelectDiv h-25"   onclick="Saledropdown(event,'.SalesTypeButton','.SalesTypeButtonValue',' ')">
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
         <input type="text" class="form-control p-0 discountInput" id="SalesOrderDiscount " placeholder=" ">             
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
         <input type="text" class="form-control p-0 discountPercentageInput" id=" " placeholder=" ">             
        
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
       <i class="fa-solid fa-magnifying-glass SalesOrderSearchIcon" onclick="ShowStoreData('${encodeURIComponent(
         JSON.stringify(storeData)
       )}')" ></i>
       
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
          <div class="col Quantity">Stock Qty</div>   
          <div class="col Quantity">Sale Qty</div>   
          <div class="col  ">Rate</div>  
          <div class="col  ">Discount(%)</div>  
          <div class="col   ">Discount Amt.</div>  
          <div class="col">Total</div>  
          <div class="col Remarks ">  Remarks </div>
      </div>
     
   </div>
   
   <!-- bottom field  table part end-->
   <div class="AddRowDiv">
     <i class="fa-solid fa-plus" onclick="addBottomFieldRow('${encodeURIComponent(
       JSON.stringify(materialData)
     )}')"></i>
     <i class="fa-solid fa-trash deleteBtn"  onclick="deleteRowlast()"></i>
   </div>



        <!------------- button div of sales section--------------- -->
  
         <div class="d-flex justify-content-end button-div">
             <button type="button" class="btn SalesButton" onclick="saveData()"> <i class="fa-solid fa-download"></i> Save </button>
             <button type="button" class="btn SalesButton" onclick="test()"><i class="fa-sharp fa-solid fa-trash"></i> Delete</button>
             <button type="button" class="btn SalesButton"> <i class="fa-solid fa-arrows-rotate" ></i> clear</button> 
             <button type="button" class="btn SalesButton " onclick ="displayOldData()"><i class="fa-regular fa-eye"></i> Preview</button>
         </div>
        
        <!------------- button div of sales section--------------- -->
  </div>
  `;

  AddInnerHtmlOfSelect(clientData, ".ClientNameDiv", 1);

  AddInnerHtmlOfSelect(employeeData, ".SalesPersonValueDiv", 2);

  //showing store data
}

function test() {
  //   var clientinput = document.querySelector(".SalePersonButton");
  //   var ClientId = document.querySelector(".ClientValue").getAttribute("id");
  //   console.log("ClientId ", ClientId);
  //   console.log(" button id SalePersonButton ", clientinput.getAttribute("id"));
  //   var employeeclass = document.querySelector(".EmployeeValue");
  //   console.log(" employeeclass id", employeeclass.getAttribute("id"));
  // }
}
function ShowStoreData(storeDataString) {
  var storeData = JSON.parse(decodeURIComponent(storeDataString));
  console.log(storeData);
  document.querySelector("#popupSale").classList.toggle("active");
  var SalePopUpContainerTable = document.querySelector(
    "#SalePopUpContainerTable"
  );

  SalePopUpContainerTable.innerHTML = `
        <div class="row Sale_1strow bg-light">
        <div class="col"> Store id</div>
        <div class="col"> Store storeName </div>
        <div class="col">Store storeShortName</div>
      </div> `;

  for (var i = 0; i < storeData.length; i++) {
    SalePopUpContainerTable.innerHTML += `
                  <div class="row" onclick="tableValueForStores(event)">
                  <div class="col ">${storeData[i].storeId}</div>
                  <div class="col">  ${storeData[i].storeName}</div>
                  <div class="col">  ${storeData[i].storeShortName}</div>
                 </div>
                  `;
  }

  const RemarksDetails = document.querySelector(".remarks input").value;
  const discountAmount = document.querySelector(".discountAmount input").value;
  console.log(
    "remarks details::  discountAmount",
    RemarksDetails,
    discountAmount
  );
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
    // console.log(" ashsee ", DataArray[i].clientName);
    if (x == 1) {
      select_div.innerHTML += `<p class="ClientValue" id= ${DataArray[i].clientId} > ${DataArray[i].clientName}</p>`;
    } else if (x == 2) {
      select_div.innerHTML += `<p class="EmployeeValue" id= ${DataArray[i].employeeId}> ${DataArray[i].employeeName}</p>`;
    }
  }
}

// function AddInnerHtmlOfClientSelect(SalesfieldDataArray) {
//   console.log("Add Inner  Html  Of  Select ", SalesfieldDataArray);

//   var select_div = document.querySelector(".ClientNameDiv");
//   console.log(SalesfieldDataArray, "test");
//   for (let i = 0; i < SalesfieldDataArray.length; i++) {
//     console.log(" ashsee ", SalesfieldDataArray[i].employeeFullName);
//     select_div[0].innerHTML += `<p> ${SalesfieldDataArray[i].ClientName}</p>`;
//   }
// }

// function AddInnerHtmlOf_SaleTypes_Select(SalesfieldDataArray) {
//   console.log("Add Inner  Html  Of  Select ", SalesfieldDataArray);
//   var select_div = document.querySelector(".SalesTypeSelectDiv");
//   console.log(" worked ");
//   // var select_div = document.querySelector(".SalesTypeSelectDiv");
//   console.log(SalesfieldDataArray, "test");
//   for (let i = 0; i < SalesfieldDataArray.length; i++) {
//     // console.log(" ashsee ", SalesfieldDataArray[i].employeeFullName);
//     // select_div.innerHTML += `<p> ${SalesfieldDataArray[i].ClientName}</p>`;
//     select_div.innerHTML += `<p> ${SalesfieldDataArray[i].ClientId}</p>`;
//   }
// }

function SalePopupFunction() {
  document.querySelector("#popupSale").classList.toggle("active");
}

function SalePopupFunction2() {
  document.querySelector("#popupSale").classList.toggle("active");
}

document.querySelector("#SalePopUpclose").onclick = () => {
  document.querySelector("#popupSale").classList.remove("active");
};

function Saledropdown(
  event,
  divClass,
  displayNonedivNAme,
  ParqagarphClassName
) {
  //getting  the p tag  value
  let dropDownValue = event.target.innerHTML;

  let dropDownId = event.target.getAttribute("id");
  let dropDownclass = event.target.getAttribute("class");
  console.log("dropDownclass", dropDownclass);
  console.log("dropDownId", dropDownId);
  console.log(dropDownValue);
  var clientinput = document.querySelector(divClass);
  clientinput.value = dropDownValue;
  clientinput.setAttribute("id", dropDownId);
  document.querySelector(displayNonedivNAme).style.display = "none";
  console.log(" id", clientinput.getAttribute("id"));
}

//checking the field is null or not

function addBottomFieldRow(GoodsString, event) {


  var GoodsData = JSON.parse(decodeURIComponent(GoodsString));
  console.log("Goodstring AddBottomFieldRow ", GoodsData);
  const salesOrderIdInput = document.querySelector(".SalesOrderId").value;

  console.log("salesOrderIdValue", salesOrderIdInput);

  var salesOderID = document.querySelector(".SalesOrderNo").value;
  var OderDate = document.querySelector(".SalesOrderDate").value;
  var Client = document.querySelector(".SalesOrderClient").value;
  var SalesPerson = document.querySelector(".SalesOrderPerson").value;
  var SalesType = document.querySelector(".SalesOrderSalesType").value;
  var StoreName = document.querySelector(".SalesOrderStoreName").value;
  


  // const detailstableRow = document.querySelectorAll(".detailstableRow");
  // console.log("lengthsdfjh",detailstableRow);

  AddBottomFieldRowdata(GoodsData);  // it will be in if condition..... when it truned in comminting. 

//validation for giving row creation 

  // if (
  //   detailstableRow.length > 0 && // Check if there is at least one row
  //   (detailstableRow[detailstableRow.length - 1].querySelector(".goodsName").textContent === "Nut" 
  //   ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".UnitSetId input").value.trim() === "" 
  //   ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".UnitId input").value.trim() == "" ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".StockQuantity").textContent == "" ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".Quantity input").value.trim() == "" ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".Rate input").value.trim() == "" ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".discountPcts input").value == "" ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".discountAmount input").value.trim() == "" ||
  //   detailstableRow[detailstableRow.length - 1].querySelector(".remarks input").value.trim() == "")
  // ){
  //   alert("Fill the row");
  // } else {
  //   AddBottomFieldRowdata(GoodsData);
  // }
  

  // if (
  //   salesOrderIdInput != "" &&
  //   salesOderID != "" &&
  //   OderDate != "" &&
  //   Client != "" &&
  //   SalesPerson != "" &&
  //   SalesType != "" &&
  //   StoreName != ""
  // ) {
  //   alert("it works");
  //   AddBottomFieldRow();
  // } else {
  //   alert("fill the input please");
  // }


  // selectedRow(event)



}

//by shihab
function AddBottomFieldRowdata(GoodsData) {
  var bottomField = document.querySelector(".bottomField");

  // Create a new row element
  var newRow = document.createElement("div");
  newRow.className = "row bottomRow detailstableRow rowSelection ";


  newRow.innerHTML = `
    <div class="col col-auto" onclick="ShowGoodsData('${encodeURIComponent(
      JSON.stringify(GoodsData)
    )}')">
      <i class="fa-solid fa-magnifying-glass SalesBottomFieldSearchIcon  SalesBottomFieldSearchIconColor"></i>
    </div>
    <div class="col bottomCol col-2 goodsName" id="GoodsInput">Nut</div>
    <div class="col bottomCol UnitSetId"><input type="text" /></div>
    <div class="col bottomCol UnitId"><input type="text"  value="Pcs" /></div>
    <div class="col bottomCol StockQuantity"></div>
    <div class="col bottomCol Quantity"><input type="text" /></div>
    <div class="col bottomCol Rate"><input type="text" /></div>
    <div class="col bottomCol discountPcts"><input type="text" class="discountPct " value="0" /></div>
    <div class="col bottomCol discountAmount"><input type="text" value="0" /></div>
    <div class="col bottomCol totalValue"></div>
    <div class="col bottomCol remarks"> <input  type ="text" value = " "></div>
  `;

  bottomField.appendChild(newRow);

  // Get the input fields and relevant divs within the new row
  const quantityInput = newRow.querySelector(".Quantity input");
  const rateInput = newRow.querySelector(".Rate input");
  const discountInput = newRow.querySelector(".discountPct");
  const discountAmountInput = newRow.querySelector(".discountAmount input");
  const totalValueDiv = newRow.querySelector(".totalValue");

  // Add event listeners to the quantity, rate, and discount input fields
  quantityInput.addEventListener("input", calculateTotal);
  rateInput.addEventListener("input", calculateTotal);
  discountInput.addEventListener("input", calculateTotal);

  // Function to calculate the total and discount amount
  function calculateTotal() {
    // Get the values from the quantity, rate, and discount input fields
    const quantity = parseFloat(quantityInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;

    // Calculate the total value and discount amount
    const totalValue = quantity * rate;
    const discountAmount = totalValue * (discount / 100);
    if (discount > 0) {
      const totalValueAfterDiscount = totalValue - discountAmount;
      totalValueDiv.textContent = totalValueAfterDiscount.toFixed(2);
      discountAmountInput.value = discountAmount.toFixed(2);
    } else {
      totalValueDiv.textContent = totalValue.toFixed(2);
    }
  }

}









function ShowGoodsData(GoodsString) {
  document.querySelector("#popupSale").classList.toggle("active");
  var GoodsData = JSON.parse(decodeURIComponent(GoodsString));
  console.log("Goodstring", GoodsData);
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

  for (var i = 0; i < GoodsData.length; i++) {
    SalePopUpContainerTable.innerHTML += `
                  <div class="row goodRow"  onclick="tableValueForGoods(event,${GoodsData[i].goodsId},'${GoodsData[i].goodsName}', ${GoodsData[i].approveQty})">
                  <div class="col">  ${GoodsData[i].goodsId}</div>
                  <div class="col d-none">  ${GoodsData[i].approveQty}</div>
                  <div class="col"> - </div>
                  <div class="col">  ${GoodsData[i].goodsName}</div>
                 </div>
                  `;
  }
}




function tableValueForGoods(event, goodsId, goodsName, StockQuantity) {

  selectedRow(event);
  console.log("Clicked goodsId:", goodsId);
  console.log("Clicked goodsName:", goodsName);
  console.log("Clicked StockQuantity:", StockQuantity);
  const BottomRows = document.querySelectorAll(".bottomRow");

  var GoodsNameColumn = document.querySelectorAll(".goodsName");
  var StockQuantityColumn = document.querySelectorAll(".StockQuantity");

  GoodsNameColumn[GoodsNameColumn.length - 1].innerText = goodsName;
  StockQuantityColumn[StockQuantityColumn.length - 1].innerText = StockQuantity;
  GoodsNameColumn[GoodsNameColumn.length - 1].setAttribute("id", goodsId);
}
// deleting the row


// =========================working heree ........... to delete row

// function deleteBottomFielOneRow(event) {
//   // Assuming you have a button with a class "deleteButton" that triggers the row deletion
//   const deleteButton = document.querySelector(".deleteBtn");

//   // Add event listener to the delete button
//   deleteButton.addEventListener("click", function(event){
//      // Function to delete the last row
  
//      const rows = document.querySelectorAll(".row");
//      const lastRow = rows[rows.length - 1];
 
//      // Remove the last row element from the DOM
//      if (lastRow) {
//        lastRow.remove();
//      }

//   });
  

 


//   console.log("fsdahsfdhdf");
// }

// const deleteButton = document.querySelector(".deleteBtn");
// deleteButton.addEventListener("click", function(event){

//   console.log("hfdhsfgdh click");
//   const rows = document.querySelectorAll(".row");
//   const lastRow = rows[rows.length - 1];
//   if (lastRow) {
//            lastRow.remove();
//          }
//   });
    

// last row geting changed.........
function deleteRowlast() {

  const rows = document.querySelectorAll(".bottomRow");
  console.log("bottomRow", rows);
  console.log("rows.length", rows.length);
  const lastRow = rows[rows.length - 1];
  if (lastRow) {
    // lastRow.remove();
    lastRow.style.backgroundColor = "red";  
  }

}






// function deleteBottomFielOneRow() {
//  // Assuming you have a button with a class "deleteButton" that triggers the row deletion
//   const deleteButton = document.querySelector(".deleteBtn");

//   // Add event listeners to the delete buttons
//   deleteButton.addEventListener("click", deleteRow);

//   // Function to handle the delete event
//   function deleteRow(event) {
//     const button = event.target;
//     const row = button.closest(".row");

//     // Create a <delete> element
//     const deleteElement = document.createElement("del");
//     deleteElement.textContent = "Delete";

//     // Replace the row element with the <delete> element
//     row.parentNode.replaceChild(deleteElement, row);
//   }

//   console.log("fsdahsfdhdf");
// }












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
                    <div class="row" onclick="tableValueForSalesOffer(event)" >
                    <div class="col">  ${SalesOffer[i].SalesOfferMasterId}</div>
                    <div class="col">  ${SalesOffer[i].SalesOfferDisplayNo}</div>
                    <div class="col">  ${SalesOffer[i].SalesOfferDate}</div>
                   </div>
                    `;
    }
  }
}

function CreateNewSalesOrder() {
  console.log("fhdsgfshdg");
  document.querySelector(".SalesOrderId").placeholder = "****<< NEW >>****";
  document.querySelector(".SalesOrderNo").placeholder = "****<< NEW >>****";

  Clear();

}

// saved marufa.........................

function saveData() {
  const obj = [];
  const objDetails = [];
  // Sales Order Master
  var SalesOrderMasterId = document.querySelector(".SalesOrderId").value;
  var DisplayNo = document.querySelector(".SalesOrderNo").value;
  var SalesOrderDate = document.querySelector(".SalesOrderDate").value;
  var ClientId = document.querySelector(".clientinput").getAttribute("id");
  var SalesOfferMasterId = document.querySelector(".SalesOrderOffer").value;
  var EmployeeId = document
    .querySelector(".SalePersonButton")
    .getAttribute("id");
  var SalesType = document.querySelector(".SalesTypeButton").value;
  var DiscountAmount = document.querySelector(".discountInput").value;
  var DiscountPercent = document.querySelector(
    ".discountPercentageInput"
  ).value;
  var Remarks = document.querySelector("#myTextArea").value;
  var StoreId = document.querySelector(".storeNameInput").value;
  const SalesOfferDetailsId = document.querySelector(".SalesOrderOffer").value;
  const UnitSetId = 1;
  const UnitId = 1;
  const DiscountPercentDetails = 6;
  const DiscountAmountDetails = document.querySelector(
    ".discountAmount input"
  ).value;
 // DiscountAmount = 0;
  console.log("remarks", Remarks);
  obj.push({
    SalesOrderMasterId,
    DisplayNo,
    SalesOrderDate,
    ClientId,
    SalesOfferMasterId,
    EmployeeId,
    SalesType,
    DiscountAmount,
    DiscountPercent,
    Remarks,
    StoreId,
  });
  //  salesOrder Details
  const GoodsDefinitionId = document
    .querySelector(".goodsName")
    .getAttribute("id");
  const BottomRows = document.querySelectorAll(".bottomRow");
  const dat = [];
  console.log(BottomRows);
  for (let i = 0; i < BottomRows.length; i++) {
    const BottomCols = BottomRows[i].querySelectorAll(".bottomCol");
    const GoodsName = BottomCols[0].innerText;
    const SalesOrderQtyInput = BottomCols[4].querySelector("input");
    const SalesOrderQty = SalesOrderQtyInput ? SalesOrderQtyInput.value : "";
    const SalesOrderRateInput = BottomCols[5].querySelector("input");
    const SalesOrderRate = SalesOrderRateInput ? SalesOrderRateInput.value : "";
    const DiscountPercentDetailsInput = BottomCols[6].querySelector("input");
    const DiscountPercentDetails = DiscountPercentDetailsInput
      ? DiscountPercentDetailsInput.value
      : "";
    const DiscountAmountDetailsInput = BottomCols[7].querySelector("input");
    const DiscountAmountDetails = DiscountAmountDetailsInput
      ? DiscountAmountDetailsInput.value
      : "";
    const RemarksInput = BottomCols[9].querySelector("input");
    const RemarksDetails = RemarksInput ? RemarksInput.value : "";
    objDetails.push({
      SalesOrderMasterId,
      SalesOfferDetailsId,
      GoodsDefinitionId,
      RemarksDetails,
      DiscountAmountDetails,
      DiscountPercentDetails,
      SalesOrderQty,
      SalesOrderRate,
      UnitSetId,
      UnitId,
      StoreId,
      GoodsName,
    });
  }

  const formData = new FormData();
  formData.append("NewOrderMasterData", JSON.stringify(obj));
  formData.append("DetailsData", JSON.stringify(objDetails));
  formData.append("SalesDetailsData", JSON.stringify(objDetails)); // Append the SalesDetailsData to the FormData
  console.log("master:", obj);
  console.log("details", objDetails);
  // ...
  fetch("https://localhost:7160/api/SalesOrder/NewOrderMaster", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Data Added!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  Clear();
}

function Clear() {
  // Sales Order Master
  // SalesOrderMasterId
  // document.querySelector(".SalesOrderId").placeholder = " ";
  // document.querySelector(".SalesOrderNo").placeholder = " ";
  document.querySelector(".SalesOrderId").value = "";
  // DisplayNo
  document.querySelector(".SalesOrderNo").value = "";
  // SalesOrderDate
  document.querySelector(".SalesOrderDate").value = "";
  //ClientId
  document.querySelector(".clientinput").value = "";

  // SalesOfferMasterId
  document.querySelector(".SalesOrderOffer").value = "";
  // EmployeeId
  document.querySelector(".SalePersonButton").value = "";

  // SalesType
  document.querySelector(".SalesTypeButton").value = "";

  // DiscountAmount
  document.querySelector(".discountInput").value = "";

  // DiscountPercent
  document.querySelector(".discountPercentageInput").value = "";

  // Remarks
  document.querySelector("#myTextArea").value = "";
  // StoreId
  document.querySelector(".storeNameInput").value = "";

  //SalesOfferDetailsId
  document.querySelector(".SalesOrderOffer").value = "";


  bottomClear();


}

//  bottom rows will be clear.......

function bottomClear(){

    const BottomRows = document.querySelectorAll(".bottomRow");

    console.log("bottom rows length:  " , BottomRows.length);

    for (let i = 0; i < BottomRows.length; i++) {
    BottomRows[i].remove();
    }

}





// end===============================






function addDataToMasterTable() {}

function displayOldData() {
  const displayMasterTableData = [];
  var id = 1;
  fetch(`https://localhost:7160/api/SalesOrder/GetOldSalesOrder/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(" oldData", data);
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
          obj.ClientName = item.clientName;
          obj.EmployeeName = item.employeeName;
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

    //client anme
    var SalesOrderClient = document.querySelector("#SalesOrderClient");
    SalesOrderClient.value = displayMasterTableData[0].ClientName;
    //emplyeename
    var SalesOrderPerson = document.querySelector("#SalesOrderPerson");
    SalesOrderPerson.value = displayMasterTableData[0].EmployeeName;
    //storeName

    // var salesOrderSalesType = document.querySelector(".SalesOrderSalesType");

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
  // tableValueForGoods(event);

  tableValueForStores(event);

  // tableValueForSalesOrder(event);

  //  tableValueForSalesOffer(event);

  document.querySelector("#popupSale").classList.remove("active");
}

// goods popup selected value.

// Store Name popup selected value.
function tableValueForStores(event) {
  let clickedRow = event.target.closest(".row");
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(
      clickedRow
    );
    let rowValues = Array.from(clickedRow.children).map(
      (column) => column.innerHTML
    );
    console.log("Row Values:", rowValues);
    console.log("Row Number:", rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll(".row.selected");
    selectedRows.forEach((row) => row.classList.remove("selected"));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add("selected");

    var storeNameInput = document.querySelector(".storeNameInput");
    console.log("store: ", storeNameInput);

    storeNameInput.value = rowValues[0];
  } else {
    console.log("No matching row found");
  }
}

// SalesOrderId

function tableValueForSalesOrder(event, masterId) {


 
  let clickedRow = event.target.closest(".row");
  if (clickedRow) {
    bottomClear();
    // console.log("masterId",masterId);
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(
      clickedRow
    );
    let rowValues = Array.from(clickedRow.children).map(
      (column) => column.innerHTML
    );
    console.log("Row Values:", rowValues);
    console.log("Row Number:", rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll(".row.selected");
    selectedRows.forEach((row) => row.classList.remove("selected"));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add("selected");

    

    var SalesOrder = document.querySelector(".SalesOrderId");
    console.log("store: ", SalesOrder);

    SalesOrder.value = rowValues[1];

    // const salesOrderId = 'SOM-0053'; // id marufa theke
    const salesOrderId = SalesOrder.value;
    console.log("salesOrderId hfdshj", salesOrderId);
    // Replace with the sales order ID

    fetch(
      `https://localhost:7160/api/SalesOrder/GetOldSalesOrder/${salesOrderId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(" master data:", data);

        // for geting sales Master data

        // var DisPlayno = document.querySelector(".SalesOrderNo");
        // DisPlayno.value = data[0].displayNo;

        var value = data[0].salesOrderDate;
        console.log("dsahgshdag date", value);
        var date = new Date(value);
        var formattedDate = date.toISOString().split("T")[0];
        console.log("fgjfhdgj newDate: ", formattedDate);

        var SalesOrderDate = document.querySelector(".SalesOrderDate");
        SalesOrderDate.value = formattedDate;

        var ClientId = document.querySelector(".clientinput");
        ClientId.value = data[0].clientName;

        var SalesOfferMasterId = document.querySelector(".SalesOrderOffer");
        SalesOfferMasterId.value = data[0].salesOfferMasterId;
        var SalesOrderPerson = document.querySelector(".SalesOrderPerson");

        SalesOrderPerson.value = data[0].employeeName;
        // var EmployeeId = document
        // .querySelector(".SalePersonButton")
        // .getAttribute("p");

        var SalesType = document.querySelector(".SalesTypeButton");
        SalesType.value = data[0].salesType;

        var StoreId = document.querySelector(".storeNameInput");
        StoreId.value = data[0].storeId;

        // const UnitSetId = data[0].salesOrderDetails[0].UnitSetId;
        // console.log("unite set id : ",UnitSetId);

        // data[i].salesOrderDetails[i].UnitSetId;

        var details = data[i].salesOrderDetails;

        console.log("details sale", details);
        console.log("data", data.length);

        var bottomField = document.querySelector(".bottomField");
        for (let i = 0; i < data.length; i++) {
          var details = data[i].salesOrderDetails;
          for (var j = 0; j < details.length; j++) {
            var detail = details[j];
            // AddBottomFieldRowdata(GoodsData);
            console.log("bottom row coming.......");

            // Create a new row element
            var newRow = document.createElement("div");
            newRow.className = "row bottomRow";

            newRow.innerHTML = `
            <div class="col col-auto" onclick="ShowGoodsData('${encodeURIComponent(
              JSON.stringify()
            )}')">
              <i class="fa-solid fa-magnifying-glass SalesBottomFieldSearchIcon  SalesBottomFieldSearchIconColor"></i>
            </div>
            <div class=" col col-2 detailCol">${detail.goodsName}</div>
            <div class="col detailCol">${detail.unitSetId}</div>
            <div class="col detailCol">${detail.unitId}</div>
            <div class="col detailCol">${20}</div>
            <div class="col detailCol">${detail.salesOrderQty}</div>
            <div class="col detailCol">${detail.salesOrderRate}</div>
            <div class="col detailCol">${detail.discountPercentDetails}</div>
            <div class="col detailCol">${detail.discountAmountDetails}</div>
            <div class="col detailCol"></div>
            <div class="col detailCol">${detail.remarksDetails}</div>
          `;

            bottomField.appendChild(newRow);
          }
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  } else {
    console.log("No matching row found");
  }


}





// function tableValueForSalesOrder(event, masterId) {
//   let clickedRow = event.target.closest(".row");
//   if (clickedRow) {
//     // console.log("masterId",masterId);
//     let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(
//       clickedRow
//     );
//     let rowValues = Array.from(clickedRow.children).map(
//       (column) => column.innerHTML
//     );
//     console.log("Row Values:", rowValues);
//     console.log("Row Number:", rowNumber);
//     // Remove the 'selected' class from any previously selected rows
//     let selectedRows = document.querySelectorAll(".row.selected");
//     selectedRows.forEach((row) => row.classList.remove("selected"));
//     // Add the 'selected' class to the clicked row
//     clickedRow.classList.add("selected");
//     var SalesOrder = document.querySelector(".SalesOrderId");
//     console.log("store: ", SalesOrder);
//     SalesOrder.value = rowValues[1];
//     // const salesOrderId = 'SOM-0053'; // id marufa theke
//     const salesOrderId = SalesOrder.value;
//     console.log("salesOrderId hfdshj", salesOrderId);
//     // Replace with the sales order ID
//     // ...
//     fetch(
//       `https://localhost:7160/api/SalesOrder/GetOldSalesOrder/${salesOrderId}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("master data:", data);
//         console.log("data length:", data.length);
//         // ... other code ...
//         for (let i = 0; i < data.length; i++) {
//           var details = data[i].salesOrderDetails;
//           console.log("details sale", details);
//           console.log("details length: ", details.length);
//           var bottomField = document.querySelector(".bottomField");
//           for (var j = 0; j < details.length; j++) {
//             var detail = details[j];
//             // AddBottomFieldRowdata(GoodsData);
//             console.log("bottom row coming.......");
//             // Create a new row element
//             var newRow = document.createElement("div");
//             newRow.className = "row bottomRow";
//             newRow.innerHTML = `
//           <div class="col col-auto" onclick="ShowGoodsData('${encodeURIComponent(
//             JSON.stringify()
//           )}')">
//             <i class="fa-solid fa-magnifying-glass SalesBottomFieldSearchIcon  SalesBottomFieldSearchIconColor"></i>
//           </div>
//           <div class=" col col-2 detailCol">${detail.goodsName}</div>
//           <div class="col detailCol">${detail.unitSetId}</div>
//           <div class="col detailCol">${detail.unitId}</div>
//           <div class="col detailCol">${20}</div>
//           <div class="col detailCol">${detail.salesOrderQty}</div>
//           <div class="col detailCol">${detail.salesOrderRate}</div>
//           <div class="col detailCol">${detail.discountPercentDetails}</div>
//           <div class="col detailCol">${detail.discountAmountDetails}</div>
//           <div class="col detailCol"></div>
//           <div class="col detailCol">${detail.remarksDetails}</div>
//         `;
//             bottomField.appendChild(newRow);
//           }
//         }
//       })
//       .catch((error) => {
//         // Handle any errors that occurred during the request
//         console.error(error);
//       });
//   } else {
//     console.log("No matching row found");
//   }
// }

//  Showing Popup...

function DisplaySaleMasterData(MasterData) {
  //console.log("function working..........");
  document.querySelector("#popupSale").classList.toggle("active");
  var masterData = JSON.parse(decodeURIComponent(MasterData));
  console.log(masterData);
  var SalePopUpContainerTable = document.querySelector(
    "#SalePopUpContainerTable"
  );
  SalePopUpContainerTable.innerHTML = `
        <div class="row Sale_1strow bg-light">
        <div class="col"> SalesOfferMasterId</div>
        <div class="col "> SalesOderMasterId</div>
        <div class="col">Display No</div>
        <div class="col">SalesOrderDate</div>
      </div> `;
  for (var i = 0; i < masterData.length; i++) {
    SalePopUpContainerTable.innerHTML += `
                  <div class="row" onclick="tableValueForSalesOrder(event)">
                  <div class="col">  ${masterData[i].salesOfferMasterId}</div>
                  <div class="col ">${masterData[i].salesOrderMasterId}</div>
                  <div class="col">  ${masterData[i].displayNo}</div>
                  <div class="col">  ${masterData[i].salesOrderDate}</div>
                 </div>
                  `;
  }
}

// SalesOffre
function tableValueForSalesOffer(event) {
  let clickedRow = event.target.closest(".row");
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(
      clickedRow
    );
    let rowValues = Array.from(clickedRow.children).map(
      (column) => column.innerHTML
    );
    console.log("Row Values:", rowValues);
    console.log("Row Number:", rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll(".row.selected");
    selectedRows.forEach((row) => row.classList.remove("selected"));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add("selected");

    var SalesOfferInput = document.querySelector(".SalesOfferInput");
    console.log("store: ", SalesOfferInput);

    SalesOfferInput.value = rowValues[0];
  } else {
    console.log("No matching row found");
  }
}




function selectedRow(event){
  let clickedRow = event.target.closest(".row");
  if (clickedRow) {
    let rowNumber = Array.from(clickedRow.parentNode.children).indexOf(
      clickedRow
    );
    let rowValues = Array.from(clickedRow.children).map(
      (column) => column.innerHTML
    );
    console.log("Row Values:", rowValues);
    console.log("Row Number:", rowNumber);

    // Remove the 'selected' class from any previously selected rows
    let selectedRows = document.querySelectorAll(".row.selected");
    selectedRows.forEach((row) => row.classList.remove("selected"));

    // Add the 'selected' class to the clicked row
    clickedRow.classList.add("selected");

  }

}



// Sales Order

function GetingAllSalesOrder() {
  document.querySelector("#popupSale").classList.toggle("active");

  //console.log("okay");
  fetch(`https://localhost:7160/api/SalesOrder/GetSalesOrder`)
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
        console.log("store data: ", SalesOrder);
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
                    <div class="row" onclick="tableValueForSalesOrder(event,  ${SalesOrder[i].SalesOfferMasterId}) ">
                    <div class="col">  ${SalesOrder[i].SalesOfferMasterId}</div>
                    <div class="col">  ${SalesOrder[i].DisplayNo}</div>
                    <div class="col">  ${SalesOrder[i].SalesOrderDate}</div>
                   </div>
                    `;
    }
  }
}
