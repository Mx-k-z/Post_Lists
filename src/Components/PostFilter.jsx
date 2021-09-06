import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/Select/MySelect'

const PostFilter = ({filter, setFilter}) => {
	return (
		<div>
			<MyInput
				value={filter.query}
				onChange={e => setFilter({...filter, query: e.target.value})}
				placeholder='Поиск'
			/>
			<MySelect
				options={[
					{value: 'title', name: 'По названию'},
					{value: 'body', name: 'По описанию'}
				]}
				defaultValue='Сортировка'
				value={filter.sort}
				onChange={selectSort => setFilter({...filter, sort: selectSort})}
			/>
		</div>
	)
}

export default PostFilter