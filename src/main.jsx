import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { PedidosProvider } from './context/PedidosContext.jsx'
import { ClientsProvider } from './context/ClientsContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { useContext } from 'react'
import { PedidosContext } from './context/PedidosContext.jsx'
import { AuthContext } from './context/AuthContext.jsx'

const AppWithProviders = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <PedidosProvider>
              <ClientsProviderWrapper />
            </PedidosProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

const ClientsProviderWrapper = () => {
  const { pedidos } = useContext(PedidosContext);
  return (
    <ClientsProvider pedidos={pedidos}>
      <WishlistProviderWrapper />
    </ClientsProvider>
  );
};

const WishlistProviderWrapper = () => {
  const { usuario } = useContext(AuthContext);
  return (
    <WishlistProvider usuario={usuario}>
      <App />
    </WishlistProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)
