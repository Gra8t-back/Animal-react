import  { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

// Hamta Nuvarande datum och tid.
const today = new Date();

// Skapa Date genom att använda variabeln "Today".
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();


  // Skapa tid genom att använda dagens variabel
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + " " + time;

const AnimalDetail: FC = () => {
  // Hämta Query parameter genom att använda useParams() hook
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [filteredObject, setFilteredObject] = useState<any>();
  const [updatedObject, setupdatedObject] = useState(false);

  useEffect(() => {
    
    
     // På komponentmontering hämta animalData från lokal storage
    const animalData = localStorage.getItem("animals");


    // Parse lokal storage data med JSON.parse()

    const parsedObject = JSON.parse(animalData || ""); 

    // Efter parsning satte detta djur analyserade data till ett tillstånd som deklarerats ovan som en setData
    setData(parsedObject);
    // Filtrera data genom att använda frågeparametern ovan som ett id
    const filterAnimal =
      parsedObject && parsedObject.filter((a: any) => a.name === id);
      // Ställ in filtrerade data i tillståndet setFilter Object() som deklarerats ovan.
    setFilteredObject(filterAnimal);// eslint-disable-next-line
  }, [updatedObject]);

  // Feed Animal Handler
  const setUpdatedObject = (filterAnimal: any) => {
    // när användaren klickar på knappen Mata djur kommer denna funktion att köras och vi har en funktionsparameter filterAnimal och nedan kommer vi att uppdatera isFed-statusen och aktuellt datum och tid
    const updatedObject = {
      id: filterAnimal[0] && filterAnimal[0].id,
      name: filterAnimal[0] && filterAnimal[0].name,
      latinName: filterAnimal[0] && filterAnimal[0].latinName,
      yearOfBirth: filterAnimal[0] && filterAnimal[0].yearOfBirth,
      shortDescription: filterAnimal[0] && filterAnimal[0].shortDescription,
      longDescription: filterAnimal[0] && filterAnimal[0].longDescription,
      imageUrl: filterAnimal[0] && filterAnimal[0].imageUrl,
      medicine: filterAnimal[0] && filterAnimal[0].medicine,
      isFed: true,
      lastFed: dateTime,
    };
    setupdatedObject(true);
    // Detta är metoden med vilken vi ställer in uppdaterade objekt i lokal lagring
    const indexOfItemInArray = data.findIndex(
      (q: any) => q.id === updatedObject.id
    );
    data.splice(indexOfItemInArray, 1, updatedObject);
    localStorage.setItem("animals", JSON.stringify(data));
  };
  // Senast tiden och datum som djuren matade(lastFed)
  const lastFedd =
    filteredObject && filteredObject[0] && filteredObject[0].lastFed;

  return (
    <div className="bg-neutral-100 w-full h-full pt-[100px] pb-[100px]">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div>
          <img
            src={
              filteredObject && filteredObject[0] && filteredObject[0].imageUrl
            }
            alt={filteredObject && filteredObject[0] && filteredObject[0].name}
            className="w-full h-[500px] object-cover mb-10"
          />
          <h1 className="text-2xl font-semibold pb-5">
            {/* Använde React Moment-paketet för datum och tidsformat */}
            Last Fed: <Moment format="YYYY-MM-DD">{lastFedd}</Moment>
          </h1>
          <h1 className="text-3xl font-semibold pb-5">
            {filteredObject && filteredObject[0] && filteredObject[0].name}
          </h1>
          <p className="text-sm pb-10">
            {filteredObject &&
              filteredObject[0] &&
              filteredObject[0].longDescription}
          </p>
          <div className="pb-20">
            {/*Kontrollerar om djuret redan har matats eller inte   */}
            {filteredObject &&
            filteredObject[0] &&
            filteredObject[0].isFed === false ? (
              <button
                onClick={() => setUpdatedObject(filteredObject)}
                className="text-base bg-lime-600 text-white px-10 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl"
              >
                Feed Animal
              </button>
            ) : (
              <button className="text-base bg-gray-400 text-white px-10 py-3 rounded-full font-semibold cursor-not-allowed">
                Feeded
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
