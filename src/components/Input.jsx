import React from 'react'
//input as textfield
export default function Input(props) {
    return (
        <div className="flex flex-col mb-2 md:mr-4">
            <label htmlFor={props.id} className="text-gray-700 font-bold mb-2 pl-2 font-OB"><span className="whitespace-nowrap">{props.title}</span></label>
            <input id={props.title} type="text" className="h-10 px-3 py-2 rounded-[20px] shadow-sm border-gray-300 focus:outline-green-login"
                placeholder={props.placeholder} required />
        </div>
    );
}
