import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/AppWrapper';
import Home from './pages/Home';
import { routes } from './routes';
import fs from 'fs'

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <Home path={routes.home} />
      <></>
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
