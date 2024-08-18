import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/welcomePage';
import LoginOrRegisterPage from './Pages/loginOrRegisterPage';
import { SnackbarProvider } from 'notistack';
import HomePage from './Pages/homePage';
import ProjectPage from './Pages/projectPage';
import FileEditPage from './Pages/fileEditPage';

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
              <Route path="/project" element = {<ProjectPage isProjectsPage={true}/>}/>
              <Route path="/:projectId/files/:fileId/edit" element= {<FileEditPage isProjectsPage={true}/>}/>
            </Routes>
          </Router>
        </Provider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
