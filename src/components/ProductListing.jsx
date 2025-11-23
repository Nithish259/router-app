import Navbar from "./Navbar";

function ProductListing({
  products,
  cartProduct,
  handleAddToCart,
  handleRemoveFromCart,
}) {
  return (
    <>
      <div className="bg-white w-full h-screen grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mt-[60px]">
        {products.map((product) => (
          <div
            className="bg-white flex flex-col gap-y-2 px-2 pb-4 pt-1 h-[100%] rounded shadow-md"
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain bg-gray-200 p-2 rounded-t"
            />
            <h1 className="truncate" title={product.title}>
              {product.title}
            </h1>
            <span className="font-bold text-lg">Rs.{product.price}</span>
            <div className="flex items-center gap-x-1">
              <div className="bg-emerald-500 flex gap-x-2 items-center justify-center text-white rounded-full w-1/4 p-1">
                <h1>{product.rating.rate}</h1>
                <i class="fa-solid fa-star"></i>
              </div>
              <div>
                <span className="text-gray-400 text-sm">
                  {product.rating.count} Reviews
                </span>
              </div>
            </div>
            <div className="flex justify-center md:block md:mt-4">
              {cartProduct.some((item) => item.id === product.id) ? (
                <button
                  className="bg-red-100 border border-gray-300 w-58 rounded p-2 text-sm text-red-500 uppercase"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <span> Remove from Cart</span>
                </button>
              ) : (
                <button
                  className="bg-indigo-500 border border-gray-300 w-1/2 rounded p-2 text-white uppercase"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductListing;
