import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {getGenres, removeGenres, selectGenres, selectIsGenreLoading} from "./genreSlice";
import {useAppDispatch} from "../../app/hooks";
import {AppDispatch} from "../../app/store";
import Spinner from "../Spinner";
import {IGenre} from "./genreModels";

function GenreList() {
    const dispatch: AppDispatch = useAppDispatch();
    const genres: IGenre[] = useSelector(selectGenres);
    const isLoading: boolean = useSelector(selectIsGenreLoading);

    useEffect(() => {
        dispatch(getGenres());

        return () => {
            dispatch(removeGenres());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
      <div>
          <h1 className="center">Genres Page</h1>

        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
            {
                genres?.length > 0 ? genres.map(genre => (
                        <tr key={`genre_${genre.id}`}>
                            <td>{genre.id}</td>
                            <td>{genre.name}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={2}>No genres found</td>
                        </tr>
                    )
            }
            </tbody>
        </table>
      </div>
    );
}

export default GenreList;