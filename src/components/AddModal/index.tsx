import {motion, AnimatePresence} from "framer-motion"
import {useContext} from "react";
import {AppContext} from "../../providers/AppContextProviders.tsx";
import {useForm, SubmitHandler} from "react-hook-form"
import {Person} from "../../utils/types.ts";
import Input from "../ui/Input";
import Button from "../ui/Button";


export default function AddModal() {
    const onOverlayClickHandle = () => {
        setModalOpen(false)
    }
    const {setPersons, persons, setModalOpen, modalOpen} = useContext(AppContext)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<Person>({
        defaultValues: {
            fullName: '',
            userName: '',
            age: '',
        }
    })
    const onSubmit: SubmitHandler<Person> = (data) => {
        const lastPersonId = persons.sort((a, b) => Number(a.id) - Number(b.id))[persons.length - 1].id

        setPersons([...persons, {
            age: data.age,
            userName: data.userName,
            fullName: data.fullName,
            id: lastPersonId ? Number(lastPersonId) + 1 : Math.floor(Math.random() * 10000000)
        }])

        setModalOpen(false)
        setTimeout(() => {
            reset()
        }, 200)
    }

    const onCancelHandle = () => {
        setModalOpen(false)
        setTimeout(() => {
            reset()
        }, 200)
    }

    return <AnimatePresence>
        {modalOpen && <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.15}}
            className='absolute z-50 w-full h-full bg-black/30 backdrop-blur flex justify-center items-center'
            onClick={onOverlayClickHandle}
        >
            <div onClick={(e) => e.stopPropagation()} className='bg-amber-100 w-[400px] rounded-2xl p-5 shadow-2xl'>
                <p className='font-bold'> Please enter person's information</p>
                <form
                    className='flex flex-col px-10 mt-5 gap-3 justify-center items-center'
                    onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder='Full name'
                        name='fullName'
                        patter={/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/}
                        isError={!!errors['fullName']}
                        register={register}
                        errorText='Please enter a valid fullname'
                    />
                    <Input
                        placeholder='Username'
                        name='userName'
                        isError={!!errors['userName']}
                        register={register}
                        errorText='Please enter a valid userName'
                    />
                    <Input
                        placeholder='Age'
                        name='age'
                        patter={/^([0-9]|[1-9][0-9]|1[01][0-9]|120)$/}
                        isError={!!errors['age']}
                        register={register}
                        errorText='Please enter a valid age between 10 and 120'
                    />
                    <div className='flex w-full'>
                        <Button customClass='w-full from-teal-200 to-lime-200' text='Confirm' submit/>
                        <Button customClass='w-full from-red-300 to-red-700' onClick={onCancelHandle} text='Cancel'/>
                    </div>
                </form>
            </div>
        </motion.div>}
    </AnimatePresence>
}
