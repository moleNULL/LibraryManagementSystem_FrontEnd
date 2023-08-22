import {useEffect} from 'react'

function DeleteBookNotification({ isBookDeleted }: any) {

    useEffect(() => {
        if (isBookDeleted === true) {
            alert('Book deleted successfully');
        }
        else if (isBookDeleted === false) {
            alert('Failed to delete the book')
        }
    }, [isBookDeleted]);

    return null;
}

export default DeleteBookNotification;