import {useEffect} from 'react'

function UpdateBookNotification({ isBookUpdated }: any) {

    useEffect(() => {
        if (isBookUpdated === true) {
            alert('Book updated successfully');
        }
        else if (isBookUpdated === false) {
            alert('Failed to update the book');
        }
    }, [isBookUpdated]);

    return null;
}

export default UpdateBookNotification;