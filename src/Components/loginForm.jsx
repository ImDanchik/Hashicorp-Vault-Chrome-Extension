import React, { useState } from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';
import genAPIEndpoint from '../Utils/genAPIEndpoint';
import PropTypes from 'prop-types'

export default function LoginForm(props) {
	const [address, setAddress] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		const token = await loginUser();
		props.setVltAddr(handleUrl(address));
		props.setToken(token);
	}

	const handleUrl = (address) =>
	{
		if(address.endsWith('/'))
			return handleUrl(address.substr(0,address.length-1));
		return address;
	}

	async function loginUser() {

		const vltAddr = handleUrl(address);

		//First request
		const endpointDetails = genAPIEndpoint(vltAddr, 'OIDC');
		const oidc_res = await fetch(endpointDetails.address, { method: "POST", headers: endpointDetails.headers, body: endpointDetails.body });
		const oidc_data = await oidc_res.json()
		const redirect_uri = oidc_data.data.auth_url

		//Second request
		const redirect_res = await fetch(redirect_uri,
		{
			method: "GET",
			redirect: "follow"
		})
		const callback_uri = redirect_res.url.replace("/ui/vault","/v1");

		//Third request
		const callback_res = await fetch(callback_uri, {
			method: "GET"
		})
		const callback_data = await callback_res.json()

		const client_token = callback_data.auth.client_token;

		return client_token 
	}

	return (
		<React.Fragment>
			<Container className="mt-3">
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="vlt-server">
						<Form.Control type="url" placeholder="Vault Address" onChange={e => setAddress(e.target.value)}/>
					</Form.Group>
					<Button variant="primary" type="submit" >
						Log In
  					</Button>
				</Form>
			</Container>
			<Container>
				<div className="text-center">
					<h4 className="display-6">Hashicorp Vault</h4>
					<Image src="./react256.png" className="rounded mx-auto d-block" alt="Vault Icon" style={{ minHeight: 100, maxHeight: 100, minWidth: 100, maxWidth: 100 }} />
				</div>
			</Container>
		</React.Fragment>
	);
}

LoginForm.propTypes = {
	setToken: PropTypes.func.isRequired,
	setVltAddr: PropTypes.func.isRequired
}