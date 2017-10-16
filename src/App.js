import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import BlogList from './blog-list.js';
import BlogEntry from './blog-entry.js';
import { Grid } from 'react-bootstrap';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Grid fluid>
            <a href="/" className="app-title">Anton Panchenko</a>
          </Grid>
        </header>

        <Grid>
          <Router>
            <Switch>
              <Route path="/" exact component={BlogList} />
              <Route path="/:id" component={BlogEntry} />
            </Switch>
          </Router>
        </Grid>
      </div>
    );
  }
}