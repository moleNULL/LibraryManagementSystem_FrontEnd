export interface IBook {
    id?: number,
    title: string,
    year: number,
    description?: string | undefined,
    authorId: number,
    genreIds: number[],
}

export interface IBookFull extends IBook {
    pagesNumber: number,
    publisherId: number,
    warehouse: {
        price: number,
        quantity: number,
    },
    languageId: number,
}