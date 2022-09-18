import axios from "axios";
const baseURL = "https://quality-deck.herokuapp.com/mail";

export function postMail(info = {}) {
  try {
    axios
      .post(baseURL, info)
      .then((response) => {})
      .catch((error) => {});
  } catch (err) {}
}
