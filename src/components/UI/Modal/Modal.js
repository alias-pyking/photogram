import React,{ useState } from "react";
import Aux from "../../../containers/hoc/Auxiliary";
import { Toast } from 'react-bootstrap'

function Modal(props) {

	const [showA, setShowA] = useState(true);

	const toggleShowA = () => setShowA(!showA);

	return (
		<Aux>
		{ props.show ? 
		<Toast
			style={{
				position:'fixed',
				bottom:0,
				right:0,
				maxWidth:'100%',
				background:'#FD363C',
				color:'white',
				zIndex:'2'
			}}
		show={showA} onClose={toggleShowA}>
			<Toast.Header
			style={{
				background:'#FD363C',
				color:'white',
			}}
			>
			<img
				src="holder.js/20x20?text=%20"
				className="rounded mr-2"
				alt=""
			/>
			<strong className="mr-auto">Error</strong>
			</Toast.Header>
			<Toast.Body>{ props.children }</Toast.Body>
		</Toast>
		: ''}
		</Aux>
	);
}
export default Modal;
