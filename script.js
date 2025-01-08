const apiKey = "5H48TH7NERNY8JQ63HVALJ9TU";
//fetch from the API and display the data from location
//take location and return data for that location in console

async function getWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const data = json;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function processData(location) {
  const json = await getWeather(location);
  if (!json) {
    console.error("No data returned from getWeather");
    return null;
  }
  const data = {
    location: json.address,
    currentTemp: json.currentConditions.temp,
    feelsLike: json.currentConditions.feelslike,
    description: json.description,
  };
  console.log(`processed data: ${data}`);
  return data;
}

const btn = document.querySelector("button");
const input = document.querySelector("#location");

btn.addEventListener("click", async () => {
    event.preventDefault();
  if (input.value === "") {
    alert("Please enter a location");
    return;
  }
  const data = await processData(input.value);

  if (!data) {
    console.error("Error: No data to display."); // Debug log
    document.querySelector(".location").textContent = "Error fetching data!";
    return;
  }

  document.querySelector(".location").textContent = `Location: ${data.location}`;
  document.querySelector(".temp").textContent = `Current Temp: ${data.currentTemp} °F`;
  document.querySelector(".feelsLike").textContent = `Feels Like: ${data.feelsLike} °F`;
  document.querySelector(".description").textContent = data.description;

  input.value = "";
});
