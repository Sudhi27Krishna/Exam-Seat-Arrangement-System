import React from "react";
// import ManageRoom from "./ManageRoom";
// import Login from "./Login";
import NavBar from "./NavBar";
import UniversityExam from "./UniversityExam";


function App() {
  return (<div className="flex flex-row">
    <NavBar />
    {/* <ManageRoom /> */}
    <UniversityExam />
    {/* <Login /> */}
  </div>);
}

export default App;
