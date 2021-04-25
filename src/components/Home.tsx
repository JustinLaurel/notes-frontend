import { Box } from '@chakra-ui/react';
import React from 'react';
import { baseMargins } from '../utils/styles';

const Home = () => {
    return (
        <Box {...baseMargins}>
            <h3><i>Notes app, by Chiew Weng Keat</i></h3>
            <p>
                &emsp; total notes stored: <br />
                &emsp; total users:
            </p>
        </Box>
    );
};

export default Home;