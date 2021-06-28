import { Text, Flex, Box, Stack, Grid, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { Header } from "../components/Header"
import { CardHorizontal } from '../components/CardHorizontal'; 
import { AddDocument } from '../components/Form/AddDocument';
import { Footer } from '../components/Footer';
import { DocumentCard } from '../components/DocumentCard';
import { useDocuments } from '../contexts/documents';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

export default function Home() {
  const { documents, getDocuments } = useDocuments();
  const [loading, setLoading]  = useState(false);
  const { addToast } = useToasts();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function fetchData() {
    try {
      setLoading(true);
      await getDocuments();
      setLoading(false);
    } catch {
      setLoading(false);
      addToast('Não foi possível carregar os dados. Tente novamente.', { appearance: 'error', autoDismiss: true })
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <Flex justify="center" align="center" mt="10">
          <Spinner />
        </Flex>
      </>
    )
  }

  return (
    <>
      <Header />
      <Flex w="100vw" flexDirection="column">
        <Box ml="7" mt="6">
          <Text fontWeight="bold" fontSize="2xl">Pedido #1</Text>  
        </Box>
        <Box mt="4">
          <CardHorizontal
            title="Lead: Documento para criar contrato" 
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin commodo faucibus. Nullam ut pharetra turpis. Vestibulum molestie turpis ac tortor dapibus porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam in elit vitae ligula consectetur hendrerit id id odio. Vestibulum volutpat gravida arcu sit amet tempus. In rhoncus leo vel dolor convallis gravida id a nulla.'
            createdBy="João da Silva"
            createdAt="11 de maio de 2021"
          />
        </Box>
        <Stack mt="4" ml="7" mr="8" mb="12" direction={isWideVersion ? "row" : 'column'} spacing="4">
          <AddDocument />
          <Grid flexDirection="column" gridGap="4" width="100%">
            {documents?.length > 0 ? documents.map((document) => (
              <DocumentCard 
                key={document.id} 
                document={document}
              />
            )): (
              <DocumentCard />
            )}
          </Grid>
        </Stack>
      </Flex>
      <Footer />
    </>
  )
}