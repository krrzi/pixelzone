import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
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
            {error && (
              <div className="bg-red-400/10 border border-red-400 text-red-400 px-4 py-3 rounded font-inter">
                {error}
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
                className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                placeholder="tu@email.com"
                required
              />
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
                className="w-full bg-dark-bg border border-neon-green/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neon-green font-inter"
                placeholder="••••••••"
                required
              />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
