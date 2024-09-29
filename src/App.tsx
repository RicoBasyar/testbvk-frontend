import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './Register';
import Login from './Login';
import AfterLogin from './AfterLogin';
import MemberDetail from './MemberDetail'; // Import MemberDetail
import RedirectHandle from "./RedirectHandle";
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/after-login" element={<AfterLogin />} />
                    <Route path="/member-detail" element={<MemberDetail />} />
                    <Route path="/oauth2/callback/google" element={<RedirectHandle />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
