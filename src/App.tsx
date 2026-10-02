import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./layout/Header";
import { Hero } from "./layout/Hero";
import { FeaturedProducts } from "./layout/FeaturedProducts";
import { Footer } from "./layout/Footer";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { Categories } from "./layout/Categories";
import { CartProvider } from "./context/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import { FavoritesProvider } from "./context/FavoritesContext"; 
import { FavoritesDrawer } from "./components/FavoritesDrawer"; 
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { AboutPage } from "./pages/AboutPage";

import { RouteScroll } from "./components/RouteScroll";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="bg-brand-background min-h-screen text-brand-dark font-sans relative">
      <FavoritesProvider>
        <CartProvider>
          <RouteScroll />
          <Header />
          <CartDrawer />
          <FavoritesDrawer />

          <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Categories />
                  <FeaturedProducts />
                </>
              }
            />
            <Route path="/catalogo" element={<CategoriesPage />} />
            <Route path="/produto/:productId" element={<ProductDetailPage key={pathname} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pedido-confirmado" element={<OrderSuccessPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </main>

          <Footer />
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
}