import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ onClick, itemCount, handleSearching }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isCartPage = location.pathname === "/cart";

  return (
    <div className="bg-blue-100 border-b border-gray-300 w-full h-[10%] flex justify-between items-center py-2 px-2 fixed z-50">
      <img
        src={logo}
        alt="logo"
        className="w-[100px] md:w-[150px] h-[80px] cursor-pointer"
        onClick={() => navigate("/")}
      />

      {!isCartPage && (
        <input
          type="text"
          className="w-1/2 border border-gray-300 p-2 rounded-md outline-none"
          placeholder="Search for anything..."
          onChange={(e) => handleSearching(e)}
        />
      )}

      <button
        onClick={() => {
          if (isCartPage) navigate("/");
          else navigate("/cart");

          onClick(); // toggle cart icon animation if needed
        }}
      >
        {isCartPage ? (
          <i className="fa-solid fa-arrow-left text-xl"></i>
        ) : (
          <div className="relative cursor-pointer">
            <i className="fa-solid fa-cart-shopping text-2xl text-black"></i>
            {itemCount > 0 && (
              <div className="bg-red-600 text-white text-xs rounded-full w-[18px] h-[18px] absolute -top-2 -right-2 flex items-center justify-center">
                {itemCount}
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  );
}

export default Navbar;
