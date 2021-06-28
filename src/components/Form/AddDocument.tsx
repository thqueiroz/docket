import { Box, Flex, Text, Button, Grid, Select } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './Input';
import { IDocumentsData, useDocuments } from '../../contexts/documents';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const createDocumentSchema = yup.object().shape({
    documentName: yup.string().required('Campo obrigatório'),
    userType: yup.string().required('Campo obrigatório'),
    cnpj: yup.string().required('Campo obrigatório'),
    socialReason: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório'),
    street: yup.string().required('Campo obrigatório'),
    addressNumber: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),
});

export function AddDocument() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(createDocumentSchema),
    });
    const { addToast } = useToasts();
    const { createDocument, getDocuments } = useDocuments();
    const { errors } = formState;

    const handleCreateDocument: SubmitHandler<IDocumentsData> = async (values, e) => {
        try {
            setLoading(true);
            await createDocument(values);
            setLoading(false);
            await getDocuments();
            reset();
            addToast('Documento salvo com sucesso', { appearance: 'success', autoDismiss: true });
        } catch {
            setLoading(false);
            addToast('Não foi possível salvar o documento. Tente novamente', { appearance: 'error', autoDismiss: true });
        }
    }

  return (
      <Flex 
        width="530px" 
        bgColor="white" 
        borderRadius="sm" 
        align="flex-start" 
        flexDirection="column"
        >
          <Box mt="4" ml="6">
              <Text fontWeight="normal" fontSize="2xl">
                  Adicionar documentos ao pedido
              </Text>
          </Box>
          <Box mt="4" width="530px" bgColor="gray.100" height="1px" />

          <Box as="form" onSubmit={handleSubmit(handleCreateDocument)}>
              <Flex mt="10" flexDirection="column" gridGap="4" ml="6" >
                  <Input name="documentName" label="Nome do documento" width="442px" {...register('documentName')} error={errors.documentName} />
                  <Select 
                    focusBorderColor="gray.100"
                    borderColor="blackAlpha.400"
                    bgColor="white"
                    variant="filled"
                    _hover={{
                        bgColor: "white"
                    }}
                    size="lg"
                    placeholder="Selecione"
                    name="userType" 
                    label="Tipo de pessoa" 
                    width="286px"
                    {...register('userType')} 
                    error={errors.userType}
                    >
                      <option defaultChecked value="Pessoa Física">Pessoa física</option>
                      <option value="Pessoa Jurídica">Pessoa jurídica</option>
                  </Select>
                  <Input name="cnpj" label={'CPF'} width="442px" {...register('cnpj')} error={errors.cnpj} />
                  <Input name="socialReason" label="Razão social" width="442px" {...register('socialReason')} error={errors.socialReason} />
              </Flex>

              <Box mt="7" ml="6">
                  <Text fontWeight="bold" fontSize="xl" >
                      Dados do cartório
                  </Text>
              </Box>

              <Grid mt="6" ml="6" templateColumns="repeat(2, 1fr)" gridGap="4" gap="6">
                  <Input name="cep" label="CEP" onDragEnter={() => console.log('teste')} width="176px"  {...register('cep')} error={errors.cep}  />
                  <Box />
                  <Input name="street" label="Rua" width="328px" {...register('street')} error={errors.street} />
                  <Input name="addressNumber" label="Número" width="130px" {...register('addressNumber')} error={errors.addressNumber}  />
                  <Input name="city" label="Cidade" width="328px" {...register('city')} error={errors.city} />
                  <Input name="uf" label="UF" width="130px" {...register('uf')} error={errors.uf} />
              </Grid>

              <Box mt="6" ml="6" mb="6">
                  <Button
                      height="32px"
                      width="146"
                      bgColor="blue.600"
                      borderRadius="2xl"
                      color="white"
                      _hover={{ bgColor: "blue.400" }}
                      type="submit"
                      isDisabled={loading}
                      isLoading={loading}
                      loadingText="Aguarde"
                  >
                      Criar documento
                  </Button>
              </Box>
          </Box>
      </Flex>
  );
}