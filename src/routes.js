import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Payment from './Pages/Payment'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/payment' component={Payment}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes