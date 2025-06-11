
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ isOpen, closeLogin }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Efecto para deshabilitar el scroll cuando el login está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:9000/api/autenticacion", formValues, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.data.token) {
        throw new Error('No se recibió un token');
      }

      const { token } = response.data;      
      const payload = JSON.parse(atob(token.split(".")[1]));
      
      login(token, payload.role);

      const roleRoutes = {
        asistente: "/page-principal",
        abogado: "/abogado",
        cliente: "/d_cliente"
      };      
      const userRoute = roleRoutes[payload.nombre_rol] || "/homepage";
      navigate(userRoute, { replace: true });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión. Intenta nuevamente.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeAndClearForm = () => {
    closeLogin();
    setFormValues({ email: '', password: '' });
  };

  return (
    <>
      {/* Overlay oscuro con efecto blur */}
      <div className={`login-overlay ${isOpen ? 'active' : ''}`} onClick={closeAndClearForm}></div>
      
      {/* Barra de login */}
      <div className={`login-sidebar-homepage ${isOpen ? 'open' : ''}`} id="loginSidebar">
        <div className="close-btn-homepage" onClick={closeAndClearForm}>×</div>
        <div id="loginForm">
          <h2>ACCEDER</h2>

          <form className='form-homepage' onSubmit={handleLogin}>
            <div className="form-row-homepage">
              <div className="textbox-homepage">
                <label htmlFor="email">CORREO ELECTRÓNICO*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  aria-label="Correo electrónico"
                />
              </div>

              <div className="textbox-homepage">
                <label htmlFor="password">CONTRASEÑA*</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formValues.password}
                    onChange={handleInputChange}
                    required
                    aria-label="Contraseña"
                  />
                  <IconButton
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#888',
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>
            </div>

            <div className="consent-checkbox">
              <label>
                <input type="checkbox" required aria-required="true"/>
                Al iniciar sesión, acepto el tratamiento de mis datos personales conforme a la&nbsp;
                <a 
                  href="https://www.sic.gov.co/ley-1581-de-2012-proteccion-de-datos-personales" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="privacy-link"
                >
                  Ley 1581 de 2012
                </a>
                &nbsp;de Colombia.
              </label>
            </div>

            <div className="Caja-boton">
              <button className="btnlogin-H" /*type="submit"*/ disabled={loading}>
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;