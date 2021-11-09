// import './app.css'
import React, { useEffect, useState } from 'react'
import Sidebar from './components/general/Sidebar'
import Vanilla from './pages/Vanilla'
import Home from './pages/Home'
import Oop from './pages/Oop'
import Pop from './pages/Pop'

import ContactMe from './pages/ContactMe'
import ProjectPlanner from './pages/ProjectPlanner'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Dev Styles

import './styles/componentStyles/genralComponentStyles/dfooter.css'
import './styles/componentStyles/genralComponentStyles/navBar.css'
import './styles/componentStyles/projectPlannerComponentStyles/addList.css'
import './styles/componentStyles/projectPlannerComponentStyles/board.css'
import './styles/componentStyles/projectPlannerComponentStyles/card.css'
import './styles/componentStyles/projectPlannerComponentStyles/cardEditor.css'
import './styles/componentStyles/projectPlannerComponentStyles/editButtons.css'
import './styles/componentStyles/projectPlannerComponentStyles/list.css'
import './styles/componentStyles/projectPlannerComponentStyles/listEditor.css'
import './styles/pageStyles/home.css'
import './styles/componentStyles/homeComponentStyles/heroStyles.css'
import './styles/componentStyles/homeComponentStyles/mainOneStyles.css'
import './styles/componentStyles/homeComponentStyles/mainTwoStyles.css'
import './styles/pageStyles/projectPlanner.css'
import './styles/pageStyles/vanilla.css'
import './styles/componentStyles/vanillaComponentStyles/vanillaNormal.css'
import './styles/componentStyles/vanillaComponentStyles/vanillaFluent.css'
import './styles/componentStyles/vanillaComponentStyles/vanillaRouteButton.css'
import './styles/pageStyles/contactMe.css'
import './styles/general.css'

// Loader Section

import * as location from './1055-world-locations.json'
import * as success from './1127-success.json'
import Lottie from 'react-lottie'

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

function App() {
  const [data, setData] = useState([])
  const [loading, setloading] = useState(undefined)
  const [completed, setcompleted] = useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setData(json)
          setloading(true)

          setTimeout(() => {
            setcompleted(true)
          }, 1000)
        })
    }, 2000)
  }, [])
  return (
    <>
      {!completed ? (
        <section className='loading'>
          {!loading ? (
            <Lottie options={defaultOptions1} height={700} width={700} />
          ) : (
            <Lottie options={defaultOptions2} height={400} width={400} />
          )}
        </section>
      ) : (
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/" to component={Home} />
            <Route exact path="/vanilla" to component={Vanilla} />
            <Route exact path="/pop" to component={Pop} />
            <Route exact path="/oop" to component={Oop} />
            <Route exact path="/contact" to component={ContactMe} />
            <Route exact path="/proj" to component={ProjectPlanner} />
          </Switch>
        </Router>
      )}
    </>
  )
}

export default App
