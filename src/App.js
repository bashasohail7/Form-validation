import './App.css';
import React from 'react'
import { HashRouter,Route } from 'react-router-dom';
import Details from './details';
import Contactus from './form';

function App() {
  return (
    <HashRouter >
    <Route exact path="/" component={Contactus} />
    <Route  path="/details" component={Details} />
    </HashRouter>
  );
}

export default App;
