import axios from "axios";

export default function getEnvironment() {
  const options = {
    method: "GET",
    url: "https://dark-sky.p.rapidapi.com/%7Blatitude%7D,%7Blongitude%7D",
    params: { units: "auto", lang: "en" },
    headers: {
      "X-RapidAPI-Key": "3794203dffmshf97581137227755p16e6b0jsnf438e9fe79d7",
      "X-RapidAPI-Host": "dark-sky.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
