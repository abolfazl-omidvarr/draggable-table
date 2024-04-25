import {DraggableTable} from "./components/DraggableTable";
import AddModal from "./components/AddModal";
import {useContext} from "react";
import {AppContext} from "./providers/AppContextProviders.tsx";
import Button from "./components/ui/Button";

function App() {
    const {setModalOpen, } = useContext(AppContext)

    return (
        <main className='bg-amber-100 h-screen w-screen overflow-hidden grid place-content-center relative'>
            <div>
                <Button onClick={()=>setModalOpen(true)} text='Add Item +' customClass='from-teal-200 to-lime-200'/>
                <DraggableTable/>
            </div>
            <AddModal/>
            <p className='font-bold text-xs mt-2'>* A delay of 200ms has been applied to trigger drag</p>
        </main>
    )
}

export default App
