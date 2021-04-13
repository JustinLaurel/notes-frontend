import React from 'react';
import { baseComponentStyle } from './utils/styles';

const Home = () => {
    return (
        <div style={baseComponentStyle}>
            <h3><i>Notes app, by Chiew Weng Keat</i></h3>
            <p>
                &emsp; total notes stored: <br />
                &emsp; total users:
            </p>
        </div>
    );
};

export default Home;