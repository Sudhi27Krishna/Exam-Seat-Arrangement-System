import React, { useState } from 'react';
//input as drop down
export default function DropDownInput({ input_id, title, initial, options }) {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectOption = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <div className="flex flex-col mb-2 md:mr-4">
            <label className="text-gray-700 font-Outfit-Bold mb-2 pl-2" htmlFor={input_id}>{title}</label>
            <select id={input_id} value={selectedOption} onChange={handleSelectOption} className="h-10 px-3 py-2 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
                <option value="">{initial}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>

    );
}
