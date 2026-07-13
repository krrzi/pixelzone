import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute } from './routes/ProtectedRoute';
import ClientSupportModal from './components/ClientSupportModal';
import { useAuth } from './hooks/useAuth';
import { useState } from 'react';

// Client pages
import Home from './pages/client/Home';
import Tienda from './pages/client/Tienda';
import Producto from './pages/client/Producto';
import Carrito from './pages/client/Carrito';
import Perfil from './pages/client/Perfil';
import Login from './pages/client/Login';
import ArmarSetup from './pages/client/ArmarSetup';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import ProveedoresAdmin from './pages/admin/ProveedoresAdmin';
import InventarioAdmin from './pages/admin/InventarioAdmin';
import PedidosAdmin from './pages/admin/PedidosAdmin';
import PerfilAdmin from './pages/admin/PerfilAdmin';
import ClientesAdmin from './pages/admin/ClientesAdmin';
import FinanzasAdmin from './pages/admin/FinanzasAdmin';
import RRHHDashboard from './pages/admin/RRHHDashboard';
import ReportesDashboard from './pages/admin/ReportesDashboard';

// Proveedor pages
import ProveedorDashboard from './pages/proveedor/ProveedorDashboard';
import MisOrdenes from './pages/proveedor/MisOrdenes';
import MisProductos from './pages/proveedor/MisProductos';
import ReportesProveedor from './pages/proveedor/ReportesProveedor';

// Marketing pages
import MarketingDashboard from './pages/marketing/MarketingDashboard';
import GestionCupones from './pages/marketing/GestionCupones';
import GestionCampanas from './pages/marketing/GestionCampanas';
import ReportesMarketing from './pages/marketing/ReportesMarketing';

// Logística pages
import LogisticaDashboard from './pages/logistica/LogisticaDashboard';
import GestionEnvios from './pages/logistica/GestionEnvios';
import Couriers from './pages/logistica/Couriers';
import MapaEnvios from './pages/logistica/MapaEnvios';
import ReportesLogistica from './pages/logistica/ReportesLogistica';

// Soporte pages
import SoporteDashboard from './pages/soporte/SoporteDashboard';
import BandejaTickets from './pages/soporte/BandejaTickets';
import BaseConocimiento from './pages/soporte/BaseConocimiento';
import ReportesSoporte from './pages/soporte/ReportesSoporte';

// No autorizado page
import NoAutorizado from './pages/NoAutorizado';

// Placeholder components for logistica
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-4">
    <div className="max-w-md w-full text-center">
      <h1 className="text-[#39ff14] font-['orbitron'] text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-400 font-['inter'] text-xl">Próximamente</p>
    </div>
  </div>
);

function App() {
  const { isCliente } = useAuth();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/producto/:id" element={<Producto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/armar-setup" element={<ArmarSetup />} />
            <Route path="/no-autorizado" element={<NoAutorizado />} />

            {/* Protected client routes */}
            <Route 
              path="/carrito" 
              element={
                <ProtectedRoute roles={['cliente']}>
                  <Carrito />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute roles={['cliente']}>
                  <Perfil />
                </ProtectedRoute>
              } 
            />

            {/* Protected admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/productos" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <ProductosAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/proveedores" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <ProveedoresAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/inventario" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <InventarioAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/pedidos" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <PedidosAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/perfil" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <PerfilAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/clientes" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <ClientesAdmin />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/admin/finanzas"
              element={
                <ProtectedRoute roles={['admin']}>
                  <FinanzasAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rrhh"
              element={
                <ProtectedRoute roles={['admin']}>
                  <RRHHDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reportes"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ReportesDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected proveedor routes */}
            <Route 
              path="/proveedor" 
              element={
                <ProtectedRoute roles={['proveedor']}>
                  <ProveedorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/proveedor/ordenes" 
              element={
                <ProtectedRoute roles={['proveedor']}>
                  <MisOrdenes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/proveedor/productos" 
              element={
                <ProtectedRoute roles={['proveedor']}>
                  <MisProductos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/proveedor/reportes" 
              element={
                <ProtectedRoute roles={['proveedor']}>
                  <ReportesProveedor />
                </ProtectedRoute>
              } 
            />

            {/* Protected marketing routes */}
            <Route 
              path="/marketing" 
              element={
                <ProtectedRoute roles={['marketing']}>
                  <MarketingDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketing/cupones" 
              element={
                <ProtectedRoute roles={['marketing']}>
                  <GestionCupones />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketing/campanas" 
              element={
                <ProtectedRoute roles={['marketing']}>
                  <GestionCampanas />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketing/reportes" 
              element={
                <ProtectedRoute roles={['marketing']}>
                  <ReportesMarketing />
                </ProtectedRoute>
              } 
            />

            {/* Protected logistica routes */}
            <Route 
              path="/logistica" 
              element={
                <ProtectedRoute roles={['logistica']}>
                  <LogisticaDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logistica/envios" 
              element={
                <ProtectedRoute roles={['logistica']}>
                  <GestionEnvios />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logistica/couriers" 
              element={
                <ProtectedRoute roles={['logistica']}>
                  <Couriers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logistica/mapa" 
              element={
                <ProtectedRoute roles={['logistica']}>
                  <MapaEnvios />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/logistica/reportes" 
              element={
                <ProtectedRoute roles={['logistica']}>
                  <ReportesLogistica />
                </ProtectedRoute>
              } 
            />

            {/* Protected soporte routes */}
            <Route 
              path="/soporte" 
              element={
                <ProtectedRoute roles={['soporte']}>
                  <SoporteDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/soporte/tickets" 
              element={
                <ProtectedRoute roles={['soporte']}>
                  <BandejaTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/soporte/faq" 
              element={
                <ProtectedRoute roles={['soporte']}>
                  <BaseConocimiento />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/soporte/reportes" 
              element={
                <ProtectedRoute roles={['soporte']}>
                  <ReportesSoporte />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        {isCliente() && (
          <>
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="fixed bottom-6 right-6 bg-[#39ff14] text-[#0a0a0a] w-16 h-16 rounded-full shadow-lg font-['orbitron'] text-2xl flex items-center justify-center hover:bg-[#39ff14]/80 transition-colors z-40"
            >
              🎧
            </button>
            <ClientSupportModal
              isOpen={isSupportModalOpen}
              onClose={() => setIsSupportModalOpen(false)}
            />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
