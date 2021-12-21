import React, { useState, useEffect } from 'react';
import {
    UnorderedList,
    ListItem,
    Box
} from '@chakra-ui/react';
import { 
    tooltipStyle,
    headingStyle,
    listStyle,
    ValidIndicator,
    InvalidIndicator,
} from './styling';

import { 
    hasAtLeastOneLetter,
    hasAtLeastOneNumber,
    hasAtLeastXCharacters,
} from '../../../validators/userValidators';

import { MIN_PASSWORD_LENGTH } from '../../../constants';

interface TooltipsViewFields {
    letterIsValid: boolean,
    numberIsValid: boolean,
    characterIsValid: boolean,
}

const PasswordTooltipsView = 
    ({ letterIsValid, numberIsValid, characterIsValid }: TooltipsViewFields) => {
    return (
        <Box {...tooltipStyle}>
            <Box as='span' {...headingStyle}>Password</Box>
            <UnorderedList {...listStyle}>
                <ListItem>
                    {letterIsValid
                        ? ValidIndicator
                        : InvalidIndicator}
                    1 letter minimum
                </ListItem>
                <ListItem>
                    {numberIsValid
                        ? ValidIndicator
                        : InvalidIndicator}
                    1 number minimum
                </ListItem>
                <ListItem>
                    {characterIsValid
                        ? ValidIndicator
                        : InvalidIndicator}
                    8 characters minimum
                </ListItem>
            </UnorderedList>
        </Box>
    );
};

interface TooltipsFields {
    password: string,
}

const PasswordTooltips = ({ password }: TooltipsFields) => {
    const [characterIsValid, setCharacterValidity] = useState(false);
    const [numberIsValid, setNumberValidity] = useState(false);
    const [letterIsValid, setLetterValidity] = useState(false);

    useEffect(() => {
        setCharacterValidity(
            hasAtLeastXCharacters(password, MIN_PASSWORD_LENGTH));
        setNumberValidity(
            hasAtLeastOneNumber(password));
        setLetterValidity(
            hasAtLeastOneLetter(password));
    }, [password]);

    return (
        <PasswordTooltipsView
            letterIsValid={letterIsValid}
            numberIsValid={numberIsValid}
            characterIsValid={characterIsValid}/>
    );
};

export default PasswordTooltips;