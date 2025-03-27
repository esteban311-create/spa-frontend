import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
;
import Login from "./pages/Login";
import Agenda from "./pages/Agenda";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-blue-500 mb-4"></h1>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
