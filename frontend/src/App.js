import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { Provider } from 'react-redux'
import store from './store'
import Alert from './Alert'

import './sass/main.scss'

const Archive = lazy(() => import('./containers/Archive'))
const Compose = lazy(() => import('./containers/Compose'))
const Home = lazy(() => import('./containers/Home'))
const Inbox = lazy(() => import('./containers/Inbox'))
const Login = lazy(() => import('./containers/Login'))
const Logout = lazy(() => import('./containers/Logout'))
const Register = lazy(() => import('./containers/Register'))
const Sent = lazy(() => import('./containers/Sent'))
const SingleMail = lazy(() => import('./containers/SingleMail'))
const Trash = lazy(() => import('./containers/Trash'))
const NotFound = lazy(() => import('./containers/NotFound'))

const App = () => {
	return (
		<Provider store={store}>
			<Alert />
			
			<Router>
				<Suspense 
					fallback={
						<div className="main__fallback">
							<Loader
								type="Oval"
								color="#fff"
								height={40}
								width={40}
							/>
						</div>
					}
				>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/logout" component={Logout} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/archive" component={Archive} />
						<Route exact path="/compose" component={Compose} />
						<Route exact path="/" component={Home} />
						<Route exact path="/inbox" component={Inbox} />
						<Route exact path="/sent" component={Sent} />
						<Route exact path="/:mailbox/:id" component={SingleMail} />
						<Route exact path="/trash" component={Trash} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	)
}

export default App