import './app.css'
import Sidebar from './components/general/Sidebar'
import Vanilla from './pages/Vanilla'
import Home from './pages/Home'
import Oop from './pages/Oop'
import Pop from './pages/Pop'
import ContactMe from './pages/ContactMe'
import ProjectPlanner from './pages/ProjectPlanner'
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
				<Route exact path='/proj' component={ProjectPlanner} />
			</Switch>
		</Router>
	)
}

export default App
