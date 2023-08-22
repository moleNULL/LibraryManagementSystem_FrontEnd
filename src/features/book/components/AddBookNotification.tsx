import {useEffect} from "react";


function AddBookNotification({ addBookStatus }: any) {

    useEffect(() => {
        if (addBookStatus.isAdded === true) {
            alert(`Last inserted id: ${addBookStatus.lastInsertedId}`);
        }
        else if (addBookStatus.isAdded === false) {
            alert('Failed to add the book');
        }


    }, [addBookStatus]);

    return null;
}

export default AddBookNotification;