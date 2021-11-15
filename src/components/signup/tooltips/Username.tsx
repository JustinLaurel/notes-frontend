import React, { useEffect, useState } from 'react';
import { 
    UnorderedList,
    Box,
    ListItem
} from '@chakra-ui/react';
import {
    tooltipStyle,
    headingStyle,
    listStyle,
    ValidIndicator,
    InvalidIndicator
} from './styling';

import { MIN_USERNAME_LENGTH } from '../../../constants';
import { hasAtLeastXCharacters } from '../../../validators/userValidators';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

interface UsernameTooltipsFields {
    characterIsValid: boolean,
    usernameAvailable: boolean,
}
const UsernameTooltipsView = ({ characterIsValid, usernameAvailable }: UsernameTooltipsFields) => {
    return (
        <Box {...tooltipStyle}>
            <Box as='span' {...headingStyle}>Username</Box>
            <UnorderedList {...listStyle}>
                <ListItem>
                    {characterIsValid
                        ? ValidIndicator
                        : InvalidIndicator}
                    6 characters minimum
                </ListItem>
                <ListItem>
                    {usernameAvailable
                        ? ValidIndicator
                        : InvalidIndicator}
                    checked
                </ListItem>
            </UnorderedList>
        </Box>
    );
};

interface TooltipFields {
    username: string,
}
const UsernameTooltips = ({ username }: TooltipFields) => {
    const [characterIsValid, setCharacterIsValid] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    const availableUsernames = useSelector((state: RootState) => state.signup);

    useEffect(() => {
        setCharacterIsValid(
            hasAtLeastXCharacters(username, MIN_USERNAME_LENGTH)
        );

        setUsernameAvailable(
            availableUsernames.includes(username.toLowerCase())
        );
    }, [username, availableUsernames]);

    return (
        <UsernameTooltipsView 
            characterIsValid={characterIsValid}
            usernameAvailable={usernameAvailable}/>
    );
};

export default UsernameTooltips;