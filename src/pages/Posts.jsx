import React, {useEffect, useRef, useState} from 'react'
import PostList from './../Components/PostList'
import Form from './../Components/Form'
import PostFilter from './../Components/PostFilter'
import MyModal from './../Components/UI/MyModal/MyModal'
import MyButton from './../Components/UI/button/MyButton'
import {usePosts} from '../Hooks/usePosts'
import PostService from './../API/PostService'
import Loader from './../Components/UI/Loader/Loader'
import {useFetch} from '../Hooks/useFetch'
import {getPageCount} from '../utils/Pages'
import Pagination from './../Components/UI/Pagination/Pagination'
import {useObserver} from '../Hooks/useObserver'
import MySelect from '../Components/UI/Select/MySelect'

function Posts() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: '', query: ''})
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query)
	const lastElem = useRef()
	
	const [fetchPosts, isPostLoading, postError] = useFetch( async (limit, page) => {
		const response = await PostService.getAll(limit, page)
		setPosts([...posts, ...response.data])
		const totalCount = response.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))
	})
	
	useObserver(lastElem, page < totalPages, isPostLoading, () => {
		setPage(page + 1)
	})
	
	useEffect(() => {
		fetchPosts(limit, page)
	},[page, limit])
	
	
	function createPost(newPost) {
		setPosts([...posts, newPost])
		setModal(false)
	}
	
	function remove(post) {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	
	const changePage = (page) => {
		setPage(page)
	}
	
	return (
		<div className="App">
			<MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal isVisible={modal} setVisible={setModal}>
				<Form create={createPost}/>
			</MyModal>
			{<hr style={{margin: '15px 0'}}/>}
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue="Кол-во элементов на странице"
				options={[
					{value: 5, name: '5'},
					{value: 10, name: '10'},
					{value: 25, name: '25'},
					{value: -1, name: 'Показать все'},
				]}
			/>
			{isPostLoading &&
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<Loader/>
			</div>}
				<PostList
				remove={remove}
				posts={sortedAndSearchedPost}
				title="Posts Lists"/>
			<div ref={lastElem}/>
			{/*<Pagination*/}
			{/*	totalPages={totalPages}*/}
			{/*	page={page}*/}
			{/*	changePage={changePage}*/}
			{/*/>*/}
		</div>
	);
}
export default Posts