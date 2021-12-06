import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const navStyle = {
        "separator": "-",
        "fontWeight": "medium",
        "fontSize": "25px",
        "fontFamily": "flexa",
    };

    return (
        <Breadcrumb {...navStyle}>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/' d="inline">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/notes' d="inline">Notes</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/pad' d="inline">Pad</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/user' d="inline">User</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/about' d="inline">About</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    );
};

export default NavBar;