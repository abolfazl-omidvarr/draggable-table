import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../providers/AppContextProviders.tsx";

export default function Header() {
    const {persons, setPersons} = useContext(AppContext)
    const [sort, setSort] = useState<'asc' | 'dec' | 'none'>('none')
    const onSortClickHandle = () => {
        if (sort === 'asc') {
            setSort('dec')
        } else if (sort === 'dec') {
            setSort('none')
        } else if (sort === 'none') {
            setSort('asc')
        }
    }

    useEffect(() => {
        const personsCopy = [...persons]
        if (sort === 'asc') {
            setPersons(personsCopy.sort((a, b) => Number(a.age) - Number(b.age)))
        } else if (sort === 'dec') {
            setPersons(personsCopy.sort((a, b) => Number(b.age) - Number(a.age)))
        } else if (sort === 'none') {
            setPersons(personsCopy.sort((a, b) => Number(a.id) - Number(b.id)))
        }
    }, [sort])
    return <div className='w-full h-[12%] bg-amber-200 flex px-3 select-none'>
        <div className='flex w-1/3 h-full justify-center items-center font-bold'>Full name</div>
        <div className='flex w-1/3 h-full justify-center items-center font-bold'>Username</div>
        <div className='flex w-1/3 h-full justify-center items-center font-bold'>
            <div onClick={onSortClickHandle}
                 className='h-[70%] bg-orange-500/30 px-10 flex justify-center items-center rounded-2xl cursor-pointer'>
                Age
                {sort === 'dec' &&<span className='ml-2 text-red-400 text-2xl'>↑</span>}
                {sort === 'asc' &&<span className='ml-2 text-green-600 text-2xl'>↓</span>}
            </div>
        </div>
    </div>
}
