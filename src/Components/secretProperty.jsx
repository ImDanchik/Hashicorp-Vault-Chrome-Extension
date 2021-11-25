import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import { faEye, faEyeSlash, faCopy, faCheck, faFill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fillCredentialsInBrowser } from '../Utils/autofill';
import Emitter from '../Utils/Emitter';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const secretProperty = (props) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (props.secretKey.toLowerCase() == "password") {
            console.log("PASSWORD CALLED");
            Emitter.emit('PASSWORD_PROPERTY_RENDERED', props.secretValue);
        }
        if (props.secretKey.toLowerCase() == "username") {
            console.log("USERNAME CALLED");
            Emitter.emit('USERNAME_PROPERTY_RENDERED', props.secretValue);
        }
    }, []);

    return (
            <p id="show_hide_password"><strong> {props.secretKey}: </strong>
                <input type={showPassword ? "text" : "password"} value={props.secretValue} />
                <CopyToClipboard text={props.secretValue} onCopy={() => setIsCopied(true)}>
                    <button className="btn btn-light float-right">
                        {isCopied ? <div className="float-left"> <FontAwesomeIcon icon={faCheck} /> </div>
                            : <div className="float-left"> <FontAwesomeIcon icon={faCopy} /> </div>}
                    </button>
                </CopyToClipboard>
                <button className="btn btn-light float-right" onClick={() => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
                <button className="btn btn-light float-right" onClick={() => fillCredentialsInBrowser(props.secretKey, props.secretValue)}><FontAwesomeIcon icon={faFill} /> </button>
            </p>
    );
}

export default secretProperty;