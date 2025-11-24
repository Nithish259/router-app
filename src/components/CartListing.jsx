function CartListing({ cartProducts, setCartProducts, handleRemoveFromCart }) {
  // Increase quantity
  function incrementProduct(id) {
    setCartProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  }

  // Decrease quantity
  function decrementProduct(id) {
    const product = cartProducts.find((p) => p.id === id);

    if (product.qty === 1) {
      handleRemoveFromCart(id);
      return;
    }

    setCartProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
    );
  }

  // Total price
  const totalPrice = Math.floor(
    cartProducts.reduce((sum, p) => sum + p.price * p.qty, 0)
  );

  // 10% Discount
  const discount = Math.floor(totalPrice * 0.1);
  const finalTotal = Math.floor(totalPrice - discount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-[60px]">
      {/* LEFT SECTION */}
      <div className="p-4 bg-gray-50 h-[calc(100vh-60px)] overflow-y-auto">
        <h1 className="font-bold text-xl border-b pb-3 mb-4">Your Cart</h1>

        {cartProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 mb-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition w-full max-w-full"
          >
            {/* IMAGE FIX */}
            <div className="min-w-[100px] min-h-[100px] w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto sm:mx-0">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-full p-2"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col flex-1 gap-2 min-w-0">
              <h1 className="font-semibold text-lg break-words">
                {product.title}
              </h1>

              <span className="font-bold text-xl">
                ₹{Math.floor(product.price)}
              </span>

              <div className="flex items-center gap-1 text-gray-500 text-sm">
                ⭐ {product.rating?.rate}
                <span className="text-gray-400">
                  ({product.rating?.count} reviews)
                </span>
              </div>

              {/* Qty Controls */}
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Qty</span>

                  <button
                    className="w-7 h-7 bg-gray-200 border rounded hover:bg-gray-300"
                    onClick={() => decrementProduct(product.id)}
                  >
                    -
                  </button>

                  <span className="font-semibold w-6 text-center text-lg">
                    {product.qty}
                  </span>

                  <button
                    className="w-7 h-7 bg-gray-200 border rounded hover:bg-gray-300"
                    onClick={() => incrementProduct(product.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-red-100 text-red-600 px-3 py-1 rounded border border-red-300 hover:bg-red-200 transition text-sm"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {cartProducts.length === 0 && (
          <h2 className="text-center text-gray-400 text-xl py-20">
            Your cart is empty 🛒
          </h2>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="bg-white shadow-inner p-6 sticky top-[60px] h-fit md:h-[calc(100vh-60px)] flex flex-col gap-6">
        <h1 className="font-bold text-xl border-b pb-2">
          Price Details ({cartProducts.length} items)
        </h1>

        {/* Total Price */}
        <div className="flex justify-between text-gray-700 text-lg">
          <p>Total Product Price</p>
          <span>₹{totalPrice}</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-green-600 text-lg font-semibold">
          <p>10% Discount</p>
          <span>- ₹{discount}</span>
        </div>

        <hr />

        {/* Final Total */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl">Order Total</h1>
          <span className="font-extrabold text-2xl">₹{finalTotal}</span>
        </div>

        <button className="bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartListing;
