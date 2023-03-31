import React from 'react'
//row for available rooms
export default function Row(props) {
    return (
        <tr className="bg-gray-100">
            <td className="px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></td>
            <td className="px-4 py-2">{props.room}</td>
            <td className="px-4 py-2">{props.floor}</td>
            <td className="px-4 py-2">{props.block}</td>
            <td className="px-4 py-2">{props.available}</td>
            <td className="px-4 py-2">{props.default}</td>
            <td className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"><button className="text-red-500 hover:text-red-700">Delete</button></td>
        </tr>
    )
}
