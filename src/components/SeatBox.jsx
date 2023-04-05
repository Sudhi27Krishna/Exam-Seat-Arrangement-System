import React from 'react';

export default function SeatBox({ room, capacity }) {
    return (
        <div className=" inline-grid place-items-center bg-slate-400 w-16 h-16 border rounded-2xl m-2">
            <p>{room}</p>
            <p>{capacity}</p>
        </div>
    )
}
