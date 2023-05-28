// Immediately Invoked Function Expression
// (function() {
//
//   })();

// -----------------------------

(function () {
  const ObjArray = [];
  //    const pageArray = [];

  callApi("Menu", "GetAllMenuList")
    .then((data) => {
      data.forEach((item) => {
        const obj = {};
        //  const obj2 = {};
        obj.menuId = item.menu_ID;
        obj.menuName = item.menu_Name;
        obj.parentID = item.parent_ID;
        obj.pageName = item.page_Name;
        // obj2.pageName = item.page_Name;
        // pageArray.push(obj2);
        ObjArray.push(obj);
      });

      console.log(ObjArray);
      ShowSideMenuData(ObjArray);
    })
    .catch((error) => {
      console.error(error);
    });
})();

// Show Side Menu

function ShowSideMenuData(ObjArray) {
  let childCount = 0;
  let side_parent = document.getElementById("side-parent");

  for (let i = 0; i < ObjArray.length; i++) {
    // console.log(i);
    if (ObjArray[i].menuId == ObjArray[i].parentID) {
      let btn = document.createElement("button");
      btn.className = "accordion";
      let fspan = document.createElement("span");
      let ficon = document.createElement("i");
      ficon.className = "fa-solid fa-check-to-slot icon-accordion";
      let sspan = document.createElement("span");
      sspan.className = "menu-approval test-menu0";
      sspan.innerText = ObjArray[i].menuName;
      let drop_icon = document.createElement("i");
      drop_icon.className = "fa-solid fa-angle-down icon-down";

      fspan.appendChild(ficon);
      fspan.appendChild(sspan);

      btn.appendChild(fspan);
      btn.appendChild(drop_icon);

      side_parent.appendChild(btn);

      //  for child
      let child_div = document.createElement("div");
      child_div.className = "panel ";

      for (let j = i + 1; j < ObjArray.length; j++) {
        if (ObjArray[j].parentID == ObjArray[i].menuId) {
          child_div.innerHTML +=
            `<p   class="myDIV" onclick="ColorAndChild(${childCount},${j},'${ObjArray[j].pageName}')">` +
            ObjArray[j].menuName +
            `</p>`;
          childCount++;
        }
      }
      side_parent.appendChild(child_div);
    }
  }
  // console.log(side_parent);

  (function () {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
      // console.log(i);
      acc[i].addEventListener("click", function () {
        document.getElementById("PO-Report").style.display = "none";
        /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          console.log("NONE");
          panel.style.display = "none";
          hidePage();
          document.querySelector(".home-page").style.display = "block";
          document.getElementById("ApplicationPage").style.display = "none";
          document.querySelector(".menu-page-header-design").style.display =
            "none";
        } else {
          console.log("block");
          panel.style.display = "block";
        }
      });
    }
  })();
}

function ColorAndChild(childCount, childIndex, pageName) {
  ChangeMenuColor(childCount);
  ShowChild(childIndex, pageName);
}

// change color

function ChangeMenuColor(value) {
  var element = document.getElementsByClassName("myDIV");
  for (let i = 0; i < element.length; i++) {
    if (value == i) {
      element[i].style.backgroundColor = "aliceblue";
    } else {
      element[i].style.backgroundColor = "white";
    }
  }
}

function ShowChild(value, pageName) {
  if (pageName == "LeaveApproval") {
    LeaveApplicationMutualFunction();
  } else if (pageName == "RequisitionApplication") {
    RequisitionMutualFunction();
  } else if (pageName == "PurchaseOrder") {
    PurchaseOrderMutualFunction();
  } else if (pageName == "RateCollection") {
    RateCollectionMutualFunction();
  } else if (pageName == "MaterialStock") {
    MaterialStockMutualFunction();
  } else if (pageName == "LeaveApplication") {
    createApplication();
  }
  else if (pageName == "SalesOder") {
    SalesOrderMutualFunction();
  }
}
