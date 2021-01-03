import Recipe from './components/Recipe';
import Details from './components/Details';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route
            exact
            component={UpdateRecipe}
            path='/updateRecipe/:id'
          ></Route>
          <Route exact component={AddRecipe} path='/addRecipe'></Route>
          <Route exact component={Recipe} path='/'></Route>
          <Route exact component={Details} path='/recipes/:id'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
