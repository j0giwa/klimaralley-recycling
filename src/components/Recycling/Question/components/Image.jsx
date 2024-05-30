const Image = ({ image, index }) => {
    return (
      <>
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={image}
          alt={`Frage-${index + 1}`}
        />{" "}
      </>
    );
  };
  
  export default Image;
  