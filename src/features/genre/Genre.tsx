import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {getGenresAsync, removeGenres, selectGenres} from "./genreSlice";
import {useAppDispatch} from "../../app/hooks";
import {AppDispatch} from "../../app/store";

function Genre() {
    const dispatch: AppDispatch = useAppDispatch();
    const genres = useSelector(selectGenres);

    useEffect(() => {
        dispatch(getGenresAsync());

        return () => {
            dispatch(removeGenres());
        }
    }, []);


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
                        <tr>
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

export default Genre;