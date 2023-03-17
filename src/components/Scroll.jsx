import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Scroll = () => {
  const [characters, setCharacters] = useState([]);  // lista de personajes
  const [numberPage, setNumberPage] = useState(1) // numero de pagina

  const getList = () => {
    let api = `https://rickandmortyapi.com/api/character/?page=${numberPage}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        console.log("se solicito informacion", data.results);
        let newCharacters = data.results // resultado de la llamada a la api
        setCharacters([...characters, ...newCharacters]); // union del array anterior con el nuevo array de personajes
      });
  };

  // funcion para avanzar de pagina

  const nextPage = () => {
    setNumberPage(prev => prev + 1 )
  }

  // cada ves que el numero de pagina cambie 
  // se ejecuta el getlist obteniendo los nuevos personajes y renderizandolos
  useEffect(() => {
    getList();
  }, [numberPage]);



  return (
    <section className="pt-20 flex justify-center">
      {characters.length > 0 ? (
        <InfiniteScroll
          dataLength={characters.length} //cantidad total del array
          next={() => {
            nextPage(); // funcion que se ejecuta cuando se llega al ultimo elemento array
          }}
          hasMore={true} // obtener mas resultados (true)
          loader={<p>Loading...</p>} // por si demora la carga aparece un loader
        >
          <header className="text-center w-full">
            <h1 className="font-bold text-3xl py-5 mb-14">
              Personajes de Rick and Morty
            </h1>
          </header>
          <div className="flex max-w-6xl flex-wrap gap-8 justify-center">
            {characters.map((item) => {
              return (
                <div
                  key={item.id + item.name}
                  className="flex flex-col items-center"
                >
                  <div className=" max">
                    <img
                      src={item.image}
                      alt="foto"
                      className="object-cover w-full rounded-full"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <strong className="text-xl">{item.name}</strong>
                    <p>{item.species}</p>
                    <p>{item.gender}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <h3>No se encontraron personajes</h3>
      )}
    </section>
  );
};

export default Scroll;
