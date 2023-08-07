import {IBook, IBookFull} from "./bookModels";

export function createFullBook (book: IBook) : IBookFull {
     return {
        ...book,
        languageId: 1,
        pagesNumber: 1111,
        publisherId: 1,
        warehouse: {
            price: 66,
            quantity: 7
        },
    };
}

export function extractSimpleBook(fullBooks: IBookFull[]) : IBook[] {
    return fullBooks.map((fullBook: IBookFull) => {
        return {
            ...fullBook,
        };
    });
}

export function handleError(error: any, message: string, bookInfo?: IBookFull) : void {
    console.log(`Display message: ${message}`);
    console.log(`Error message: ${error}`);

    if (bookInfo) {
        console.log(bookInfo);
    }

    alert(message);
}