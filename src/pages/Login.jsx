import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Пожалуйста, введите корректный email");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`
      );

      const users = await response.json();

      if (users.length === 0) {
        setError("Неверный email или пароль");
      } else {
        const user = users[0];
        login(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      }
    } catch (error) {
      setError("Произошла ошибка при авторизации");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Вход
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваш email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Пароль</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваш пароль"
            />
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Войти
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Нет аккаунта?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Зарегистрируйтесь
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch({ type: "LOGIN_SUCCESS", payload: user }),
});

export default connect(null, mapDispatchToProps)(Login);
