/*=====LIBRARY=====*/
import { FC } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import { ModalProvider } from "views/document/contexts/modal";

/*=====LAYOUTS=====*/
import { DocumentLayout, PPTLayout } from 'views/document/sharedComponents/layouts';

/*=====MODALS COMPONENT=====*/
import { ModalCreateDocument } from 'views/document/sharedComponents/common';

/*=====PAGES=====*/
import {
    DocumentDetailPage,
    DocumentFolderPage,
    DocumentHistoryPage,
    DocumentProjectPage,
    DocumentProfilePage,
    DocumentReportPage
} from 'views/document/pages';

const PPTRoutes: FC<RouteComponentProps> = (props) => {
	return (
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
	)
}

export default PPTRoutes
