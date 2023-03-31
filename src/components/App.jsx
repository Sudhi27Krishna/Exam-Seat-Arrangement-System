import React from "react";
//import ManageRoom from "./ManageRoom";
import UniversityExam from "./UniversityExam";
// import Login from "./Login";
import NavBar from "./NavBar";

//first page preferable home
function App() {
  return (<div className="flex flex-row">
    <NavBar />
    <UniversityExam />
    {/* <Login /> */}
  </div>);
}

export default App;
