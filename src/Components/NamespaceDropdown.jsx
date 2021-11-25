import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { NavDropdown, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Emitter from '../Utils/Emitter';
import genAPIEndpoint from '../Utils/genAPIEndpoint'

export default function NamespaceDropdown(props) {

	const [currentNamespace, setCurrentNamespace] = useState('/');
	// const currentNamespace = props.path;
	// const setCurrentNamespace = props.setPath;
	const [namespaces, setNamespaces] = useState([]);

	useEffect(() => {
		const endpointDetails = genAPIEndpoint(props.token, currentNamespace, 'namespace');

		fetch(endpointDetails.address, {headers: endpointDetails.headers})
			.then(res => res.json().then(d => {
				if (Object.entries(d.data).length === 0) {
					setNamespaces([])
				} else {
					setNamespaces(oneDepthNamespaces(d.data.keys))
				}
			}))
	}, [currentNamespace])

	const addToRoute = (event) => {
		let newPath = currentNamespace + event.currentTarget.textContent;
		setCurrentNamespace(newPath);
		Emitter.emit("NAMESPACE_CLICKED", newPath);
	}

	const removeFromRoute = () => {
		let newPath = currentNamespace.split(lastDirectory())[0]
		setCurrentNamespace(newPath);
		Emitter.emit("NAMESPACE_CLICKED", newPath);
	}

	const oneDepthNamespaces = (namespaces) => {
		return namespaces.filter(n => {
			if (n.split("/").length === 2)
				return true
			else
				return false
		})
	}

	const lastDirectory = () => {
		return currentNamespace.match(/[^/]+\/$/);
	}

	return (
		<NavDropdown title={lastDirectory()} id="collasible-nav-dropdown" fixed="top" a>
			<Link to="/engine"><Dropdown.Header onClick={removeFromRoute}>
				<FontAwesomeIcon icon={faAngleLeft} />
				 Current Namespace
        	</Dropdown.Header></Link>
			{/* <OverlayTrigger
				placement="bottom"
				overlay={<Tooltip id="button-tooltip">{currentNamespace}</Tooltip>}
			> */}
			<Dropdown.ItemText>{currentNamespace}</Dropdown.ItemText>
			{/* </OverlayTrigger> */}
			<Dropdown.Divider />
			{
				namespaces.length === 0 
				?
					<Dropdown.Header>There are no nested Namespaces</Dropdown.Header>
				:
					namespaces.map(ns => {
						return (
							<Link to="/engine"><Dropdown.ItemText onClick={addToRoute}>{ns}<FontAwesomeIcon icon={faAngleRight} className="float-right align-middle" /></Dropdown.ItemText></Link>
							// <Link to="/secret"><Dropdown.Item>{ns}<FontAwesomeIcon icon={faAngleRight} className="float-right align-middle" /></Dropdown.Item></Link>
						);
					})
			}
		</NavDropdown>
	)
}