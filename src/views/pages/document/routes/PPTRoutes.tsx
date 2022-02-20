import { FC } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

// Context
import { Provider } from '../contexts/contextModal'

import DocumentLayout from 'views/layouts/DocumentLayout'

import DocumentDetailPage from 'views/pages/document/screens/DocumentDetailPage'
import ModalCreateDocument from '../components/common/ModalCreateDocument'
import PPTLayout from '../layouts/PPTLayout'

import DocumentFolderPage from "views/pages/document/screens/DocumentFolderPage";
import DocumentHistoryPage from "views/pages/document/screens/DocumentHistoryPage";
import DocumentProfilePage from "views/pages/document/screens/DocumentProfilePage";
import DocumentProjectPage from "views/pages/document/screens/DocumentProjectPage";
import DocumentReportPage from "views/pages/document/screens/DocumentReportPage";

const PPTRoutes: FC<RouteComponentProps> = (props) => {
	return (
		<>
			<DocumentLayout>
				<Provider>
					<Switch>
						<Route exact path={'/ppt/project/:id/document'}>
							<PPTLayout {...props}>
								<DocumentProjectPage />
							</PPTLayout>
						</Route>
						<Route exact path={'/ppt/project/:id/document/1'}>
							<PPTLayout {...props}>
								<DocumentProfilePage />
							</PPTLayout>
						</Route>
						<Route exact path={'/ppt/project/:id/document/2'}>
							<PPTLayout {...props}>
								<DocumentFolderPage />
							</PPTLayout>
						</Route>
						<Route exact path={'/ppt/project/:id/document/3'}>
							<PPTLayout {...props}>
								<DocumentReportPage />
							</PPTLayout>
						</Route>
						<Route exact path={'/ppt/project/:id/document/4'}>
							<PPTLayout {...props}>
								<DocumentHistoryPage />
							</PPTLayout>
						</Route>
						<Route path='/ppt/project/:id/document/:docID' component={DocumentDetailPage} />
					</Switch>
					<ModalCreateDocument />
				</Provider>
			</DocumentLayout>
		</>
	)
}

export default PPTRoutes
