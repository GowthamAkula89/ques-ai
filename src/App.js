import React from 'react';
import './App.css';
import Header from './Components/Header/header';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';
import HeroSection from './Components/HeroSection/heroSection';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header/>
        <HeroSection/>
      </Provider>
    </div>
  );
}

export default App;
