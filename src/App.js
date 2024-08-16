import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/welcomePage';
import LoginOrRegisterPage from './Pages/loginOrRegisterPage';
import { SnackbarProvider } from 'notistack';
import HomePage from './Pages/homePage';
function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path='/' element={<WelcomePage/>}/>
              <Route path='/login' element = {<LoginOrRegisterPage/>}/>
              <Route path='/register' element = {<LoginOrRegisterPage/>}/>
              <Route path='/homepage' element = {<HomePage/>}/>
            </Routes>
          </Router>
        </Provider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
