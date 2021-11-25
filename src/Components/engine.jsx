import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { faCog, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Emitter from '../Utils/Emitter';

const engine = (props) => {

    const onEngineClick = () => {
        console.log("engine clicked: " + props.engineName);
        Emitter.emit('ENGINE_CLICKED', props.engineName);
    }

    return (
        <a style={{ cursor: 'pointer' }}>
            <Card >
                <Card.Body onClick={onEngineClick}>
                    <OverlayTrigger placement="bottom" delay={{ show: 400, hide: 350 }} overlay={<Tooltip>This is not options. It represents an engine.</Tooltip>}>
                        <div className="float-left"> <FontAwesomeIcon icon={faCog} /> </div>
                    </OverlayTrigger>
                    <div className="float-left pl-4"><strong>{props.engineName.replace(/\//g,'')}</strong></div>
                    <div className="float-right"> <FontAwesomeIcon icon={faChevronRight} /> </div>
                </Card.Body>
            </Card>
        </a>
    );
}

export default engine;