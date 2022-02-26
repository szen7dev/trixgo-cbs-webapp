import { FC, useEffect, useState } from 'react'
import { SocialArticles } from "views/media/shareComponents/common";
import { PostType } from 'typings/media';

import { useMedia } from 'services/hooks/useMedia';
import { useAuth } from "services/hooks/useAuth";

import { ListMediasPayload } from 'typings/media';
import { Loader } from 'shareComponents/common';

export const MediaCategoryPage: FC<{ type: PostType }> = ({ type }) => {
	const [params, setParams] = useState<ListMediasPayload>({ type });

	const { user } = useAuth();
	const { listMedias, isLoadingMedias } = useMedia({
		key: `list_medias__${type}`,
		params,
		isFetchMedias: true
	});

	useEffect(() => {
		if(type === "department") {
			setParams(previousValue => ({
				...previousValue,
				companyID: user?.company?._id
			}))
		}
	}, [type])

	if(isLoadingMedias) return <Loader className="border-primary" />;
	console.log({ 'MEDIA_CATEGORY_PAGE': listMedias });

	return (
		<div className='overflow-auto'>
			<SocialArticles className='max-w-2xl mx-auto' listMedias={listMedias} />
		</div>
	)
}