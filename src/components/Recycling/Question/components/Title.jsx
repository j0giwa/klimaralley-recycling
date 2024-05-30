const Title = ({ title, index }) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Frage-{index + 1}</h2>
        <p className="text-gray-700 mb-4">{title}</p>
      </div>
    );
  };
  
  export default Title;
  