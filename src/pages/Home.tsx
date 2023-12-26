import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListAnimeLoading from "../components/loadings/ListAnimeLoading";

const { VITE_BASE_URL } = import.meta.env;

const Home = () => {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_BASE_URL}?page=${page}`);
      const list = await response.json();
      if (response?.status == 200) {
        setAnimeList(list?.data);
      } else if (response?.status == 429) {
        throw Error();
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  animeList && console.log(animeList);

  if (error) {
    return (
      <section className="flex min-h-screen justify-center items-center">
        <h1 className="text-xl text-slate-700">
          Kamu terlalu banyak request sayang...
        </h1>
      </section>
    );
  }

  return (
    <div className="bg-primary-dark">
      <main className="min-h-screen md:p-10 p-5 max-md:py-10">
        <section className="pb-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-light">Weenime</h1>
          </div>
        </section>
        {loading ? (
          <ListAnimeLoading />
        ) : (
          <section className="grid md:grid-cols-5 grid-cols-2 gap-4">
            {animeList?.map((anime, index) => {
              return (
                <div key={index} className="relative">
                  <div className="rounded overflow-hidden">
                    <img
                      src={anime?.images?.webp?.large_image_url}
                      alt="Anime Thumbnail"
                      className="w-full object-contain hover:scale-125 transition-all ease duration-300"
                    />
                  </div>
                  <div className="w-full p-2 absolute left-0 bottom-0 bg-gradient-to-b from-transparent to-black">
                    <p className="text-primary-dark">{anime?.title_japanese}</p>
                    <h3 className="text-lg font-semibold text-primary-dark">
                      <a href={anime?.url} target="_blank">
                        {anime?.title}
                      </a>
                    </h3>
                    <p className="text-primary-dark flex justify-between">
                      <small>{anime?.episodes} Episode</small>
                      <small className="text-yellow-400">
                        {anime?.score} 🌟
                      </small>
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        )}
        <section className="pt-6 flex justify-center items-center">
          <div className="mx-auto flex gap-1">
            <Link
              onClick={() => setPage((prev) => prev - 1)}
              to={`?page=${page - 1}`}
              className="inline-block py-2 px-5 rounded bg-rose-500 text-white hover:text-rose-500 border border-rose-500 hover:bg-transparent transition-all ease duration-300"
            >
              Prev
            </Link>
            <Link
              onClick={() => setPage((prev) => prev + 1)}
              to={`?page=${page + 1}`}
              className="inline-block py-2 px-5 rounded bg-rose-500 text-white hover:text-rose-500 border border-rose-500 hover:bg-transparent transition-all ease duration-300"
            >
              Next
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
