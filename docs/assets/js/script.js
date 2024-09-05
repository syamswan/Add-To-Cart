const offerCount = 3;
let popularity = "Most Popular";
const popularityId = 2;

let selectedId = 0;
let selectedObj = {};

const cardData = [
  {
    id: 1,
    offerType: "Buy 1 Get 2",
    priceMoney: "$18.00 USD",
    offPercent: "30",
    sizes: ["M", "L"],
    colors: ["white", "red"],
  },
  {
    id: 2,
    offerType: "Buy 2 Get 4",
    priceMoney: "$24.00 USD",
    offPercent: "30",
    sizes: ["L", "L"],
    colors: ["red", "white"],
  },
  {
    id: 3,
    offerType: "Buy 3 Get 6",
    priceMoney: "$36.00 USD",
    offPercent: "10",
    sizes: ["L", "M"],
    colors: ["white", "white"],
  },
];

cardLoad();
eventListener();

function eventListener() {
  radioClickCard();

  document.getElementById("addToCart").addEventListener("click", function () {
    selectedObj = cardData[selectedId];

    const displayData =
      "Applied Offer = " +
      selectedObj.offerType +
      " Total Offer = " +
      selectedObj.priceMoney +
      " Selected Sizes = " +
      selectedObj.sizes.toString() +
      " Selected Colours = " +
      selectedObj.colors.toString();
    alert(displayData);
  });
}

function cardLoad() {
  let htmlElement = document.getElementById("subCardsList");

  for (let i = 0; i < offerCount; i++) {
    const subCardsAppend = ` <div class = "card-lists">
                          <div class="sub-cards main-cards" id="main_${
                            cardData[i].id
                          }" class="addMain">
                          <span class="order-offer-price">
                          ${cardData[i].offPercent}% <br> Off
                          </span>
                          <span style="display: flex; align-items: center; padding:20px;">
                          <input type="radio" id="radioBtn_main_${
                            cardData[i].id
                          }" name="example" value=${cardData[i].id}>
                          <span style="margin-left: 10px;">
                          ${cardData[i].offerType} 
                          <br>
                          <b style="margin-top: 10px;">${
                            cardData[i].priceMoney
                          } </b>
                          </span>
                          ${
                            popularityId == cardData[i].id
                              ? '<span class="popularity">' +
                                popularity +
                                "</span>"
                              : ""
                          }
                          </span>
                          </div>
                            ${detailedView(i)}
                          </div>
                          </div>
                          `;

    htmlElement.innerHTML += subCardsAppend;
  }

  initialSelectedCard();
}

function radioClickCard() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  let totalChargeElement = document.getElementById("totalCharge");

  radioButtons.forEach((radioBtn) => {
    radioBtn.addEventListener("click", (event) => {
      document.getElementById(`detailedcheck_${radioBtn.value}`).checked = true;

      radioButtons.forEach((ele) => {
        document
          .getElementById(`main_${ele.value}`)
          .classList.remove("removeMain");
        document.getElementById(`main_${ele.value}`).classList.add("addMain");

        document
          .getElementById(`detailedContent_${ele.value}`)
          .classList.remove("addDetailed");
        document
          .getElementById(`detailedContent_${ele.value}`)
          .classList.add("removeDetailed");
      });

      selectedId = radioBtn.value - 1;

      const mainCardElement = document.getElementById(`main_${radioBtn.value}`);
      const detailedCardElement = document.getElementById(
        `detailedContent_${radioBtn.value}`
      );

      mainCardElement.classList.remove("addMain");
      mainCardElement.classList.add("removeMain");

      detailedCardElement.classList.remove("removeDetailed");
      detailedCardElement.classList.add("addDetailed");

      totalChargeElement.innerHTML = `Total : <b>${
        cardData[radioBtn.value - 1].priceMoney
      } </b> `;
    });
  });
}

function initialSelectedCard() {
  document.getElementById(`detailedcheck_1`).checked = true;

  const mainCardElement = document.getElementById(`main_1`);
  const detailedCardElement = document.getElementById(`detailedContent_1`);

  mainCardElement.classList.remove("addMain");
  mainCardElement.classList.add("removeMain");

  detailedCardElement.classList.remove("removeDetailed");
  detailedCardElement.classList.add("addDetailed");

  document.getElementById(
    "totalCharge"
  ).innerHTML = `Total : <b>${cardData[0].priceMoney} </b>`;
}

function detailedView(i) {
  return `  <div id="detailedContent_${
    cardData[i].id
  }" class="removeDetailed detailed-cards">

  <div class="sub-cards">
  <span>
  <input type="radio" class="detailed-check" id="detailedcheck_${
    cardData[i].id
  }" name="detailed" value=${cardData[i].id}>
  <span style="margin-left: 5px;">
  ${cardData[i].offerType} 
  
  <span class="offer-detailed"> ${cardData[i].offPercent}% Off </span>

  ${
    popularityId == cardData[i].id
      ? '<span class="popularity">' + popularity + "</span>"
      : ""
  }
  <br>
  <b style="margin-top: 10px; margin-left: 30px;">  ${
    cardData[i].priceMoney
  } </b>
  </span>
  </span>

  <table> 
  <thead>
   <tr>
     <th> </th>
     <th>Size</th>
     <th>Colour</th>
   </tr>
   <thead>
   <tbody>
      ${sizeColorTable(cardData[i].sizes, cardData[i].colors, cardData[i].id)}
   </tbody>   
  </table>`;
}

function sizeColorTable(sizes, colors, id) {
  let tableData = "";

  for (let i = 0; i < sizes.length; i++) {
    tableData += `
                         <tr id="tbody_${id}">
                           <td>#${i + 1}</td>
                           <td>
                           <div class="select-field">
                             <select id="selectSize_${i}_${id}" onchange="updateSize(${i}, ${id})">
                               <option value ="M" ${
                                 sizes[i] === "M" ? "selected" : ""
                               }> M </option>
                               <option value ="L" ${
                                 sizes[i] === "L" ? "selected" : ""
                               }> L </option>
                             <select/>
                             <div>
                            </td>
                           <td>
                           <div class="select-field">
                           <select id="selectColor_${i}_${id}" onchange="updateColor(${i}, ${id})">
                               <option value ="red" ${
                                 colors[i] === "red" ? "selected" : ""
                               }> Red </option>
                               <option value ="white" ${
                                 colors[i] === "white" ? "selected" : ""
                               }> White </option>
                            <select/>
                            </div>
                           </td>
                         </tr>`;
  }

  return tableData;
}

function updateSize(index, cardId) {
  const selectedSize = document.getElementById(`selectSize_${index}_${cardId}`).value;

  selectedObj = {};
  selectedObj = cardData[selectedId];
  selectedObj.sizes[index] = selectedSize;
}

function updateColor(index, cardId) {
  const selectedColors = document.getElementById(`selectColor_${index}_${cardId}`).value;

  selectedObj = {};
  selectedObj = cardData[selectedId];
  selectedObj.colors[index] = selectedColors;
}
