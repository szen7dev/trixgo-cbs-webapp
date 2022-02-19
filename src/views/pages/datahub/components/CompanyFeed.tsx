import React, { FC, HTMLAttributes } from 'react'

type Props = {

}

const CompanyFeed: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div className='space-y-4'>
				{
					Array.from({ length: 13 }).map((_, i) => (
						<div key={i} className='bg-white rounded-cbs-md border-[0.5px] border-cbs-border'>
							<div className='p-4'>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cumque sunt quo, laborum esse magni nostrum facilis ipsa autem maiores optio aspernatur nam natus nesciunt dolore eum ad quibusdam error.
								</p>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default CompanyFeed