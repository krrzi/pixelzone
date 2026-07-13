import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usuarios } from '../../data/usuarios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const { login, isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  const getRedirectUrl = (user) => {
    switch (user?.rol) {
      case 'admin':
        return '/admin';
      case 'proveedor':
        return '/proveedor';
      case 'marketing':
        return '/marketing';
      case 'logistica':
        return '/logistica';
      case 'soporte':
        return '/soporte';
      default:
        return '/';
    }
  };

  React.useEffect(() => {
    if (isAuthenticated() && usuario) {
      navigate(getRedirectUrl(usuario));
    }
  }, [isAuthenticated, usuario, navigate]);

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    let isValid = true;

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'El email no tiene un formato válido';
      isValid = false;
    }

    // Validar password
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    if (!validateForm()) return;

    const success = login(email, password);
    if (success) {
      const user = usuarios.find(u => u.email === email && u.password === password);
      navigate(getRedirectUrl(user));
    } else {
      setErrors({ ...errors, general: 'Credenciales incorrectas' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-neon-green font-orbitron text-4xl font-bold">
            PIXEL<span className="text-white">ZONE</span>
          </h1>
          <p className="text-gray-400 font-inter mt-2">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <div className="bg-dark-bg border border-neon-green/30 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-400/10 border border-red-400 text-red-400 px-4 py-3 rounded font-inter">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-300 font-inter mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-dark-bg border px-4 py-3 rounded-lg focus:outline-none font-inter ${errors.email ? 'border-red-400' : 'border-neon-green/30 focus:border-neon-green'}`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 font-inter">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 font-inter mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-dark-bg border px-4 py-3 rounded-lg focus:outline-none font-inter ${errors.password ? 'border-red-400' : 'border-neon-green/30 focus:border-neon-green'}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 font-inter">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-neon-green text-dark-bg px-6 py-3 rounded-lg font-orbitron font-bold hover:bg-neon-green/80 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neon-green/30">
            <p className="text-gray-400 font-inter text-sm mb-4">
              Credenciales de prueba:
            </p>
            <div className="space-y-2 text-sm">
              <div className="text-gray-300 font-inter">
                <span className="text-neon-green">Cliente:</span> cliente@pixelzone.com / cliente123
              </div>
              <div className="text-gray-300 font-inter">
                <span className="text-neon-green">Admin:</span> admin@pixelzone.com / admin123
              </div>
              <div className="text-gray-300 font-inter">
                <span className="text-neon-green">Proveedor:</span> proveedor@pixelzone.com / proveedor123
              </div>
              <div className="text-gray-300 font-inter">
                <span className="text-neon-green">Marketing:</span> marketing@pixelzone.com / marketing123
              </div>
              <div className="text-gray-300 font-inter">
                <span className="text-neon-green">Logística:</span> logistica@pixelzone.com / logistica123
              </div>
              <div className="text-gray-300 font-inter">
                <span className="text-neon-green">Soporte:</span> soporte@pixelzone.com / soporte123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
