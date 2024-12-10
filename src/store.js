import { createStore } from 'redux';
import { loadState, saveState } from './localStorageMiddleware';

const initialState = {
  user: null,
  notes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload };
  
        case 'LOGOUT':
          return { ...state, user: null, notes: [] }; // Обнуляем данные о пользователе и заметках
  
      case "SET_NOTES":
        // Проверяем, что payload — это массив заметок
        return {
          ...state,
          notes: Array.isArray(action.payload) ? action.payload : [],
        };
  
      case "DELETE_NOTE":
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
        };
  
      case "UPDATE_NOTE":
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload.id ? action.payload : note
          ),
        };

        case "ADD_NOTE": // Новый case для добавления заметки
        return {
          ...state,
          notes: [...state.notes, action.payload],
        };
  
      default:
        return state;
    }
  };
  

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Сохраняем состояние при каждом изменении
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
