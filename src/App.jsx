import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute } from './routes/ProtectedRoute';

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

function App() {
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

            {/* Protected client routes */}
            <Route 
              path="/carrito" 
              element={
                <ProtectedRoute role="cliente">
                  <Carrito />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute role="cliente">
                  <Perfil />
                </ProtectedRoute>
              } 
            />

            {/* Protected admin routes (PixelZone) */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/productos" 
              element={
                <ProtectedRoute role="admin">
                  <ProductosAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/proveedores" 
              element={
                <ProtectedRoute role="admin">
                  <ProveedoresAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/inventario" 
              element={
                <ProtectedRoute role="admin">
                  <InventarioAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/pedidos" 
              element={
                <ProtectedRoute role="admin">
                  <PedidosAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/perfil" 
              element={
                <ProtectedRoute role="admin">
                  <PerfilAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/clientes" 
              element={
                <ProtectedRoute role="admin">
                  <ClientesAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/finanzas" 
              element={
                <ProtectedRoute role="admin">
                  <FinanzasAdmin />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
