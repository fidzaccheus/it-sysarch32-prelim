import { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPokemonList(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLangChange = (lang) => {
    setLanguage(lang);
  };

  const renderPokemonList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    return pokemonList.map((pokemon) => (
      <Pokemon
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name[language]}
        image={pokemon.image}
      />
    ));
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key="back"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Back
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <div>
      <div className="langButtonContainer">
        <button onClick={() => handleLangChange("english")}>English</button>
        <button onClick={() => handleLangChange("japanese")}>
          Japanese
        </button>
        <button onClick={() => handleLangChange("chinese")}>Chinese</button>
        <button onClick={() => handleLangChange("french")}>French</button>
      </div>
      <div className="paginationButtons">
        <p>
          {currentPage} out of {totalPages}
        </p>
        {renderPaginationButtons()}
      </div>
      <div>{renderPokemonList()}</div>
    </div>
  );
};

export default Pokedex;
