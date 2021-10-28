// import './app.css'
import './styles/general.css'
import Sidebar from './components/general/Sidebar'
import Vanilla from './pages/Vanilla'
import Home from './pages/Home'
import Oop from './pages/Oop'
import Pop from './pages/Pop'

import ContactMe from './pages/ContactMe'
import ProjectPlanner from './pages/ProjectPlanner'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

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
