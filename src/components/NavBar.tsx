import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { baseMargins } from './utils/styles';

const NavBar = () => {
    const baseWithInline = {
        ...baseMargins,
        "separator": "-",
        "fontWeight": "medium",
        "fontSize": "25px",
        "fontFamily": "flexa",
    };

    return (
        <Breadcrumb {...baseWithInline}>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/' d="inline">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/notes' d="inline">Notes</BreadcrumbLink>
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