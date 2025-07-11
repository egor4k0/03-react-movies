import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
}

export async function fetchMovies(query:string): Promise<Movie[]> {
  const myKey = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL: string = "https://api.themoviedb.org/3/search/movie";
  const page = 1;

  try {
    const response = await axios.get<MovieHttpResponse>(BASE_URL, {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      }
    })
    return response.data.results;
  } catch {
    throw new Error("Fetch failed")
  }
}