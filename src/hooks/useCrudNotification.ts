import {useEffect} from "react";

export default function useCrudNotification(operation: string, condition: boolean | undefined, info?: string) : void {
    useEffect(() => {
        if (condition === true) {
            let notification: string = `${operation}: [success]`;
            if (info) {
                notification += `\n${info}`;
            }

            alert(notification);
        }
        else if (condition === false) {
            alert(`${operation}: [failure]`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [condition]);
}