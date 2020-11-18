import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Payment from './Pages/Payment'
import Review from './Pages/Review'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/payment' component={Payment}></Route>
        <Route exact path='/review' component={Review}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes