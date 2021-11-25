import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Engine from './engine.jsx'
import genAPIEndpoint from '../Utils/genAPIEndpoint';
import Alert from 'react-bootstrap/Alert'

export default function engineList(props) {

	const [engines, setEngines] = useState([]);
	const [errors, setErrors] = useState(null);
	
	useEffect(() => {
		const endpointDetails = genAPIEndpoint(props.vltAddr, 'engine', props.token);
		console.log("engineList render: " + endpointDetails.address);
		fetch(endpointDetails.address, { headers: endpointDetails.headers })
			.then(res => res.json())
			.then(res => {
				
				if(res.errors){
					setErrors(res.errors);
				} else {
					setEngines(Object.keys(res.data).filter (engine => {
						return (res.data[engine].type === "kv" && res.data[engine].options.version === "2")
					}))
				}
			});
	}, []);
	return (
		<div>
			{
				errors ?
					<Alert variant="danger"> {errors.map(error => <p> {error} </p> )} </Alert> : 
				engines.map(engine => <Link to="/secret"><Engine engineName={engine}/></Link>)
			}
		</div>
	);
}