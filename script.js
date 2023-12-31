let apiURLCountries = "https://restcountries.com/v3.1/all";
// prettier-ignore
let allCountriesNames = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
let countriesWithLetter = [];

document.addEventListener("DOMContentLoaded", function () {
  if (document.documentElement.classList.contains("bucket-list")) {
    let ul = document.getElementById("favouriteList");
    displaySelectedCountries();
  }
});

document.getElementById("letterInput").addEventListener("change", function () {
  let letter = document.getElementById("letterInput").value;
  console.log(letter);
  let letterUpper = letter.toUpperCase();
  countriesWithLetter = allCountriesNames.filter((country) =>
    country.startsWith(`${letterUpper}`)
  );
  console.log(countriesWithLetter);
  getRandomElements(countriesWithLetter, 3);
});

let selectedCountry;
let favouriteCountries;

let getRandomElements = function (sourceArray, numberElements) {
  let results = [];
  document.getElementById("buttons").innerHTML = "";
  for (let i = 0; i < numberElements; i++) {
    // results.push(sourceArray[Math.floor(Math.random()*sourceArray.length)]);
    let resultTitle = document.createElement("h3");
    let resultButton = document.createElement("button");
    let resultInfo = document.createElement("p");

    let country = sourceArray[Math.floor(Math.random() * sourceArray.length)];
    resultButton.id = country;
    resultButton.innerHTML = country;
    selectedCountry = country;

    document.getElementById("buttons").appendChild(resultButton);

    document.getElementById(country).addEventListener("click", function () {
      let countryInfo;
      let countryFlag = document.createElement("img");
      //   let map = undefined;
      fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((countryData) => {
          console.log(map);
          console.log(document.querySelector("#map"));
          if (document.querySelector("#map").innerHTML !== "") {
            map.remove();
          }
          let countryInfo = countryData[0];
          selectedCountry = countryInfo;
          document.querySelector(".card").innerHTML = `
                    <h3 id= "countryName">${countryInfo.name.common}</h3>
                    <p id="infoParagraph">Region:${countryInfo.region}</p>
                    <p id="latlng">Latitude and Longitude: ${
                      countryInfo.latlng
                    }</p>
                    <p id="capital">Capital City: ${countryInfo.capital}</p>
                    <p id="languages">Official Languages: ${Object.values(
                      countryInfo.languages
                    ).join(", ")}</p>
                    <p id="population">Population: ${countryInfo.population}</p>
                    <img id="flags" src="${countryInfo.flags.png}"/>
                    `;
          //<img id="flags" src="${countryInfo.flags.png}"/>
          //    document.getElementById('#flagImage').appendChild()
          map = L.map("map").setView(countryInfo.latlng, 5);
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map);

          let marker = L.marker(countryInfo.latlng).addTo(map);
          /* let popup = L.popup()
        .setLatLng(countryInfo.latlng)
        .setContent("Country Info PopUp")
        .openOn(map);

        //  marker.bindPopup(`<b>${countryInfo.name.common}<b>`).openPopup(); */
        })
        .catch((error) => console.error(error));
    });
  }
};

let btn = document.querySelector("#search");
btn.addEventListener("click", function () {
  getRandomElements(allCountriesNames, 3);
});

document.getElementById("storeCountry").addEventListener("click", function () {
  if (selectedCountry != null && selectedCountry != undefined) {
    console.log(selectedCountry);
    let favouriteCountries = localStorage.getItem("selectedCountry");
    if (favouriteCountries == null) {
      favouriteCountries = [];
    } else {
      favouriteCountries = JSON.parse(favouriteCountries);
    }
    favouriteCountries.push(JSON.stringify(selectedCountry));
    localStorage.setItem("selectedCountry", JSON.stringify(favouriteCountries));
    alert(
      `"${selectedCountry.name.common}" has been added to your bucketlist.`
    );
  } else {
    alert("Please select a country first.");
  }
});

function displaySelectedCountries() {
  let favouriteCountries = localStorage.getItem("selectedCountry");
  if (favouriteCountries && favouriteCountries.length > 2) {
    favouriteCountries = JSON.parse(favouriteCountries);
    let ul = document.getElementById("favouriteList");
    ul.innerHTML = "";
    favouriteCountries.forEach((country) => {
      country = JSON.parse(country);
      console.log(country);

      const li = document.createElement("li");
      li.innerHTML = ` <h2 id= "savedCountryName">${country.name.common}</h2>
      <img id="savedFlags" src="${country.flags.png}"/>
            `;
      const button = document.createElement("button");
      button.textContent = "remove";
      button.style.fontSize = "1rem";
      button.style.cursor = "pointer";
      button.style.marginLeft = "1rem";
      button.addEventListener("click", function () {
        removeFavouriteList(country);
        displaySelectedCountries();
      });
      li.appendChild(button);
      ul.appendChild(li);
    });
  } else {
    document.getElementById("favouriteList").innerHTML =
      "You have not added any countries to your bucketlist yet.";
    document.getElementById("favouriteList").style.marginTop = "2rem";
  }
}

function removeFavouriteList(country) {
  let favouriteCountries = localStorage.getItem("selectedCountry");
  if (favouriteCountries) {
    favouriteCountries = JSON.parse(favouriteCountries);

    const countryName = country.name.common;
    const index = favouriteCountries.findIndex((c) => {
      const parsedCountry = JSON.parse(c);
      return parsedCountry.name.common === countryName;
    });

    if (index > -1) {
      favouriteCountries.splice(index, 1);
      localStorage.setItem(
        "selectedCountry",
        JSON.stringify(favouriteCountries)
      );
      displaySelectedCountries();
    }
  }
}
