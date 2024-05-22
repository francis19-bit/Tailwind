import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./statemanager/store.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BackgroundCatalog from "./statemanager/BackgroundCatalog.jsx";
import "./index.css";

let persistor = persistStore(store);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BackgroundCatalog>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <App /> {/* <MobileVideoDisplayCarousel /> */}
          </QueryClientProvider>
        </BackgroundCatalog>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
