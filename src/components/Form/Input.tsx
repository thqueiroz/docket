import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps } from "@chakra-ui/react";
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface IProps extends InputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = ({ name, label, error = null, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                id={name}
                name={name}
                focusBorderColor="gray.100"
                borderColor="blackAlpha.400"
                bgColor="white"
                variant="filled"
                _hover={{
                    bgColor: "white"
                }}
                size="lg"
                ref={ref}
                {...rest}
            />
            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}

export const Input = forwardRef(InputBase);