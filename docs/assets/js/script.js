const offerCount = 3;
let popularity = "Most Popular";
const popularityId = 2;

const cardData = {
  id: [1, 2, 3],
  offerType: ["Buy 1 Get 2", "Buy 2 Get 4", "Buy 3 Get 6"],
  priceMoney: ["$18.00 USD", "$24.00 USD", "$36.00 USD"],
  offPercent: ["30", "30", "10"],
};

cardLoad();
eventListener();

function eventListener() {
  radioClickCard();
}

function cardLoad() {
  let htmlElement = document.getElementById("subCardsList");

  for (let i = 0; i < offerCount; i++) {
    const subCardsAppend = ` <div class = "card-lists">
                          <div class="sub-cards main-cards" id="main_${
                            cardData.id[i]
                          }" class="addMain">
                          <span class="order-offer-price">
                          ${cardData.offPercent[i]}% <br> Off
                          </span>
                          <span style="display: flex; align-items: center; padding:20px;">
                          <input type="radio" id="radioBtn_main_${
                            cardData.id[i]
                          }" name="example" value=${cardData.id[i]}>
                          <span style="margin-left: 10px;">
                          ${cardData.offerType[i]} 
                          <br>
                          <b style="margin-top: 10px;">${
                            cardData.priceMoney[i]
                          } </b>
                          </span>
                          ${
                            popularityId == cardData.id[i]
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

      const mainCardElement = document.getElementById(`main_${radioBtn.value}`);
      const detailedCardElement = document.getElementById(
        `detailedContent_${radioBtn.value}`
      );

      mainCardElement.classList.remove("addMain");
      mainCardElement.classList.add("removeMain");

      detailedCardElement.classList.remove("removeDetailed");
      detailedCardElement.classList.add("addDetailed");

      totalChargeElement.innerHTML = `Total : <b>${
        cardData.priceMoney[radioBtn.value - 1]
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
  ).innerHTML = `Total : <b>${cardData.priceMoney[0]} </b>`;
}

function detailedView(i) {
  return `  <div id="detailedContent_${
    cardData.id[i]
  }" class="removeDetailed detailed-cards">

  <div class="sub-cards">
  <span>
  <input type="radio" class="detailed-check" id="detailedcheck_${
    cardData.id[i]
  }" name="detailed" value=${cardData.id[i]}>
  <span style="margin-left: 5px;">
  ${cardData.offerType[i]} 
  
  <span class="offer-detailed"> ${cardData.offPercent[i]}% Off </span>

  ${
    popularityId == cardData.id[i]
      ? '<span class="popularity">' + popularity + "</span>"
      : ""
  }
  <br>
  <b style="margin-top: 10px; margin-left: 30px;">  ${
    cardData.priceMoney[i]
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
      ${sizeColorTable()}
   </tbody>   
  </table>`;
}

function sizeColorTable() {
  let tableData = "";

  for (let i = 1; i <= 2; i++) {
    tableData += `
                         <tr>
                           <td>#${i}</td>
                           <td>
                           <div class="select-field">
                             <select>
                               <option value ="S"> S </option>
                               <option value ="M"> M </option>
                               <option value ="L"> L </option>
                             <select/>
                             <div>
                            </td>
                           <td>
                           <div class="select-field">
                           <select>
                               <option value ="green"> Green </option>
                               <option value ="red"> Red </option>
                               <option value ="white" selected> White </option>
                            <select/>
                            </div>
                           </td>
                         </tr>`;
  }

  return tableData;

  // <div style ="display:flex; justify-content: space-evenly;">
  // <span>
  //      <p> Size </p>
  // <span>
  //  <select>
  //     <option value ="S"> S </option>
  //     <option value ="M"> M </option>
  //     <option value ="L"> L </option>
  //  <select/>

  //  <select>
  //  <option value ="green"> Green </option>
  //  <option value ="red"> Red </option>
  //  <option value ="white"> White </option>
  // <select/>

  // </span>
  // </span>
  // </div>
}
