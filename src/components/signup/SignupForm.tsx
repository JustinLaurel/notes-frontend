import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { baseMargins } from '../../utils/styles';
import {
    FormControl,
    InputLeftElement,
    InputGroup,
    Input,
    chakra,
    Grid,
    Button,
    useToast
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaAddressCard } from 'react-icons/fa';

import { useField } from '../../utils/hooks';
import { SignupFormViewFields } from '../../types';
import Tooltips from './tooltips/Tooltips';

import { 
    MAX_NAME_LENGTH, 
    MAX_USERNAME_LENGTH, 
    MAX_PASSWORD_LENGTH} from '../../constants';
import { signup } from "../../state/reducers/signup";
import signupToasts from '../../utils/toasts/signup';
import { loginToasts } from '../../utils/toasts/login';
import { isTokenData } from '../../validators/loginValidators';
import { hideSignupForm, hideSignupSpinner, showSignupSpinner } from '../../state/reducers/userFormViews';
import UsernameAvailableButton from './CheckUsernameButton';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaAddressCard = chakra(FaAddressCard);

const SignupFormView = 
    ({ firstName, lastName, username, password, verify, spinnerVisible, handleSignup }: SignupFormViewFields) => {

    const inputStyle = {
        "size": "sm",
        "w": "100%",
        "variant": "filled"
    };

    const containerStyle = {
        'templateColumns': '1fr 1fr',
        'templateAreas':
            `'firstName lastName'
            'username username'
            'password verify'
            'tooltips submit'`,
        'width': 400,
        'columnGap': '5px',
        'rowGap': '7px',
    };

    const buttonStyle = {
        "size": "xs",
        "textColor": "white",
        "bgColor": "blue.700",
        "width": "min-content",
        "_hover": {bg: "blue.400"},
        "justifySelf": "right",
        "marginRight": "10px",
        "display": "inline",
        "type": "submit" as const
    };

    const SubmitButton = spinnerVisible
            ? <Button {...buttonStyle} gridArea='submit' isLoading onSubmit={handleSignup}>sign up</Button>
            : <Button {...buttonStyle} gridArea='submit' onSubmit={handleSignup}>sign up</Button>;

    return (
        <FormControl as="form" {...baseMargins} onSubmit={handleSignup}>
            <Grid {...containerStyle}>
                <InputGroup {...inputStyle} gridArea='firstName'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CFaAddressCard />} />
                    <Input
                        {...firstName}
                        {...inputStyle}
                        maxlength={MAX_NAME_LENGTH} 
                        placeholder='first name'/>
                </InputGroup>
                <InputGroup {...inputStyle} gridArea='lastName'>
                    <Input
                        {...lastName} 
                        {...inputStyle} 
                        maxlength={MAX_NAME_LENGTH} 
                        placeholder='last name'/>
                </InputGroup>
                <InputGroup {...inputStyle} gridArea='username'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CFaUserAlt />} />
                    <Input 
                        {...username} 
                        {...inputStyle} 
                        maxlength={MAX_USERNAME_LENGTH} 
                        placeholder='username'/>
                    <UsernameAvailableButton username={username.value} />
                </InputGroup>
                <InputGroup {...inputStyle} gridArea='password'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CFaLock />} />
                    <Input 
                        {...password}
                        {...inputStyle}
                        maxlength={MAX_PASSWORD_LENGTH}
                        placeholder='password'/>
                </InputGroup>
                <InputGroup {...inputStyle} gridArea='verify'>
                    <Input {...verify} {...inputStyle} placeholder='verify'/>
                </InputGroup>
                <Tooltips username={username.value} password={password.value} gridArea='tooltips'/>
                {SubmitButton}
            </Grid>
        </FormControl>
    );
};

const SignupForm = () => {
    const formVisible = useSelector((state: RootState) => state.userFormViews.signupForm);
    const spinnerVisible = useSelector((state: RootState) => state.userFormViews.signupSpinner);
    const dispatch = useDispatch();
    const toast = useToast();

    const username = useField('text');
    const firstName = useField('text');
    const lastName = useField('text');
    const password = useField('password');
    const verify = useField('password');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
    
        new Promise((resolve) => {
            dispatch(showSignupSpinner());

            const tokenData = dispatch(signup({
                username: username.value,
                firstName: firstName.value,
                lastName: lastName.value,
                password: password.value,
                verify: verify.value,
            }));
            resolve(tokenData);
        })
        .then(tokenData => {
            if (isTokenData(tokenData)) {
                toast(loginToasts.success(tokenData.name));
                username.clearField();
                firstName.clearField();
                lastName.clearField();
                password.clearField();
                verify.clearField();
                dispatch(hideSignupForm());
            }
        })
        .catch((error) => {
            console.error(`Failed to create user: ${error.message}`);
            toast(signupToasts.failed(`Failed to create user`));
        })
        .finally(() => {
            dispatch(hideSignupSpinner());
        });
    };

    return (
        formVisible 
            ? <SignupFormView 
                username={username} 
                firstName={firstName} 
                lastName={lastName}
                password={password}
                verify={verify}
                handleSignup={handleSignup}
                spinnerVisible={spinnerVisible} />
            : null
    );
};

export default SignupForm;