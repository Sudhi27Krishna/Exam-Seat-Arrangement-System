import React from 'react';

export default function Row({room, floor, block, available, initial}) {
    return (
        <tr className="bg-gray-100">
            <td className="px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></td>
            <td className="px-4 py-2">{room}</td>
            <td className="px-4 py-2">{floor}</td>
            <td className="px-4 py-2">{block}</td>
            <td className="px-4 py-2">{available}</td>
            <td className="px-4 py-2">{initial}</td>
            <td className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"><button className="text-red-500 hover:text-red-700">Button</button></td>
        </tr>
    );
}
