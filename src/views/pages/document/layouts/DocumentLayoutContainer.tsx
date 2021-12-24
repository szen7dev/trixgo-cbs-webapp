import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

// Context
import { Provider } from '../contexts/contextModal'

import DocumentLayout from 'views/layouts/DocumentLayout'
import ErrorPage from 'views/pages/authentication/Error'

import DocumentDashboardPage from 'views/pages/document/screens/DocumentDashboardPage'
import DocumentDetailPage from 'views/pages/document/screens/DocumentDetailPage'
import DocumentHomePage from 'views/pages/document/screens/DocumentHomePage'
import DocumentNav from './DocumentNav'
import ModalCreateDocument from '../components/common/ModalCreateDocument'

const DocumentLayoutContainer: FC = () => {
	return (
		<>
			<DocumentLayout>
				<Switch>
					<Route exact path="/document/dashboard" component={DocumentDashboardPage} />
					<Provider>
						<Route exact path="/document/home" component={DocumentHomePage} />
						<Route path='/document/project/:id/document/doc' component={DocumentDetailPage} />
						<Route strict path="/document/project/:id/document" component={DocumentNav} />
						<ModalCreateDocument/>
					</Provider>
					<Route path="/document/*" component={ErrorPage} />
				</Switch>
			</DocumentLayout>
		</>
	)
}

export default DocumentLayoutContainer
