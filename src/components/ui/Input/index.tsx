import {UseFormRegister} from "react-hook-form";
import {Person} from "../../../utils/types.ts";
import clsx from 'clsx';


export default function Input({name, register, isError, patter, errorText,placeholder}: {
    name: 'fullName' | 'userName' | 'age',
    register: UseFormRegister<Person>,
    isError: boolean
    patter?: RegExp,
    errorText?: string,
    placeholder: string
}) {

    return (
        <div className='w-full'>
            <input
                placeholder={placeholder}
                {...register(name, {required: true, pattern: patter})}
                className={clsx('w-full h-10 rounded-lg p-2 border-none outline-none', {'outline-red-200': isError})}
            />
            {isError && <p className='text-xs ml-2 mt-2 text-red-700'>{errorText}</p>}
        </div>

    )
}
