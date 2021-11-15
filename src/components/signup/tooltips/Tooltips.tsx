import { Box } from '@chakra-ui/react';
import React from 'react';
import PasswordTooltips from './Password';
import UsernameTooltips from './Username';

interface Props {
    password: string,
    username: string,
    gridArea: string
}
const Tooltips = ({ password, username, gridArea }: Props) => {
    return (
        <Box gridArea={gridArea}>
            <UsernameTooltips username={username}/>
            <PasswordTooltips password={password} />
        </Box>
    );
};

export default Tooltips;