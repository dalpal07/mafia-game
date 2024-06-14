import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';

import App from './App';
import { GlobalProvider } from './contexts/global';

createRoot(document.querySelector('#root')).render(
    <GlobalProvider>
        <App />
    </GlobalProvider>
);