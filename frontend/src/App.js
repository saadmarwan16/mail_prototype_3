import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Archive from './containers/Archive'
import Compose from './containers/Compose'
import Home from './containers/Home'
import Inbox from './containers/Inbox'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'
import Sent from './containers/Sent'
import SingleMail from './containers/SingleMail'
import Trash from './containers/Trash'
import NotFound from './components/NotFound'
import Layout from './hocs/Layout'

import { Provider } from 'react-redux'
import store from './store'

import './sass/main.scss'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/register" component={Register} />
					<Layout>
						<Route exact path="/archive" component={Archive} />
						<Route exact path="/compose" component={Compose} />
						<Route exact path="/" component={Home} />
						<Route exact path="/inbox" component={Inbox} />
						<Route exact path="/sent" component={Sent} />
						<Route exact path="/:mailbox/:id" component={SingleMail} />
						<Route exact path="/trash" component={Trash} />
					</Layout>
					<Route component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
