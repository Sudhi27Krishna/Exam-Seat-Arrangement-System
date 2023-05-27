
//input as drop down
export default function DropDownInput({ input_id, title, inputRef, options, isTarget, handleSlot }) {
    const handleChange = () => {
        if (isTarget) {
            handleSlot();
        }
    }

    return (
        <div className="flex flex-col mb-2 md:mr-4">
            <label className="text-gray-700 font-Outfit-Bold mb-2 pl-2" htmlFor={input_id}>{title}</label>
            <select id={input_id} ref={inputRef} onChange={handleChange} className="h-10 px-3 py-2 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
                {options.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}
