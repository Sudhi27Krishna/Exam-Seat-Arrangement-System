import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ManageRoom from "./components/ManageRoom";
import UniversityExam from "./components/UniversityExam";
import SeatAllocation from "./components/SeatAllocation";
import { Route, Routes } from 'react-router-dom';
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protection needed routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="manage-room" element={<ManageRoom />} />
            <Route path="university-exam" element={<UniversityExam />} />
            <Route path="seat-allocation" element={<SeatAllocation />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;