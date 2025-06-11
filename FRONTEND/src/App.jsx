import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext.jsx'; // Solo se consume el contexto
import Navbar from './components/Navbar/Navbar.jsx';
import Homepage from './pages/Home/Homepage.jsx';
import NavBarRoutes from './components/routes/NavBarRoutes.jsx';
import CaseDetails from './components/Homepage/CaseDetails/CaseDetails.jsx';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext); // Obtén el estado global

  return (
    <Router>
      {/* Navbar solo aparece si el usuario está autenticado */}
      {isAuthenticated && <Navbar />}

      <Routes>
        
      
        {/* Ruta accesible para todos */}
        <Route path="/" element={<Homepage />} />
        <Route path="/casos/:caseType" element={<CaseDetails />} /> {/* Mover aquí */}
        {/* Rutas protegidas */}
        <Route
          path="/*"
          element={isAuthenticated ? <NavBarRoutes /> : <Homepage />}
        />
      </Routes>
    </Router>
    
  );
};

export default App;
