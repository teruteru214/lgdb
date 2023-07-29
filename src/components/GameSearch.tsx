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
  url: string; // Added URL property
  rating: number; // Added rating property
}

const GameSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gameResults, setGameResults] = useState<Game[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post<Game[]>(
        "https://api.igdb.com/v4/games",
        `fields id, name, cover.url, genres.name, platforms.name, url, rating; limit 150; search "${searchQuery}";`,
        {
          headers: {
            "Client-ID": "8l6p4sfo8pyuwpoc2ki4ncbbjyrcw2",
            Authorization: "Bearer h5ck7192647pfg7nad3ln4xpnjhcda",
            "Accept-Language": "ja",
          },
        }
      );
      const resultsWithUrl = response.data.map((game) => ({
        ...game,
        url: `https://www.igdb.com/games/${game.id}`,
      }));
      setGameResults(resultsWithUrl);
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
              <img
                src={`${game.cover.url.replace("thumb", "cover_big")}`}
                alt="Game Cover"
                style={{ width: "300px", height: "auto" }}
              />
            )}
            {game.rating && <p>Rating: {game.rating}</p>}
            {game.url && (
              <p>
                <a href={game.url} target="_blank" rel="noopener noreferrer">
                  IGDB Link
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
