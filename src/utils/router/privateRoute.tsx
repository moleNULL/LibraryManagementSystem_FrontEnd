import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRouteProps {
    isAllowed: boolean;
    redirectPath: string;
    children?: any;
}

function PrivateRoute({isAllowed, redirectPath, children}: PrivateRouteProps) {
    console.log(isAllowed);
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
}

export default PrivateRoute;