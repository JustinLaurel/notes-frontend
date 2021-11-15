import { Box } from '@chakra-ui/react';
import React from 'react';
import { baseMargins } from '../utils/styles';

const Home = () => {
    const fontStyle = {
        'fontFamily': '"Lato",  sans serif',
        'fontSize': '16px',
    };

    return (
        <Box {...baseMargins} {...fontStyle}>
            <h3><i>Notes app, by Chiew Weng Keat</i></h3>
            <p>
                &emsp; total notes stored: <br />
                &emsp; total users:
            </p>
        </Box>
    );
};

export default Home;