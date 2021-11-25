import React, { useState, useEffect } from 'react';
// import NamespaceDropdown from './NamespaceDropdown';
import { Nav, Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Navigation(props) {

    const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);

    useEffect(() => {
        setLoggedIn(props.isLoggedIn);
    })

    const vaultName = (link) => {
        return link.substr(link.indexOf("https://") + 8, link.indexOf("-vault")-2)
    }

    return (

        <Navbar className="sticky-top" bg="dark" variant="dark">
            <Nav className="mr-auto text-light">
                {/* {loggedIn && <NamespaceDropdown token={props.token} path={props.path} setPath={props.setPath}/>} */}
                {props.vltAddr ? vaultName(props.vltAddr) : <br/>}
            </Nav>
            <Nav className="d-flex">
                {
                    loggedIn &&
                        <Button variant="secondary" onClick={()=> {
                            props.setToken(null);
                            props.setVltAddr(null);
                        }}>
                            <span>Logout</span>
                        </Button>
                }
            </Nav>
        </Navbar>
    );
}