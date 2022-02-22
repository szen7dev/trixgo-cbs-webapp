import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import DocumentLayout from '../sharedComponents/layouts/DocumentLayout';
import ErrorPage from 'views/authentication/Error'

import DocumentDashboardPage from 'views/document/pages/DocumentDashboardPage';
import DocumentHomePage from 'views/document/DocumentHomePage';

const DocumentRoutes: FC = () => {
	return (
		<>
			<DocumentLayout>
				<Switch>
					<Route exact path="/document/home" component={DocumentHomePage} />
					<Route exact path="/document/dashboard" component={DocumentDashboardPage} />
					<Route path="/document/*" component={ErrorPage} />
				</Switch>
			</DocumentLayout>
		</>
	)
}

export default DocumentRoutes
