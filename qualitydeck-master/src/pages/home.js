import bg from "../images/bg.jpg";
import "./css/home.css";

function Home({ isLoggedIn }) {
  return (
    <div className="Home">
      <div className="wrapper">
        <img alt="food background" src={bg} className="bg-img" />
        <div className="text-container">
          <h1>Qualitydeck</h1>
          <h3>Eat good and stay healthy</h3>
          <p>
            Our product Qualitydeck is a one stop solution for all the B2B and
            B2C Consumer to provide good quality food.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
