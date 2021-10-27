import logo from './logo.svg'
import Sidebar from './components/general/Sidebar'
import Vanilla from './pages/Vanilla'
import Home from './pages/Home'
import Oop from './pages/Oop'
import Pop from './pages/Pop'
import ContactMe from './pages/ContactMe'
import Board from './components/projectPlanner/Board'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vanilla" component={Vanilla} />
        <Route exact path="/pop" component={Pop} />
        <Route exact path="/oop" component={Oop} />
        <Route exact path="/contact" component={ContactMe} />
        <Route exact path="/board" component={Board} />
      </Switch>
    </Router>
  )
}

export default App
