import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css"
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const handleSearch = async (query: string) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelect = (movie: Movie) => { 
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  }
  
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {isModalOpen && <MovieModal onClose={handleClose} movie={selectedMovie }/>}
    </div>
  )
}