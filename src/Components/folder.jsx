import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faChevronRight, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Emitter from '../Utils/Emitter';


const secret = (props) => {

    const onFolderClick = () => {
        console.log("folder clicked: " + props.folderPath + props.folderName)
        Emitter.emit('FOLDER_CLICKED', props.folderPath + props.folderName);
    }

    return (
        <a style={{ cursor: 'pointer' }}>
                <Link to="/secret">
                    <Card>
                        <Card.Body onClick={onFolderClick}>
                            <div className="float-left"> <FontAwesomeIcon icon={faFolder} /> </div>
                            <div className="float-left pl-4"> {props.folderName} </div>
                            <div className="float-right"> <FontAwesomeIcon icon={faChevronRight} /> </div>
                        </Card.Body>
                    </Card>
                </Link>
        </a>
    );
}

export default secret;