import { Box } from '@chakra-ui/react';
import React from 'react';

const Home = () => {
    const fontStyle = {
        'fontFamily': '"Lato",  sans serif',
        'fontSize': '16px',
    };

    return (
        <Box {...fontStyle}>
            <h3><i>Notes app, by Chiew Weng Keat</i></h3>
            <p>
                &emsp; total notes stored: <br />
                &emsp; total users:
            </p>
        </Box>
    );
};

export default Home;