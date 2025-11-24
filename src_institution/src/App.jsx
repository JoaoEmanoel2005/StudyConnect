import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/RegisterHome';

//Páginas do Administrador
import AdminRegister from './pages/AdminRegister';

//Páginas da Instituição

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register/admin" element={<AdminRegister />} />
                <Route path="/register/institution" element={<div>Register Institution (placeholder)</div>} />
                <Route path="/login" element={<div>Login (placeholder)</div>} />
                <Route path="/contact" element={<div>Contact (placeholder)</div>} />
            </Routes>
        </BrowserRouter>
    );
}