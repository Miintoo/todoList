import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServerErrorPage from './pages/serverError/ServerErrorPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/serverError" element={<ServerErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
