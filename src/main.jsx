import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Pokemon from "./Pokemon/Pokemon";
import "./index.css";
import App from "./App";
import Loader1 from "./Pokemon/Loader1";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/Pokemon"
        element={
          <Suspense fallback={<Loader1 />}>
            <Pokemon />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);
