import React from "react";
import {IStudent} from "../student/studentModel";

export function updateFormStudentData(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setFormStudentData: React.Dispatch<React.SetStateAction<IStudent>>) : void {
    const {name, value} = event.target;

    if (name === 'student.address') {
        setFormStudentData((prevState: IStudent) => ({...prevState, address: value}));
    }

    if (name === 'student.entryDate') {
        setFormStudentData((prevState: IStudent) => ({...prevState, entryDate: new Date(value)}));
    }
}

export function updateFormStudentFavoriteGenresData(
    event: React.ChangeEvent<HTMLSelectElement>,
    setFormStudentData: React.Dispatch<React.SetStateAction<IStudent>>
) : void {
    const selectedOptions: number[] = Array.from(event.target.selectedOptions).map(option => parseInt(option.value));
    setFormStudentData((prevState: IStudent) => ({ ...prevState, favoriteGenreIds: selectedOptions }));
}