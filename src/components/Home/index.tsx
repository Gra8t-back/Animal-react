import { FC } from "react";
import { Link } from "react-router-dom";
interface Props {
  animlaData: any;
}
// Fick animlaData som en prop som skickades från App.tsx och mappade data med hjälp av kartmetoden
const Home: FC<Props> = ({ animlaData }) => {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
          {animlaData.map((item: any) => {
            return (
              <Link to={`animal/${item.name}`}>
                <div
                  key={item.id}
                  className=" shadow-lg cursor-pointer rounded-md transition-all duration-500 hover:-translate-y-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-[300px] object-cover mb-3 rounded-t-lg"
                  />

                  <div className="px-4 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h1>
                    <p className="text-sm font-normal text-gray-600">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
