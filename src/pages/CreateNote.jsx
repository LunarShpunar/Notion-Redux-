import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./header/Navbar";

const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      ...formData,
      authorId: user.id,
      createdAt: Date.now(),
    };

    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "ADD_NOTE", payload: data });

        navigate(`/notes/${data.id}`);
      })
      .catch((error) => console.error("Ошибка при создании заметки:", error));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
        <button
          onClick={() => navigate("/notes")}
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          ← Назад к заметкам
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Создать новую заметку
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Название заметки
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите название заметки"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Тело заметки
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Введите текст заметки"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
