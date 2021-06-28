import { Flex, Image } from "@chakra-ui/react";


export function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            h="56px"
            px="6"
            mx="auto"
            backgroundImage="./images/header-background.svg"
            bgRepeat="repeat"
        >
            <Image src="./images/logo.svg" alt="Logo" w="12" h="10" color="white" mr="7" />
        </Flex>
    );
}