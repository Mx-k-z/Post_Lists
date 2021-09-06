import React from 'react'
import classes from './MyModal.module.css'

const MyModal = ({children, isVisible, setVisible}) => {
	
	const rootClasses = [classes.myModal]
	
	if(isVisible) {
		rootClasses.push(classes.active)
	}
	
	return (
		<div className={rootClasses.join(' ')} onClick={()=> {setVisible(false)}}>
			<div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default MyModal