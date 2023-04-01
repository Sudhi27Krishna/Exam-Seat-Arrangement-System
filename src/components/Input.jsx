import React from 'react'

export default function Input(props) {
    return (
        <div className="flex flex-col mb-2 md:mr-4">
            <label htmlFor={props.title} className="text-gray-700 font-bold mb-2 pl-2"><span className="whitespace-nowrap">{props.title}</span></label>
            <input id={props.title} type="text" className="w-11/12 h-10 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder={props.title} required />
        </div>
    )
}
