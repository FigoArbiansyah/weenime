import { useState, useEffect } from "react";
import ListAnimeLoading from "../components/loadings/ListAnimeLoading";
import ManyRequest from "../components/errors/ManyRequest";
import Card from "../components/cards/Card";
import Button from "../components/Button";
import {
  getItem as getStorageItem,
  setItem as setStorageItem,
} from "../helpers/localStorage";
import Footer from "../components/Footer";

const { VITE_BASE_URL } = import.meta.env;
const CURRENT_PAGE = getStorageItem("page") || 1;

const Home = () => {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [metadata, setMetadata] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [page, setPage] = useState<number>(CURRENT_PAGE);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${VITE_BASE_URL}?page=${page}`);
      const list = await response.json();
      if (response?.status == 200) {
        setAnimeList(list?.data);
        setMetadata(list?.pagination);
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

  if (error) {
    return <ManyRequest />; // Error page
  }

  return (
    <div className="bg-primary-dark">
      <main className="min-h-screen md:p-10 max-md:py-10 max-md:px-4">
        <section className="pb-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500 text-transparent">
              Weenime
            </h1>
          </div>
        </section>
        {loading ? (
          <ListAnimeLoading />
        ) : (
          <section className="grid md:grid-cols-5 grid-cols-2 gap-4">
            {animeList?.map((anime, index) => {
              return <Card key={index} item={anime} />;
            })}
          </section>
        )}
        <section className="pt-6 flex justify-center items-center">
          <div className="mx-auto flex gap-1">
            {page != 1 && (
              <Button
                onClick={() => {
                  const prevPage = page - 1;
                  setPage(prevPage);
                  setStorageItem("page", prevPage);
                }}
              >
                Prev
              </Button>
            )}
            {page != metadata?.last_visible_page && (
              <Button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  setStorageItem("page", nextPage);
                }}
              >
                Next
              </Button>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
