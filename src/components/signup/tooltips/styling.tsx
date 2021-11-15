import React from 'react';
import { 
    chakra,
    ListIcon
} from '@chakra-ui/react';

import { MdCheckCircle } from 'react-icons/md';
import { ImCross } from 'react-icons/im';

export const CheckCircle = chakra(MdCheckCircle);
export const Cross = chakra(ImCross);

export const tooltipStyle = {
    'padding': '0',
    'marginLeft': '0',
    'fontSize': '14',
    'fontFamily': '"Lato",  sans serif',
};

export const headingStyle = {
    'fontWeight': 'bold'
};

export const listStyle = {
    'listStyleType': 'none'
};

export const ValidIndicator = <ListIcon as={CheckCircle} color="green.500" />;
export const InvalidIndicator = <ListIcon as={Cross} color="red.500" />;