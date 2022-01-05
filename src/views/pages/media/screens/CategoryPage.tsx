import React, { FC } from 'react'
import SocialInternalArticles from '../components/home/SocialInternalArticles';

const CategoryPage: FC = () => {
	return (
		<div className='overflow-auto'>
			<SocialInternalArticles className='max-w-2xl mx-auto' />
		</div>
	)
}

export default CategoryPage;
