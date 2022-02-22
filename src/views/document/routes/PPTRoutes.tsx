import { FC } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

// Context
import { ModalProvider } from "../contexts/modal";

import ModalCreateDocument from '../sharedComponents/common/ModalCreateDocument'
import PPTLayout from '../sharedComponents/layouts/PPTLayout'
import DocumentLayout from '../sharedComponents/layouts/DocumentLayout';

import DocumentDetailPage from '../DocumentDetailPage'
import DocumentFolderPage from "../DocumentFolderPage";
import DocumentHistoryPage from "../DocumentHistoryPage";
import DocumentProfilePage from "../DocumentProfilePage";
import DocumentProjectPage from "../DocumentProjectPage";
import DocumentReportPage from "../DocumentReportPage";

const PPTRoutes: FC<RouteComponentProps> = (props) => {
	return (
		<>
			<DocumentLayout>
				<ModalProvider>
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
				</ModalProvider>
			</DocumentLayout>
		</>
	)
}

export default PPTRoutes
