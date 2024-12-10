import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./header/Navbar";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = useSelector((state) => state.notes.find((note) => note.id === id));

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    createdAt: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
  
    if (!currentUser) {
      navigate("/");
      return;
    }
  
    fetch(`http://localhost:5000/notes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Заметка не найдена");
        }
        return res.json();
      })
      .then((data) => {
        if (data.authorId !== currentUser.id) {
          throw new Error("У вас нет доступа к этой заметке");
        }
        setFormData({
          title: data.title,
          body: data.body,
          createdAt: data.createdAt,
        });
      })
      .catch((error) => {
        console.error(error.message);
        navigate("/notes");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedNote = {
      ...note,
      ...formData,
      updatedAt: Date.now(),
    };

    dispatch({ type: "UPDATE_NOTE", payload: updatedNote });

    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/notes/${id}`);
      })
      .catch((error) => console.error("Ошибка при обновлении заметки:", error));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
        <button
          onClick={() => navigate(`/notes/${id}`)}
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          ← Назад
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Редактировать заметку</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="text-lg font-medium text-gray-700">
              Название заметки
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="body" className="text-lg font-medium text-gray-700">
              Тело заметки
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition"
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
