import "./index.css";

function Card({ name, fid, mail, deleteHandler }) {
  return (
    <div className="card card-container">
      <h4>{name}</h4>
      <h6>{mail}</h6>
      <h6>UID : {fid}</h6>
      <button
        className="w-100 delete-btn"
        onClick={() => {
          deleteHandler(fid);
        }}
      >
        Delete User
      </button>
    </div>
  );
}

export default Card;
