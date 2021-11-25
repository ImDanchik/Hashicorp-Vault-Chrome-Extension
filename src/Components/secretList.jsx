/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Secret from './secret'
import Folder from './folder'
import genAPIEndpoint from '../Utils/genAPIEndpoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons';

import Emitter from '../Utils/Emitter';

export default function SecretList(props) {

	const [secrets, setSecrets] = useState([]); 
	const [folders, setFolders] = useState([]); 

	useEffect(() => {

		const endpointDetails = genAPIEndpoint(props.vltAddr, 'secretList', props.token , props.engine, props.folder);
		console.log("secretList render: " + endpointDetails.address);
		fetch(endpointDetails.address, { method: "LIST", headers: endpointDetails.headers })
			.then(res => res.json())
			.then(res => {
				setSecrets(res.data.keys.filter(content => !content.endsWith('/')));
				setFolders(res.data.keys.filter(content => content.endsWith('/')));
			});

	}, [props.folder]);

	const resetPath = () => {
		console.log("back to engines");
		Emitter.emit('RESET_PATH');
	}
	const goBackwardas = () => {
		console.log("rendering previous folder: " + backwardsPath());
			Emitter.emit('FOLDER_CLICKED', backwardsPath());
	}
	const backwardsPath = () => {
		const newFolder = props.folder.split('/').splice(-props.folder.length, props.folder.split('/').length-2).join('/') + '/';
		return newFolder;
	}
	const previousFolder = () => {
		if(props.folder != '/')
			return props.folder.split('/')[props.folder.split('/').length-2]
		return "Go back";
	}

	return (
		<div>
			<Container>
				<Link to="/">
						<a onClick={resetPath} className="mt-5 align-center"><span><FontAwesomeIcon icon={faHome}/></span><strong> Engines </strong> </a>
						{/* <button variant="outline-primary" onClick={resetPath} className="btn btn-light pull-left"><FontAwesomeIcon icon={faHome}/> Engines </button> */}
				</Link>
			{/* <Link to="/secret" ><button onClick={goBackwardas} className="btn btn-light float-right" disabled={props.folder=='/'}><FontAwesomeIcon icon={faAngleLeft}/> {previousFolder()} </button></Link> */}
			{!(props.folder=='/') ?
				<Link to="/secret" ><a onClick={goBackwardas} className="float-right text-dark"><span><FontAwesomeIcon icon={faAngleLeft}/></span><strong> {previousFolder()} </strong> </a></Link> :
				<br/>
			}
			</Container>
			{secrets.map(secret => <Secret vltAddr={props.vltAddr} secretName={secret} engine={props.engine} token={props.token} folder={props.folder} />)}
			{folders.map(folder => <Folder folderName={folder} engine={props.engine} token={props.token} folderPath={props.folder}/>)}

		</div>
	);
}