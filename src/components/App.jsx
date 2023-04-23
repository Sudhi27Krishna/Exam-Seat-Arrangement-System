import Login from "./Login";
import Register from "./Register";
import Layout from "./Layout";
import Home from "./Home";
import ManageRoom from "./ManageRoom";
import UniversityExam from "./UniversityExam";
import SeatAllocation from "./SeatAllocation";
import { Route, Routes } from 'react-router-dom';
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protection needed routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="manage-room" element={<ManageRoom />} />
          <Route path="university-exam" element={<UniversityExam />} />
          <Route path="seat-allocation" element={<SeatAllocation />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;