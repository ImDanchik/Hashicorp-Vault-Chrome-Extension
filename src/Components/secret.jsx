import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Card } from 'react-bootstrap';
import SecretProperty from './secretProperty'
import { faKey, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fillCredentialsInBrowser } from '../Utils/autofill';
import Emitter from '../Utils/Emitter';
import genAPIEndpoint from '../Utils/genAPIEndpoint';

const secret = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [secrets, setSecrets] = useState(null);

    useEffect(() => {
        Emitter.on('USERNAME_PROPERTY_RENDERED', (username) => {
            setUsername(username);
        });
        Emitter.on('PASSWORD_PROPERTY_RENDERED', (password) => {
            setPassword(password);
        });
    }, [])

    const fetchSecret = () => {
        const endpointDetails = genAPIEndpoint(props.vltAddr, "secret", props.token, props.engine, props.folder, props.secretName)
        console.log("secret render: " + endpointDetails.address)
        fetch(endpointDetails.address, { method: "GET", headers: endpointDetails.headers })
            .then(res => res.json())
            .then(res => {
                setSecrets(res.data.data);
            });
    }

    // const autoFillValid = () => {
    //     let isUsername = false;
    //     let isPassword = false;
    //     Object.keys(secrets).map(secretKey => {
    //         (secretKey.toLowerCase() == "username") ? isUsername = true 
    //         : (secretKey.toLowerCase() == "password") ? isPassword = true
    //         : isPassword = false;
    //     })
    //     console.log("isUsername: " + isUsername + "   isPassword: " +isPassword);
    //    return (isUsername && isPassword);
    // }

    const changeShowModal = () => {
        setShowModal(true);
    }

    return (
        <a style={{ cursor: 'pointer' }} >
            <Card onClick={() => fetchSecret()}>
                <Card.Body onClick={changeShowModal}>
                    <div className="float-left"> <FontAwesomeIcon icon={faKey} /> </div>
                    <div className="float-left pl-4"> {props.secretName} </div>
                    <div className="float-right"> <FontAwesomeIcon icon={faChevronRight} /> </div>
                </Card.Body>
            </Card>

            <Modal show={showModal}>
                <Modal.Header>
                    <Modal.Title>{props.secretName}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {secrets ? Object.entries(secrets).map(([secretKey, secretValue]) => <SecretProperty secretKey={secretKey} secretValue={secretValue}></SecretProperty>) : <br />}
                </Modal.Body>

                <Modal.Footer>
                    {(username && password) ? <button className="btn btn-primary ml-auto" onClick={() => fillCredentialsInBrowser(username, password)}>Auto-Fill</button>
                        : <button className="btn btn-primary ml-auto" disabled>Auto-Fill</button>}
                    <button className="btn btn-light" onClick={() => {
                        setShowModal(false);
                        setPassword(null);
                        setUsername(null);
                    }}>Close</button>
                </Modal.Footer>
            </Modal>

        </a>
    );
}

export default secret;