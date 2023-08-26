import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {serverRegisterStudent} from "./auth/authSlice";
import {IGenre} from "./genre/genreModels";
import {AppDispatch} from "../app/store";
import {useAppDispatch} from "../app/hooks";
import {getGenres, removeGenres, selectGenres} from "./genre/genreSlice";
import {IStudent} from "./student/studentModel";
import {updateFormStudentData, updateFormStudentFavoriteGenresData} from "./utils/studentHelper";
import {extractUserEmailFromJwt, extractUserFullNameFromJwt, getJwtToken} from "./utils/jwtHelpers";
import {NavigateFunction, useNavigate} from "react-router-dom";

const initialStudentFormData: IStudent = {
    firstName: "",
    lastName: "",
    email: "",
    favoriteGenreIds: [],
    address: "",
    entryDate: new Date(),
}

function Register() {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    const genres: IGenre[] = useSelector(selectGenres);

    const token: string = getJwtToken()!;
    const nameArray: string[] = extractUserFullNameFromJwt(token).split(' ');

    initialStudentFormData.firstName = nameArray[0];
    initialStudentFormData.lastName = nameArray.slice(1).join(' ');
    initialStudentFormData.email = extractUserEmailFromJwt(token);

    const [formStudentData, setFormStudentData] = useState<IStudent>(initialStudentFormData);

    useEffect(() => {
        dispatch(getGenres());

        return (() => {
            dispatch(removeGenres());
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        event.preventDefault();
        dispatch(serverRegisterStudent(formStudentData));
        navigate("/");
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) : void {
        updateFormStudentData(event, setFormStudentData);
    }

    function handleFavoriteGenreChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        updateFormStudentFavoriteGenresData(event, setFormStudentData);
    }

    return (
        <div>
            <header>
                <h1 className="center">Student Registration</h1>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <br />
                        <input
                            type="text"
                            name="student.firstName"
                            value={initialStudentFormData.firstName}
                            disabled
                        />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <br />
                        <input
                            type="text"
                            name="student.lastName"
                            value={initialStudentFormData.lastName}
                            disabled
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <br />
                        <input
                            type="email"
                            name="student.email"
                            value={initialStudentFormData.email}
                            disabled
                        />
                    </label>
                    <br />
                    <label>
                        Favourite Genres:
                        <br />
                        <select
                            name="student.favoriteGenres"
                            onChange={handleFavoriteGenreChange}
                            value={formStudentData?.favoriteGenreIds.map((genreId: number) => genreId.toString())}
                            multiple
                            required
                        >
                            {genres.map((genre: IGenre) => (
                                <option key={`genre_${genre.id}`} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Address:
                        <br />
                        <input
                            type="text"
                            name="student.address"
                            value={formStudentData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Entry Date:
                        <br />
                        <input
                            type="date"
                            name="student.entryDate"
                            value={formStudentData.entryDate.toISOString().split('T')[0]}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <div>
                        <input type="submit" className="btn-change" value="Register" />
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Register;