import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.removeItem("user");
  
    await dispatch({ type: "LOGOUT" });
  
    navigate("/");
  };
  
  return (
    <nav className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">Notion</h1>
        <div className="ml-auto space-x-4">
          <button
            onClick={() => navigate("/home")}
            className="hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            About
          </button>
          <button
            onClick={() => navigate("/notes")}
            className="hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Notes
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
