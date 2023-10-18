import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/forgot" element={<ForgotPassword/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;