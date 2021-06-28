import { Box, Flex, Text, Stack } from "@chakra-ui/react";

interface IProps {
    title: string;
    description: string;
    createdAt: string;
    createdBy: string;
}

export function CardHorizontal({ title, description, createdAt, createdBy }: IProps) {
    return (
        <Flex 
            flexDirection="column" 
            ml="8" 
            mr="8" 
            boxShadow="sm"
            bgColor="white"
            borderRadius="sm"
        >
            <Box ml="6" mt="6">
                <Text fontWeight="semibold" fontSize="xl">
                    {title}
                </Text>
            </Box>
            <Box mt="6" ml="6" mr="6" mb="6">
                <Text fontWeight="normal" fontSize="md">
                    <b>Observação:</b> {description}
                </Text>
                <Stack direction="row" mt="4" gridGap="5">
                    <Text fontWeight="normal" fontSize="md">
                        <b>Criado por:</b> {createdBy}
                    </Text>
                    <Text fontWeight="normal" fontSize="md" ml="5">
                        <b>Data de criação:</b> {createdAt}
                    </Text>
                </Stack>
            </Box>
        </Flex>
    )
}