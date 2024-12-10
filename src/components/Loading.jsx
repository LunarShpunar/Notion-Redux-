const Loading = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <span className="ml-3 text-blue-500">Загрузка...</span>
      </div>
    );
  };
  
  export default Loading;
  