import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import VanillaRouteButton from '../vanilla/components/VanillaRouteButton'
import VanillaNormal from '../vanilla/components/VanillaNormal'
import VanillaFluent from '../vanilla/components/VanillaFluent'
import Dfooter from '../generalComponents/Dfooter'

function Vanilla() {
  return (
    <section className="vanilla">
      <header className="vanilla__header">
        <h1 className="vanilla__header__item">Vanilla Web Live Compiler</h1>
      </header>
      <Router>
        <VanillaRouteButton />
        <Switch>
          <Route exact path="/nvanilla" to component={VanillaNormal} />
          <Route exact path="/fvanilla" to component={VanillaFluent} />
        </Switch>
      </Router>
      <Dfooter />
    </section>
  )
}

export default Vanilla
