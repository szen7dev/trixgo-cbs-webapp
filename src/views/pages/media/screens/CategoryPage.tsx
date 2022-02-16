import { FC } from 'react'
import SocialArticles from '../components/home/SocialArticles';
import { PostType } from 'typings/social';

const CategoryPage: FC<{ type: PostType }> = ({ type }) => {

	switch (type) {
		case 'department': {
			return (
				<div className='overflow-auto'>
					<SocialArticles className='max-w-2xl mx-auto' type="department" />
				</div>
			)
		}
		case 'digital-conversion': {
			return (
				<div className='overflow-auto'>
					<SocialArticles className='max-w-2xl mx-auto' type="digital-conversion" />
				</div>
			)
		}
		case 'system': {
			return (
				<div className='overflow-auto'>
					<SocialArticles className='max-w-2xl mx-auto' type="system" />
				</div>
			)
		}
		case 'just-me': {
			return (
				<div className='overflow-auto'>
					<SocialArticles className='max-w-2xl mx-auto' type="just-me" />
				</div>
			)
		}
		default:
			return null;
	}
}

export default CategoryPage;
