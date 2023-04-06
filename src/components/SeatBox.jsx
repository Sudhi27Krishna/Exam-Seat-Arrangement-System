import React from 'react';

export default function SeatBox({ room, capacity }) {
    return (
        <div className=" inline-grid place-items-center bg-grey-all w-16 h-16 border rounded-2xl m-2 py-2">
            <p className="font-Outfit-Bold">{room}</p>
            <p className="font-Outfit-Bold text-green-save">{capacity}</p>
        </div>
    );
}
