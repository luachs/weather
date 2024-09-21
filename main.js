var search = document.querySelector(".input");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var value = document.querySelector(".temperature__desc");
var shortDesc = document.querySelector(".short-desc");
var eye = document.querySelector(".eye span");
var wind = document.querySelector(".wind span");
var cloud = document.querySelector(".cloud span");
var content = document.querySelector(".content ");
var time = document.querySelector(".time ");
var body = document.querySelector("body ");

async function changeWeatherUI(capitalSearch) {
  search.value.trim();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=ecd4ab0c3bd91c8eb74c375fc101c21d`;
  let data = await fetch(apiURL).then((res) => res.json());

  if (data.cod == 200) {
    content.classList.remove("hide");
    city.innerText = data.name;
    country.innerText = data.sys.country;
    let temp = Math.round(data.main.temp - 273.15);
    value.innerText = temp;
    wind.innerText = data.wind.speed + "m/s";
    eye.innerText = data.visibility + "m";
    shortDesc.innerText = data.weather[0] ? data.weather[0].main : " ";
    cloud.innerText = data.main.humidity + "%";
    time.innerText = new Date().toLocaleString("vi");
    body.setAttribute("class", "hot");

    if (temp <= 37) {
      body.setAttribute("class", "warm");
    }
    if (temp <= 27) {
      body.setAttribute("class", "cool");
    }
    if (temp <= 19) {
      body.setAttribute("class", "cold");
    }
  } else {
    content.classList.add("hide");
  }
}
search.addEventListener("keypress", function (e) {
  if (e.code == "Enter") {
    let capitalSearch = search.value.trim();
    changeWeatherUI();
  }
});
changeWeatherUI("ho chi minh");
