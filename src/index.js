let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "Friday",
  "saturday",
];
let time = new Date();
let current_day = document.querySelector("#current_day");
let current_time = document.querySelector("#current_time");
current_day.innerHTML = days[time.getDay()];
// current_time.innerHTML = `${time.getHours()}:${time.getMinutes()}`;
// current_time.innerHTML = time.toLocaleTimeString();
let hour = time.getHours();
let minute = time.getMinutes();
if (time.getHours() < 10) {
  hour = `0${time.getHours()}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
current_time.innerHTML = `${hour}:${minute}`;

/////current location

function show_temp_current_city(respose) {
  let current_city = document.querySelector("#current_city");
  let temp_celsius = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  current_city.innerHTML = `${response.data.timezone.name}`;
  temp_celsius.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  description.innerHTML = `${response.data.weather[0].description}`;
}

function get_coords(position) {
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);

  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(api).then(show_temp_current_city);
}

function get_current_data(event) {
  event.preventDefault();
  console.log("fuckkkk you");
  navigator.geolocation.getCurrentPosition(get_coords);
}

let current_btn = document.querySelector("#current_button");
current_btn.addEventListener("click", get_current_data);

/////serach engine

let apiKey = "2b6fdad0cbd018949c50c70f72250726";

function show_temp_searched_city(response) {
  let temp_celsius = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  temp_celsius.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  description.innerHTML = `${response.data.weather[0].description}`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#searched-city");
  let current_city = document.querySelector("#current_city");
  if (input.value) {
    current_city.innerHTML = input.value;
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
    axios.get(api).then(show_temp_searched_city);
  }
}
let search_btn = document.querySelector("#search_form");
search_btn.addEventListener("submit", searchCity);

/////changing f and c
// let fahrenheit = document.querySelector("#fahrenheit");
// let celsius = document.querySelector("#celsius");
// function change_to_c() {
//   let temp = document.querySelector("#temp");
//   temp.innerHTML = "-1";
// }
// function change_to_f() {
//   let temp = document.querySelector("#temp");
//   temp.innerHTML = "60";
// }
// fahrenheit.addEventListener("click", change_to_f);
// celsius.addEventListener("click", change_to_c);
