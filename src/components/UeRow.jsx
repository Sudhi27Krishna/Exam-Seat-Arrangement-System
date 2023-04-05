import React from 'react'
//row for exam time table
export default function UeRow({date, branch, slot, subject}) {
    return (
        <tr className="bg-gray-100">
            <td className="px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></td>
            <td className="px-4 py-2">{date}</td>
            <td className="px-4 py-2">{branch}</td>
            <td className="px-4 py-2">{slot}</td>
            <td className="px-4 py-2">{subject}</td>
            <td className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"><button className="text-red-500 hover:text-red-700">Delete</button></td>
        </tr>
    );
}