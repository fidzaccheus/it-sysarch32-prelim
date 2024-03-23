const Pokemon = ({ id, name, image }) => {
  return (
    <div className="pokemon">
      <img src={image} alt={name.english} />
      <p>[{id}] {name}</p>
    </div>
  );
};

export default Pokemon;