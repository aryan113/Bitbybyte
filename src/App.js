import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import './App.scss';
import { Client } from "./modules/client/client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Admin } from "./modules/admin/admin";
import './services/common/interceptor';
import { PostList } from "./modules/client/post-list/post-list";
import { PostDetail } from "./modules/client/post-detail/post-detail";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsbq_hwfWzFqu8IPxE2BiCZ79Jm4EsL7Q",
  authDomain: "anarock-reshorts.firebaseapp.com",
  databaseURL: "https://anarock-reshorts-default-rtdb.firebaseio.com",
  projectId: "anarock-reshorts",
  storageBucket: "anarock-reshorts.appspot.com",
  messagingSenderId: "297943186229",
  appId: "1:297943186229:web:8b9b005055f256a1592a7c",
  measurementId: "G-M1C7ZSXNF0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                path="/"
                element={<PostList />}
              />
              <Route
                path="/post/:id"
                element={<PostDetail />}
              />
              <Route
                path="/admin"
                element={<Admin />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
