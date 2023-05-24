import React, { useState } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
  cover: {
    id: number;
    url: string;
  };
}

const GameSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameCovers, setGameCovers] = useState<Game[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post<Game[]>(
        "https://api.igdb.com/v4/games",
        `fields id, name, cover.url; limit 28; search "${searchQuery}";`,
        {
          headers: {
            "Client-ID": "8l6p4sfo8pyuwpoc2ki4ncbbjyrcw2",
            Authorization: "Bearer hyfx0bh9p03ts1vo06hslw7xuptok1",
            "Accept-Language": "ja",
          },
        }
      );
      setGameCovers(response.data);
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
        {gameCovers.map((game) => (
          <div key={game.id}>
            <h3>{game.name}</h3>
            <img src={game.cover.url} alt="Game Cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
