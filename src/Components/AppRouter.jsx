import React, {useContext} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {publickRoutes, privateRoutes} from '../Router/Routs'
import {AuthContext} from '../Context'
import Loader from './UI/Loader/Loader'

const AppRouter = () => {
	const {isAuth, isLoading} = useContext(AuthContext)
	
	if(isLoading) {
		return <Loader/>
	}
	
	return (
		isAuth
			? <div>
				<Switch>
					{privateRoutes.map(rout =>
						<Route
							key={rout.path}
							component={rout.component}
							path={rout.path}
							exact={rout.exact}
						/>,
					)}
					<Redirect to="/posts"/>
				</Switch>
			</div>
			: <Switch>
				{publickRoutes.map(rout =>
					<Route
						key={rout.path}
						component={rout.component}
						path={rout.path}
						exact={rout.exact}
					/>,
				)}
				<Redirect to="/login"/>
			</Switch>
	)
}

export default AppRouter