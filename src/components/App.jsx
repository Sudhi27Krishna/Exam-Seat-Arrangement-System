import React from "react";
// import Login from "./Login";
import Layout from "./Layout";
import Home from "./Home";
import ManageRoom from "./ManageRoom";
import UniversityExam from "./UniversityExam";
import SeatAllocation from "./SeatAllocation";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="manageroom" element={<ManageRoom />} />
        <Route path="universityexam" element={<UniversityExam />} />
        <Route path="seatallocation" element={<SeatAllocation />} />
      </Route>
    </Routes>
  );
}

export default App;
