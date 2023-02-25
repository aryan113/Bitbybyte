import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.css';
import { Client } from "./modules/client/client";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                path="/"
                element={<Client />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
