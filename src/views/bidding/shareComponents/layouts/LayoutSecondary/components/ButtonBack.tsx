import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import BackIcon from 'assets/icons/BackIcon'

const ButtonBack: FC = (props) => {
	const history = useHistory();
	return (
		<button className='mr-2' onClick={() => history.goBack()}>
			<BackIcon className="w-5 h-5" />
		</button>
	)
}

export default ButtonBack