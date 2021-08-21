import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/AppWrapper';

import Home from './pages/Home';
import Upload from './pages/Upload';
import Videos from './pages/Videos';
import ViewCuts from './pages/ViewCuts';

import { routes } from './routes';

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <Home path={routes.home} />
      <Upload path={routes.upload} />
      <Videos path={routes.videos} />
      <ViewCuts path={routes.viewCuts} />
      <></>
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
