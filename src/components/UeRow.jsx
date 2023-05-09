//row for exam time table
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function UeRow({ id, date, time, sem, branch, slot, subcode, handleDelete }) {
    const handleClick = () => {
        handleDelete(id);
    }
    return (
        <tr className="bg-gray-100">
            <td className="text-center px-4 py-2 rounded-tl-2xl rounded-bl-2xl">{date}</td>
            <td className="text-center px-4 py-2">{time}</td>
            <td className="text-center px-4 py-2">{sem}</td>
            <td className="text-center px-4 py-2">{branch}</td>
            <td className="text-center px-4 py-2">{slot}</td>
            <td className="text-center px-4 py-2">{subcode}</td>
            <td className="text-center px-4 py-2 rounded-tr-2xl rounded-br-2xl"><button className="text-red-500 hover:text-red-700" onClick={handleClick}>
                <FontAwesomeIcon icon={faTrashAlt} title="delete" /></button></td>
        </tr>
    );
}