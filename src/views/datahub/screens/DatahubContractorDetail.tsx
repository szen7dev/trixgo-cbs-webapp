import React, { FC } from 'react'

import CompanyFeed from '../components/CompanyFeed';
import ProfileFeed from '../components/ProfileFeed';

type Props = {

}

const DatahubContractorDetail: FC<Props> = (props) => {
	return (
		<>
			{/* ======= LIST PROFILE FEED ======= */}
			<ProfileFeed className='mx-3.5 flex-grow w-[32rem] max-w-lg' />
			{/* ======= NEW FEED ======= */}
			<CompanyFeed className='mx-3.5 flex-1' />
		</>
	)
}

export default DatahubContractorDetail