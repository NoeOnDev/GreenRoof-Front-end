import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import DashBoard from "../pages/DashBoard.jsx";

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/forgot" element={<ForgotPassword/>} />
                <Route path="/dashboard" element={<DashBoard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;