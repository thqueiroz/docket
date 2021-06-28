import { Flex, Image, Text, IconButton, Icon, Box , Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';
import { IDocumentsData, useDocuments } from '../../contexts/documents';

interface IProps {
    document?: IDocumentsData;
}

export function DocumentCard({ document } : IProps) {
    const [loading, setIsLoading] = useState(false);
    const { deleteDocument, getDocuments } = useDocuments();
    const { addToast } = useToasts();

    if (!document) {
        return (
            <Flex
                height="349px"
                width="100%"
                bgColor="white"
                justify="center"
                align="center"
                flexDirection="column"
            >
                <Image src="./images/document.svg" alt="Document" />
                <Text color="gray.300" mt="4">
                    Nenhum documento criado
                </Text>
            </Flex>
        );
    }

    async function handleDeleteDocument(id: string) {
        try {
            setIsLoading(true);
            await deleteDocument(id);
            setIsLoading(false);
            addToast('Documento excluído com sucesso', { appearance: 'success', autoDismiss: true });
            await getDocuments();
        } catch {
            setIsLoading(false);
            addToast('Não foi possível excluir o documento. Tente novamente', { appearance: 'error', autoDismiss: true });
        }
    }

    if (loading) {
        return (
            <Flex align="center" justify="center">
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex 
            width="100%"
            maxHeight="349px"
            bgColor="white" 
            flexDirection="column"
        >
            <Flex justify="space-between">
                <Text fontSize="xl" mt="4" ml="6" fontWeight="bold">
                    {document.documentName}
                </Text>
                <IconButton 
                    fontSize="24"
                    aria-label="Open Navigation"
                    variant="unstyled"
                    mr="6" 
                    color="blue.200"
                    icon={<Icon as={FiTrash} />}
                    onClick={() => handleDeleteDocument(document.id)}
                    />
            </Flex>
            
            <Box mt="6" width="100%" bgColor="gray.100" height="1px" />

            <Flex justify="space-around" align="center" mt="4">
                <Box mr="6">
                    <Text fontSize="sm" mt="4" ml="6" fontWeight="bold">
                        {document.userType}
                    </Text>
                    <Text fontSize="sm" mt="4" ml="6" color="gray.500">
                        Nome: {document.socialReason}
                    </Text>
                    <Text fontSize="sm" mt="4" ml="6" color="gray.500">
                        CPF: {document.cnpj}
                    </Text>
                </Box>

                <Box>
                    <Text fontSize="sm" mt="4" ml="6" fontWeight="bold">
                        Dados do cartório
                    </Text>
                    <Text fontSize="sm" mt="4" ml="6" color="gray.500">
                        CEP: {document.cep}
                    </Text>
                    <Text fontSize="sm" mt="4" ml="6" color="gray.500">
                        Rua: {document.street}
                    </Text>
                    <Text fontSize="sm" mt="4" ml="6" color="gray.500">
                        Cidade: {`${document.city}-${document.uf}`}
                    </Text>
                </Box>
            </Flex>

            <Box mt="6" width="100%" bgColor="gray.100" height="1px" />

            <Text fontSize="sm" mt="6" ml="6" color="gray.500" mb="6">
                <span style={{ color: 'black', fontWeight: 'bold'}}>Data de criação:</span> 11 de maio de 2021
            </Text>
        </Flex>
    )
}