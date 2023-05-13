import { useState } from "react";
export default function SeatBox({ room, capacity, setSelectedRooms }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
        if(!isChecked){
            console.log(room);
            setSelectedRooms(prev => [...prev, room]);
        }
        else{
            console.log(room);
            setSelectedRooms(prev => prev.filter(item => item !== room));
        }
    };
    return (
        <div className={`inline-grid place-items-center ${isChecked ? 'bg-green-save' : 'bg-grey-all'} w-16 h-16 border rounded-2xl m-2 py-2 cursor-pointer`} checked={isChecked} onClick={handleChange} >
            <p className="font-Outfit-Bold cursor-pointer select-none">{room}</p>
            <p className={`font-Outfit-Bold ${isChecked ? 'text-white' : 'text-green-save'} cursor-pointer select-none`}>{capacity}</p>
        </div >
    );
}
