import { useEffect, useState } from "react";
import "./App.css";
import ProductListing from "./components/ProductListing";
import CartListing from "./components/CartListing";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  const [product, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // SEARCH FUNCTION (FIXED)
  function handleSearching(e) {
    const value = e.target.value.toLowerCase().trim();

    if (value === "") {
      setProducts(originalProducts);
      return;
    }

    const filtered = originalProducts.filter((item) =>
      item.title.toLowerCase().includes(value)
    );

    setProducts(filtered);
  }

  // ADD TO CART
  function handleAddToCart(id) {
    const item = product.find((p) => p.id === id);

    const exists = cartProduct.find((p) => p.id === id);

    if (exists) {
      setCartProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
      );
    } else {
      setCartProducts((prev) => [...prev, { ...item, qty: 1 }]);
    }
  }

  // REMOVE FROM CART
  function handleRemoveFromCart(id) {
    const confirmation = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (confirmation) {
      setCartProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  // Load cart from localstorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCartProducts(savedCart);
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProduct));
  }, [cartProduct]);

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setOriginalProducts(data); // Store original list separately
      });
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <Navbar
        onClick={() => setIsCartOpen(!isCartOpen)}
        itemCount={cartProduct.length}
        handleSearching={handleSearching}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProductListing
              products={product}
              cartProduct={cartProduct}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartListing
              cartProducts={cartProduct}
              setCartProducts={setCartProducts}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
