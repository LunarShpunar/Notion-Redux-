import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./header/Navbar";
import Loading from "../components/Loading";

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <>
          <Navbar />
          <div className="flex justify-center items-center h-screen">
            <div className="max-w-lg bg-white rounded-lg shadow-lg p-6 text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Добро пожаловать, <span className="text-blue-500">{user.email}</span>!
              </h1>
              <p className="mt-4 text-gray-600">
                Дата регистрации:{" "}
                <span className="font-medium text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>
              <a
                href="/notes"
                className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Перейти к заметкам
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loading /> {}
        </div>
      )}
    </div>
  );
};

export default Home;
