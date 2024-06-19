import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { VariableProvider } from "./contexts/variables";
import { CommunicationProvider } from "./contexts/communications";
import { ActionProvider } from "./contexts/actions";

createRoot(document.querySelector("#root")).render(
  <VariableProvider>
    <CommunicationProvider>
      <ActionProvider>
        <App />
      </ActionProvider>
    </CommunicationProvider>
  </VariableProvider>,
);
