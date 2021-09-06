import React from 'react'
import {getPagesArr} from '../../../utils/Pages'

const Pagination = ({totalPages, page, changePage}) => {
	let pagesArr = getPagesArr(totalPages)
	return (
		<div className="page__wrapper">
			{pagesArr.map(p =>
				<span
					key={p}
					onClick={() => changePage(p)}
					className={page === p ? 'page page__current' : 'page'}
				>
					{p}
				</span>)}
		</div>
	)
}

export default Pagination