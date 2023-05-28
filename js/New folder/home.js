const dataArray = [];

const pageArray = [];
fetch("http://localhost:82/GetAllMenuList")
  .then((response) => response.json())
  .then((data) => {
    // Initialize the array
    console.log(data);
    // Loop through the data and create objects
    data.forEach((item) => {
      const obj = {};
      const obj2 = {};
      obj.menuId = item.menu_ID;
      obj.menuName = item.menu_Name;
      obj.parentID = item.parent_ID;
      obj.pageName = item.page_Name;
      obj2.pageName = item.page_Name;
      pageArray.push(obj2);

      dataArray.push(obj);
    });
    // done();
    var x = 0;
    displaydata(x);
    // console.log("Page array: ", pageArray);
  });

function displaydata(x) {
  let side_parent = document.getElementById("side-parent");
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].menuId == dataArray[i].parentID) {
      let btn = document.createElement("button");
      btn.className = "accordion";
      let fspan = document.createElement("span");
      let ficon = document.createElement("i");
      ficon.className = "fa-solid fa-check-to-slot icon-accordion";
      let sspan = document.createElement("span");
      sspan.className = "menu-approval test-menu0";
      sspan.innerText = dataArray[i].menuName;
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

      for (let j = i + 1; j < dataArray.length; j++) {
        if (dataArray[j].parentID == dataArray[i].menuId) {
          // let p = document.createElement("p");

          // // let a = document.createElement("a");
          // // a.innerText = dataArray[j].menuName;
          // // p.appendChild(a);
          // p.innerText = dataArray[j].menuName;
          // // p.addEventListener("click", testfunction);
          // p.onclick = testfunction;

          // // p.onclick = testfunction();
          // child_div.appendChild(p);

          child_div.innerHTML +=
            `<p   class="myDIV" onclick="myFunctionn(${x})" ><a href="#" onclick="displayApproval(` +
            j +
            `)">` +
            dataArray[j].menuName +
            `</a></p>`;
          x++;
        }
      }
      side_parent.appendChild(child_div);
    }
  }

  //on click button
  var acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    console.log(i);
    acc[i].addEventListener("click", function () {
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

        //hiding all page
        // document.querySelector(".requisition-header-display").style.display =
        //   "none";
        // document.querySelector(".RequisitionApplication").style.display =
        //   "none";
        // document.querySelector(".LeaveApplication").style.display = "none";
        // document.querySelector("#approved-page").style.display = "none";
        // document.querySelector("#reject-page").style.display = "none";
        // document.querySelector(".menu-page-header-display").style.display =
        //   "none";
      } else {
        console.log("block");
        panel.style.display = "block";
      }
    });
  }

  // console.log(side_parent);
  // var acc = document.getElementsByClassName("accordion");
  // var i;
  // console.log(acc.length);

  // for (i = 0; i < acc.length; i++) {
  //   // console.log(i);
  //   acc[i].addEventListener("click", function () {
  //     /* Toggle between adding and removing the "active" class,
  //   to highlight the button that controls the panel */
  //     this.classList.toggle("active");

  //     /* Toggle between hiding and showing the active panel */
  //     var panel = this.nextElementSibling;
  //     if (panel.style.display === "block") {
  //       console.log("NONE");
  //       panel.style.display = "none";
  //       // document.querySelector(".home-page").style.display = "block";
  //       // document.querySelector(".new-page").style.display = "none";
  //       // document.querySelector("#approved-page").style.display = "none";
  //       // document.querySelector("#reject-page").style.display = "none";
  //       // document.querySelector(".menu-page-header-display").style.display =
  //       //   "none";
  //     } else {
  //       console.log("block");
  //       panel.style.display = "block";
  //       // document.querySelector(".home-page").style.display = "none";
  //       // document.querySelector(".new-page").style.display = "block";
  //       // pending();

  //       //unchecking the radio button
  //       // radio_button = document.getElementsByName("flexRadioDefault");
  //       // console.log("length", radio_button.length);

  //       // for (var i = 1; i < radio_button.length; i++) {
  //       //   radio_button[i].checked = false;
  //       // }

  //       // document.querySelector(".menu-page-header-display").style.display =
  //       //   "block";
  //     }
  //   });
  // }
}

// function panel_color() {
//   panelP = document.querySelector(".panelp");
//   console.log("panel_ p", panelP);
//   panelp.classList.toggle("activePanel");
// }

function myFunctionn(value) {
  var element = document.getElementsByClassName("myDIV");
  console.log("element", element);
  console.log("valuw", value);
  // element[value].classList.toggle("mystyle");
  for (let i = 0; i < element.length; i++) {
    if (value == i) {
      element[i].style.backgroundColor = "aliceblue";
    } else {
      element[i].style.backgroundColor = "white";
    }
  }
}

