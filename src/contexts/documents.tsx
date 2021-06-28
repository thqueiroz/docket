import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { v4 } from 'uuid';

interface IDocumentsContextData {
    documents: IDocumentsData[];
    getDocuments(): Promise<void>;
    createDocument(document: IDocumentsData): Promise<void>;
    deleteDocument(id: string);
}

interface IDocumentsProviderProps {
    children: ReactNode;
}

export interface IDocumentsData {
    id: string;
    documentName: string;
    userType: string;
    cnpj: string;
    socialReason: string;
    cep: string;
    street: string;
    addressNumber: number;
    city: string;
    uf: string;
}

const DocumentsContext = createContext({} as IDocumentsContextData);


function DocumentsProvider({ children }: IDocumentsProviderProps) {
    const [documents, setDocuments] = useState<IDocumentsData[]>([]);

    async function getDocuments() {
        const response = await api.get('documents');
        setDocuments(response.data);
    }

    async function createDocument(document: IDocumentsData) {
        const payload = {
            id: v4(),
            ...document
        };

        await api.post('documents', payload);
    }

    async function deleteDocument(id: string) {
        await api.delete(`documents/${id}`);
    }

    return (
        <DocumentsContext.Provider value={{ documents, getDocuments, createDocument, deleteDocument }}>
            {children}
        </DocumentsContext.Provider>
    );
}

function useDocuments(): IDocumentsContextData {
    const context = useContext(DocumentsContext);

    if (!context) {
        throw new Error('useDocuments must be used  within an DocumentsProvider');
    }

    return context;
}

export { DocumentsProvider, useDocuments }