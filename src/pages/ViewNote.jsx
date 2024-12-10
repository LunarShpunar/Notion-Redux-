import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./header/Navbar";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = useSelector((state) => state.notes.find((note) => note.id === id));

  useEffect(() => {
    if (!note) {
      fetch(`http://localhost:5000/notes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "ADD_NOTE", payload: data });
        })
        .catch((error) => console.error("Ошибка при загрузке заметки:", error));
    }
  }, [id, dispatch, note]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatch({ type: "DELETE_NOTE", payload: id });
        navigate("/notes");
      })
      .catch((error) => console.error("Ошибка при удалении заметки:", error));
  };

  if (!note) {
    return <p>Заметка не найдена.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
        <button
          onClick={() => navigate("/notes")}
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
          ← Назад
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 break-words mb-4">{note.title}</h1>
        <pre className="text-gray-700 whitespace-pre-line break-words">{note.body}</pre>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/notes/${note.id}/edit`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            ✍️ Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            🗑 Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
