import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

// Context
import { Provider } from '../contexts/contextModal'

import DocumentLayout from 'views/layouts/DocumentLayout'
import ErrorPage from 'views/pages/authentication/Error'

import DocumentDashboardPage from 'views/pages/document/screens/DocumentDashboardPage'
import DocumentHomePage from 'views/pages/document/screens/DocumentHomePage'

const DocumentRoutes: FC = () => {
	return (
		<>
			<DocumentLayout>
				<Switch>
					<Route exact path="/document/home" component={DocumentHomePage} />
					<Route exact path="/document/dashboard" component={() =>
						<Provider>
							<DocumentDashboardPage />
						</Provider>
					} />
					<Route path="/document/*" component={ErrorPage} />
				</Switch>
			</DocumentLayout>
		</>
	)
}

export default DocumentRoutes
