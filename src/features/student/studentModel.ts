export interface IStudent {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    favoriteGenreIds: number[],
    address: string,
    entryDate: Date,
}