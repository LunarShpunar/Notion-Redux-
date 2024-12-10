import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./header/Navbar";

const NotFound = () => {
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-4xl font-extrabold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Страница не найдена</h2>
          <p className="text-gray-600 mb-6">
            Извините, страница, которую вы ищете, не существует или была перемещена.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <button
                onClick={() => navigate("/home")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Перейти на главную
              </button>
            ) : (
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Перейти на страницу входа
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
