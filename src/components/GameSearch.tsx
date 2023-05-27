import React, { useState } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
  cover: {
    id: number;
    url: string;
  };
  genres: {
    id: number;
    name: string;
  }[];
  platforms: {
    id: number;
    name: string;
  }[];
}

const GameSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameResults, setGameResults] = useState<Game[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post<Game[]>(
        "https://api.igdb.com/v4/games",
        `fields id, name, cover.url, genres.name, platforms.name; limit 28; search "${searchQuery}";`,
        {
          headers: {
            "Client-ID": "8l6p4sfo8pyuwpoc2ki4ncbbjyrcw2",
            Authorization: "Bearer hyfx0bh9p03ts1vo06hslw7xuptok1",
            "Accept-Language": "ja",
          },
        }
      );
      setGameResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {gameResults.map((game) => (
          <div key={game.id}>
            <h3>{game.name}</h3>
            {game.genres && (
              <p>Genre: {game.genres.map((genre) => genre.name).join(", ")}</p>
            )}
            {game.platforms && (
              <p>
                Platform:{" "}
                {game.platforms.map((platform) => platform.name).join(", ")}
              </p>
            )}
            {game.cover && game.cover.url && (
              <img src={game.cover.url} alt="Game Cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
