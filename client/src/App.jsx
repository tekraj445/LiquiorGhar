import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useCart } from './hooks/useCart';
// global.css HATAYO - har page ma aafai import garcha
export default function App() {
  const cartState = useCart();
  return (
    <BrowserRouter>
      <AppRoutes {...cartState} />
    </BrowserRouter>
  );
}