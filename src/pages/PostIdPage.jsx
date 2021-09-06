import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFetch} from '../Hooks/useFetch'
import PostService from '../API/PostService'
import Loader from '../Components/UI/Loader/Loader'

const PostIdPage = () => {
	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])
	const [fetchPostById, isLoading, error] = useFetch(async (id) => {
		const response = await PostService.getById(params.id)
		setPost(response.data)
	})
	
	const [fetchComments, isComLoading, comError] = useFetch(async (id) => {
		const response = await PostService.getComments(params.id)
		setComments(response.data)
	})
	
	useEffect(() => {
		fetchPostById(params.id)
		fetchComments(params.id)
	}, [])
	
	return (
		<div>
			<h1>Страница поста c ID = {params.id}</h1>
			{isLoading
			? <Loader/>
			:<div>{post.id} {post.title}</div>
			}
			<h1>Комментарии</h1>
			<div>
				{isComLoading
					? <Loader/>
					: <div>
						{comments.map(com =>
							<div key={com.email}
								style={{marginTop: 15}}>
								<h5>{com.email}</h5>
								<div>{com.body}</div>
							</div>,
						)}
					</div>
				}
			</div>
		</div>
	)
}

export default PostIdPage