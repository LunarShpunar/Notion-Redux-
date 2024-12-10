import React, { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = z
    .object({
      email: z.string().email("Неверный формат email"),
      password: z
        .string()
        .min(8, "Пароль должен быть не менее 8 символов")
        .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
        .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
        .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      schema.parse(formData);

      const user = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: user });

      navigate("/");
    } catch (err) {
      setErrors(err.formErrors?.fieldErrors || {});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Регистрация
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <ul className="text-red-500 list-disc ml-5">
                {Array.isArray(errors.password) ? (
                  errors.password.map((error, index) => <li key={index}>{error}</li>)
                ) : (
                  <li>{errors.password}</li>
                )}
              </ul>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Повторите пароль</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Повторите ваш пароль"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Уже есть аккаунт?</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
