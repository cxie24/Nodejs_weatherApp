const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "9424c861809c9c475f067ebee0d1ca78";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  const tempFahrenheit = weather.main.temp;
  const tempCelsius = ((tempFahrenheit - 32) * 5) / 9;
  // Render the index template with the weather data and error message
  weather = {
    city: weather.name,
    tempFahrenheit: tempFahrenheit.toFixed(3),
    tempCelsius: tempCelsius.toFixed(3),
    description: weather.weather[0].description,
    country: weather.sys.country
  };
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});