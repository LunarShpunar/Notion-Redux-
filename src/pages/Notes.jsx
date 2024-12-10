import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./header/Navbar";

const Notes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetch(`http://localhost:5000/notes?authorId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_NOTES", payload: data });
      })
      .catch((error) => console.error("Ошибка при загрузке заметок:", error));
  }, [user, dispatch, navigate]);

  const handleDelete = (noteId) => {
    fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatch({ type: "DELETE_NOTE", payload: noteId });
      })
      .catch((error) => console.error("Ошибка при удалении заметки:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Ваши заметки</h1>
          <a
            href="/notes/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            + Новая заметка
          </a>
        </div>
        {notes.length > 0 ? (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/notes/${note.id}`)}
              >
                <h2 className="text-xl font-semibold text-gray-800 break-words">
                  {note.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Создано: {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/notes/${note.id}/edit`);
                    }}
                    className="text-yellow-500 hover:underline"
                  >
                    ✍️ Редактировать
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    🗑 Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            У вас пока нет заметок. Создайте первую!
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
