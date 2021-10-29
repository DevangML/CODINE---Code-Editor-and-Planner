import React from 'react'
import VanillaRouteButton from '../components/vanilla/VanillaRouteButton'
import VanillaNormal from '../components/vanilla/VanillaNormal'
import VanillaFluent from '../components/vanilla/VanillaFluent'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dfooter from '../components/general/Dfooter'

function Vanilla() {
  return (
    <section className="vanilla">
      <header className="vanilla__header">
        <h1 className="vanilla__header__item">Vanilla Web Live Compiler</h1>
      </header>
      <Router>
        <VanillaRouteButton />
        <Switch>
          <Route path="/nvanilla">
            <VanillaNormal />
          </Route>
          <Route path="/fvanilla">
            <VanillaFluent />
          </Route>
        </Switch>
      </Router>
      <Dfooter />
    </section>
  )
}

export default Vanilla
