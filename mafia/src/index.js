import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';

import App from './App';
import { CommunicationProvider } from './contexts/communications';
import { VariableProvider } from './contexts/variables';
import { ActionProvider } from './contexts/actions';

createRoot(document.querySelector('#root')).render(
    <VariableProvider>
        <ActionProvider>
            <CommunicationProvider>
                <App />
            </CommunicationProvider>
        </ActionProvider>
    </VariableProvider>
);