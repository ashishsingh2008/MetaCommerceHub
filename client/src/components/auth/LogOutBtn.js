import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button } from "react-bootstrap";
function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  async function logOut() {
    await axios.post("https://metacommercehub.onrender.com/auth/logout");
    await getLoggedIn();
    navigate("/login");
  }

  return (
    <Button
      variant="outline"
      style={{ color: "#20BEAD", borderColor: "#20BEAD" }}
      onClick={logOut}
    >
      Log Out
    </Button>
  );
}

export default LogOutBtn;
