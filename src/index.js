import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import NotFound from './components/NotFound';
import './index.css';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}
render(
  <Root />,
  document.getElementById('root')
);
