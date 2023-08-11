import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import {GoogleOAuthProvider} from "@react-oauth/google";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <GoogleOAuthProvider clientId="461786025188-f0hs6dtdnqmj636r5t8r5ei26vqtn8mb.apps.googleusercontent.com">
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
    //<React.StrictMode>
    //</React.StrictMode>
);
