import React from "react";
import Logout from "../components/logout";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

    //
    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="">Logo</Navbar.Brand>
                    <Logout />
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;