
export default function AllocRow({ block, floor, room, initial }) {
    return (
        <tr className="bg-gray-100">
            <td className="text-center px-4 py-2 rounded-tl-2xl rounded-bl-2xl">{block}</td>
            <td className="text-center px-4 py-2">{floor}</td>
            <td className="text-center px-4 py-2">{room}</td>
            <td className="text-center px-4 py-2">{initial}</td>
        </tr>
    )
}