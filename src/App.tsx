import { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AnimalDetail from "./components/Home/AnimalDetail";
import data from "../src/config/data.json";

const App: FC = () => {
  const [animlaData, setAnimlaData] = useState<any>([]);

  useEffect(() => {
    // Få data från lokal Storage
    const animalData = localStorage.getItem("animals");
    // Kontrollera Om animalData är null, ställ in data i lokal storage annars får den data
    // från lokal Storage på rad 19 och kommer att spara denna data i animlaData-tillstånd
    if (animalData === null) {
      setAnimlaData(data);
      localStorage.setItem("animals", JSON.stringify(data));
    } else {
      const animalData = localStorage.getItem("animals");
      const parsedObject = JSON.parse(animalData || "");
      // Ställ in Parsed object till state
      setAnimlaData(parsedObject);
    }
  }, []);

  return (
    <div>
      <Routes>
        {/* Skicka djurdata som en rekvisita till hemmets komponent där visar vi listan över djur  */}
        <Route path="/" element={<Home animlaData={animlaData} />} />
        {/*Djurdetaljsida */}
        <Route path="animal/:id" element={<AnimalDetail />} />
      </Routes>
    </div>
  );
};

export default App;
