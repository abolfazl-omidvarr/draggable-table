import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {Person} from "../utils/types";
import {CreateData} from "../utils/helpers";

export interface AppProviderProps {
    children: ReactNode;
}

interface AppContextData {
    persons: Person[]
    setPersons: Dispatch<SetStateAction<Person[]>>
    modalOpen: boolean
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextData>({
    modalOpen: false,
    persons: [],
    setModalOpen: () => {},
    setPersons: () => {}
})

export default function AppContextProvider({children}: AppProviderProps) {
    const [persons, setPersons] = useState(CreateData(10));
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <AppContext.Provider value={{
            persons,
            setPersons,
            modalOpen,
            setModalOpen
        }}>
            {children}
        </AppContext.Provider>
    );
}
