import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import Loader from "../Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Settings() {
  const [Value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      axios.defaults.withCredentials = true;
      const response = await axios.get("http://localhost:3000/api/user-info");
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetchProfile();
  }, []);

  const handleAddressChange = (e)=>{
    const {name,value} = e.target;
    setValue({...Value,[name]:value});
  }
  const submitِِAddress = async ()=>{
    axios.defaults.withCredentials = true;
    const response = await axios.put("http://localhost:3000/api/update-user-info",Value);
    if (response.status === 200){
        toast.success(response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
    }else{
        toast.error(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

    }

    
  }

  return (
    <div className="container-fluid py-4">
      {!profileData ? (
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
          <Loader />
        </div>
      ) : (
        <div className="d-flex flex-column w-75 mx-auto">
          <h1 className="mb-5">Settings</h1>

          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <p className="form-control bg-light">{profileData.username}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <p className="form-control bg-light">{profileData.email}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={Value.address}
              onChange={handleAddressChange}
              rows="3"
            />
          </div>

          <button className="btn btn-primary fs-4 fw-bold align-self-center"
          style={{
            backgroundColor: "#fbb02d",
            width: "7em",
            height: "2em",
            borderRadius: "0.7em",
            border: "0",
          }}
          onClick={submitِِAddress}
          >Update</button>
        </div>
      )}
    </div>
  );
}
