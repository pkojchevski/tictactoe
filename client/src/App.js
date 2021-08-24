/*IMPORTS*/
import React from "react";
import './App.css';
import { Redirect , BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./page/home/Home";
import Play from "./page/play/Play";
import NavBar from "./components/navBar/NavBar";
import Login from './page/auth/Login'
import Register from './page/auth/Register'
import ProtectedRoute from './auth/ProtectedRoute'
import { UserContext } from './context/UsernameContext'
import {useUsernameData} from './context/hooks'

function App() {
	const userData = useUsernameData()
	return (
		<UserContext.Provider value={userData}>
			<Router>
				<div className="container">
						<NavBar/>
						<div className="content">
							<Switch>
								<ProtectedRoute exact path="/" component={Home} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/register" component={Register} />
								<ProtectedRoute exact path="/play/:gameId" component={Play} />
								<Redirect from="*" to="/" />
							</Switch>
						</div>
				</div>
			</Router>
			</UserContext.Provider>
	);
}

export default App;
