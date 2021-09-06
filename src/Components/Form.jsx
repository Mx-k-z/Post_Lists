import React, {useState} from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const Form = ({create, props}) => {
	const [post, setPost] = useState(
		{
			title: '',
			body: '',
		})
	
	
	let addNewPost = (e) => {
		e.preventDefault()
		const newPost = {
			...post, id: Date.now()
		}
		create(newPost)
		setPost({title: '', body: ''})
		
	}
	
	return (
		<form>
			<MyInput
				value={post.title}
				onChange={e => setPost({...post, title: e.target.value})}
				type="text"
				placeholder='Name of post'
			/>
			<MyInput
				value={post.body}
				onChange={e => setPost({...post, body: e.target.value})}
				type="text"
				placeholder="Описание поста"
			/>
			<MyButton onClick={addNewPost}>Создать пост</MyButton>
		</form>
	)
}

export default Form