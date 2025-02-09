import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import './Sidebar.css'
export default function Sidebar(props) {
    const data = props.data;
    console.log(data);

    return (
        <div className="bg-light p-2 rounded d-flex flex-column align-items-center justify-content-between w-75 h-100">
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
                <img src={data.avatar} style={{ height: "12vh" }} />
                <p className="mt-3" style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>{data.username}</p>
                <p className="mt-1 fs-4 fs-md-5 fs-sm-6 text-center text-wrap w-100">{data.email}</p>          
                <div className="w-100 mt-1 border border-2"></div>
            </div>

            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                <Link to="/profile" className="w-100 py-1 rounded p-link" style={{ fontSize: "1.3rem", textAlign: "center" }}>Favourites</Link>
                <Link to="/profile/orderHistory" className="w-100 py-1 rounded p-link " style={{ fontSize: "1.3rem", textAlign: "center" }}>Order History</Link>
                <Link to="/profile/settings" className="w-100 py-1 rounded p-link" style={{ fontSize: "1.3rem", textAlign: "center" }}>Settings</Link>
            </div>
            <button className="btn logout-btn">
                Log out <FontAwesomeIcon icon={faRightFromBracket} />
            </button>

        </div>
    );
}