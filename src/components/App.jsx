import React from "react";
import ManageRoom from "./ManageRoom";
// import Login from "./Login";
import NavBar from "./NavBar";


function App() {
  return (<div className="flex flex-row">
    <NavBar />
    <ManageRoom />
    {/* <Login /> */}
  </div>);
}

export default App;
