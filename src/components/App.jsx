import React from "react";
// import ManageRoom from "./ManageRoom";
// import Login from "./Login";
import NavBar from "./NavBar";
// import UniversityExam from "./UniversityExam";
import SeatAllocation from "./SeatAllocation";


function App() {
  return (
    <div className="flex flex-row">
      <NavBar />
      {/* <ManageRoom /> */}
      {/* <UniversityExam /> */}
      {/* <Login /> */}
      <SeatAllocation />
    </div>
  );
}

export default App;
