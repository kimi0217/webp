import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Signin from './components/signin';
import Personalpage from './components/Home';
import Newpost from './components/newposts';
function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/signin" element={<Signin/>} ></Route>
        <Route path="/posts" element={<Newpost/>} ></Route>
        <Route path="/Home" element={<Personalpage/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
