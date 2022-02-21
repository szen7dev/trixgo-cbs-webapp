import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

// Context
import { Provider } from '../contexts/contextModal'

import { DocumentLayout } from 'shareComponents/layouts/DocumentLayout'
import ErrorPage from 'views/authentication/Error'

import DocumentDashboardPage from 'views/document/screens/DocumentDashboardPage'
import DocumentHomePage from 'views/document/screens/DocumentHomePage'

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
