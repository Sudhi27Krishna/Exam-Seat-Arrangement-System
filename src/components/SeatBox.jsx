import { useState } from "react";
export default function SeatBox({ room, capacity, setSelectedRooms, setSeatSelected, bookedRooms }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            console.log(room);
            setSelectedRooms(prev => [...prev, room]);
            setSeatSelected(prev => prev + capacity);
        }
        else {
            console.log(room);
            setSelectedRooms(prev => prev.filter(item => item !== room));
            setSeatSelected(prev => prev - capacity);
        }
    };
    return (
        <div className={`inline-grid place-items-center ${bookedRooms.length > 0 ? bookedRooms.includes(room) ? 'bg-red-500' : 'bg-grey-all'
            : isChecked ? 'bg-green-save' : 'bg-grey-all'} w-16 h-16 border rounded-2xl m-2 py-2 cursor-pointer`} checked={isChecked} onClick={bookedRooms.length > 0 ? null : handleChange}>
            <p className="font-Outfit-Bold cursor-pointer select-none">{room}</p>
            <p className={`font-Outfit-Bold ${bookedRooms.length > 0 ? bookedRooms.includes(room) && 'bg-red-500 text-white' : isChecked ? 'text-white' : 'text-green-save'} cursor-pointer select-none`}>{capacity}</p>
        </div >
    );
}