function displayApproval(value) {
  console.log("ashsiiiiiiii");
  console.log(value);
  // const page_name = pageArray[value].pageName;
  // const id = selectedAllData[checked_id].ApplicationId;
  // console.log(page_name);
  // document.getElementByClassName(+page_name).style.display = "block";
  var page_name = pageArray[value].pageName;
  console.log("ok");
  document.querySelector(".requisition-header-display").style.display = "none";
  document.querySelector(".RequisitionApplication").style.display = "none";
  document.querySelector(".home-page").style.display = "none";

  if (page_name == "LeaveApplication") {
    pending();
  } else if (page_name == "RequisitionApplication") {
    //activing the new radio button other none
    requisition_pending();
  } else if (page_name == "PurchaseOrder") {
    purchaseOrder_pending();
  } else {
  }
}
function aprrovalFunction(value) {
  console.log(value);
  // var page = document.querySelector();
}
function testfunction() {
  console.log("hIIII");
  document.querySelector(".new-page").style.display = "block";
}

function hidePage() {
  document.querySelector(".menu-page-header-display").style.display = "none";
  document.querySelector("#approved-page").style.display = "none";
  document.querySelector("#reject-page").style.display = "none";
  document.querySelector(".home-page").style.display = "none";
  document.querySelector(".requisition-header-display").style.display = "none";
  document.querySelector(".RequisitionApplication").style.display = "none";
  document.querySelector(".LeaveApplication").style.display = "none";
  document.getElementById("requisition-approved-page").style.display = "none";
  document.getElementById("requisition-rejected-page").style.display = "none";
  document.querySelector(".purchaseOrder").style.display = "none";
  document.querySelector(".purchase-header-display").style.display = "none";
  document.getElementById("purchaseOrder-approved-page").style.display = "none";
  document.getElementById("purchaseOrder-rejected-page").style.display = "none";
  document.getElementById("PO-Report").style.display = "none";
  // document.querySelector(".reportHeader").style.display = "none";
}

//chart data
var chartjson = {
  title: "Acivitics of the employee",
  data: [
    {
      name: "Kerry",
      score: 20,
    },
    {
      name: "Teegan",
      score: 73,
    },
    {
      name: "Jamalia",
      score: 20,
    },
    {
      name: "Quincy",
      score: 89,
    },
    {
      name: "Darryl",
      score: 24,
    },
    {
      name: "Jescie",
      score: 86,
    },
    {
      name: "Quemby",
      score: 46,
    },
    {
      name: "McKenzie",
      score: 71,
    },
  ],
  xtitle: "Secured Marks",
  ytitle: "Marks",
  ymax: 100,
  ykey: "score",
  xkey: "name",
  prefix: "%",
};

//chart colors
var colors = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
];

//constants
var TROW = "tr",
  TDATA = "td";

var chart = document.createElement("div");
//create the chart canvas
var barchart = document.createElement("table");
//create the title row
var titlerow = document.createElement(TROW);
//create the title data
var titledata = document.createElement(TDATA);
//make the colspan to number of records
titledata.setAttribute("colspan", chartjson.data.length + 1);
titledata.setAttribute("class", "charttitle");
titledata.innerText = chartjson.title;
titlerow.appendChild(titledata);
barchart.appendChild(titlerow);
chart.appendChild(barchart);

//create the bar row
var barrow = document.createElement(TROW);

//lets add data to the chart
for (var i = 0; i < chartjson.data.length; i++) {
  barrow.setAttribute("class", "bars");
  var prefix = chartjson.prefix || "";
  //create the bar data
  var bardata = document.createElement(TDATA);
  var bar = document.createElement("div");
  bar.setAttribute("class", colors[i]);
  bar.style.height = chartjson.data[i][chartjson.ykey] + prefix;
  bardata.innerText = chartjson.data[i][chartjson.ykey] + prefix;
  bardata.appendChild(bar);
  barrow.appendChild(bardata);
}

//create legends
var legendrow = document.createElement(TROW);
var legend = document.createElement(TDATA);
legend.setAttribute("class", "legend");
legend.setAttribute("colspan", chartjson.data.length);

//add legend data
for (var i = 0; i < chartjson.data.length; i++) {
  var legbox = document.createElement("span");
  legbox.setAttribute("class", "legbox");
  var barname = document.createElement("span");
  barname.setAttribute("class", colors[i] + " xaxisname");
  var bartext = document.createElement("span");
  bartext.innerText = chartjson.data[i][chartjson.xkey];
  legbox.appendChild(barname);
  legbox.appendChild(bartext);
  legend.appendChild(legbox);
}
barrow.appendChild(legend);
barchart.appendChild(barrow);
barchart.appendChild(legendrow);
chart.appendChild(barchart);
document.getElementById("chart").innerHTML = chart.outerHTML;

//on click button
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  console.log(i);
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      console.log("NONE");
      panel.style.display = "none";
    } else {
      console.log("block");
      panel.style.display = "block";
    }
  });
}
