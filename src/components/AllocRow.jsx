import React from 'react'

export default function Row({ block, floor, room, initial }) {
    return (
        <tr className="bg-gray-100">
            <td className="px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></td>
            <td className="px-4 py-2">{block}</td>
            <td className="px-4 py-2">{floor}</td>
            <td className="px-4 py-2">{room}</td>
            <td className="px-4 py-2">{initial}</td>
        </tr>
    )
}