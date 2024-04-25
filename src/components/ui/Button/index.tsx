import clsx from "clsx";

export default function Button({customClass, onClick, text, submit}: {
    customClass?: string,
    onClick?: () => void,
    text: string,
    submit?: boolean
}) {
    return (
        <button
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            className={clsx("text-gray-900 bg-gradient-to-r hover:scale-105 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-2 border-amber-700 transition active:scale-100", customClass)}
        >
            {text}
        </button>)
}
