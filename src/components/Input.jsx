import React from 'react'

export default function Input(props) {
    return (
        <div className="flex flex-col mb-2 md:mr-4">
            <label for="room-no" className="text-gray-700 font-bold mb-2 pl-2"><span className="whitespace-nowrap">{props.title}</span></label>
            <input id="room-no" type="text" className="w-5/6 h-10 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder="Room No" required />
        </div>
    )
}
