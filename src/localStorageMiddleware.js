const loadState = () => {
    try {
      const serializedState = localStorage.getItem('appState');
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
      console.error('Error loading state:', err);
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('appState', serializedState);
    } catch (err) {
      console.error('Error saving state:', err);
    }
  };
  
  export { loadState, saveState };
  