import logo from './logo.svg'
import './App.css'
import Sidebar from './Components/Sidebar'
import Vanilla from './Pages/Vanilla'
import Home from './Pages/Home'
import Oop from './Pages/Oop'
import Pop from './Pages/Pop'
import ContactMe from './Pages/ContactMe'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/vanilla' component={Vanilla} />
        <Route exact path='/pop' component={Pop} />
        <Route exact path='/oop' component={Oop} />
        <Route exact path='/contact' component={ContactMe} />
      </Switch>
    </Router >
  );
}

export default App;

