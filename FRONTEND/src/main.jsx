import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Un solo AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Contexto envolviendo toda la app */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
