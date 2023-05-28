import Input from './Input';
import DropDownInput from './DropDownInput';
import { useState, useRef, useEffect } from 'react';
import Row from './Row';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const url = '/manage-room';

export default function ManageRoom() {
    const [rows, setRows] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const formRef = useRef();
    const roomNoRef = useRef();
    const floorNoRef = useRef();
    const blockRef = useRef();
    const capacityRef = useRef();
    const navigate = useNavigate();
    let totalCapacity = rows.reduce((total, obj) => total + obj.capacity, 0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    const isHalfWidth = (windowWidth <= 1384);

    const handleRoom = (e) => {
        e.preventDefault();
        const newRoom = { room_no: roomNoRef.current.value, floor_no: Number(floorNoRef.current.options[floorNoRef.current.selectedIndex].value), block: blockRef.current.options[blockRef.current.selectedIndex].value, capacity: Number(capacityRef.current.value) };

        let isMounted = true;
        const controller = new AbortController();

        const postRooms = async () => {
            try {
                await axiosPrivate.post(url, newRoom, {
                    signal: controller.signal
                });
                isMounted && setRows(prev => [...prev, newRoom]);
            } catch (error) {
                console.log(error);
            }
        }

        postRooms();

        formRef.current.reset();
        roomNoRef.current.focus();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getRooms = async () => {
            try {
                const response = await axiosPrivate.get(url, {
                    signal: controller.signal
                });
                isMounted && setRows(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getRooms();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate]);

    const handleDelete = (room) => {
        let isMounted = true;
        const controller = new AbortController();

        const deleteRoom = async () => {
            try {
                await axiosPrivate.delete(url.concat(`/${room}`), {
                    signal: controller.signal
                });
                isMounted && setRows(prev => prev.filter(item => item.room_no !== room));
            } catch (error) {
                console.log(error);
            }
        }

        deleteRoom();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const handleClearall = () => {
        const confirmBox = window.confirm(
            "Do you want to clear the entire table in this page ?"
        )
        if (confirmBox) {
            console.log("Entire table deleted");
        }
    }

    const handleNext = () => {
        navigate('/university-exam')
    }

    return (
        <div className="bg-background flex flex-col flex-grow">
            <div className="px-8 pt-4 mt-6">
                <h2 className="text-xl font-Outfit-Bold mb-3">ADD ROOM</h2>
                <form ref={formRef} className={`flex ${isHalfWidth ? "flex-col" : "flex-row"} justify-between`} onSubmit={handleRoom}>
                    <Input input_id="room-no" title="Room No" inputRef={roomNoRef} type="text" placeholder="M101" required />
                    <DropDownInput id="branch" title="Floor No" inputRef={floorNoRef} options={['1', '2', '3', '4', '5']} required />
                    <DropDownInput id="slot" title="Block" inputRef={blockRef} options={['M-George', 'Ramanujan']} required />
                    <Input input_id="total-seats" title="Available Seats" inputRef={capacityRef} type="text" placeholder="30" required />
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-Outfit-Bold py-1 px-2 my-7 mx-2 h-10 w-[5rem] rounded-[20px]" type="submit">ADD</button>
                </form>
            </div>

            <div className="px-8 py-4">
                <h2 className="text-xl font-Outfit-Bold mb-3">AVAILABLE ROOMS</h2>
                <div className={`flex flex-wrap items-center bg-gray-100 p-4 rounded-md font-Outfit-Regular`}>
                    {/* Search Bar */}
                    <div className="flex-grow flex flex-row items-center">
                        <span className="ml-2 text-gray-500 flex-none">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                <path
                                    fillRule="evenodd"
                                    d="M8.5 15a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm5.057-1.54l4.442 4.442a1 1 0 11-1.414 1.414l-4.442-4.442a7 7 0 111.414-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full p-2 mx-2 my-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login"
                        />
                    </div>
                    <div className="flex-grow flex flex-row">
                        {/* Sort By Dropdown */}
                        <div className="flex-grow flex flex-row items-center ">
                            <p className="ml-2 whitespace-nowrap">Sort By :</p>
                            <select className="w-full p-[10.4px] m-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login"
                                defaultValue="">
                                <option value="" disabled hidden></option>
                                <option value="floor_asc">Floor (0 - 5)</option>
                                <option value="floor_desc">Floor (5 - 0)</option>
                                <option value="latest">Latest (New - Old)</option>
                                <option value="Oldest">Oldest (Old - New)</option>
                            </select>
                        </div>

                        {/* Filter By Dropdown */}
                        <div className="flex-grow flex flex-row items-center">
                            <p className="ml-2 whitespace-nowrap">Filter By :</p>
                            <select className="w-full p-[10.4px] m-1 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login" defaultValue="">
                                <option value="" disabled hidden></option>
                                <option value="category_R">Ramanujan Block</option>
                                <option value="category_M">M-George Block</option>
                                <option value="category_0">Ground Floor</option>
                                <option value="category_1">First Floor</option>
                                <option value="category_2">Second Floor</option>
                                <option value="category_3">Third Floor</option>
                                <option value="category_4">Fourth Floor</option>
                                <option value="category_5">Fifth Floor</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="h-72 overflow-y-auto">
                    <table className="table-auto w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-grey-all font-Outfit-Bold">
                                <th className="text-center px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><span className="whitespace-nowrap">Room No</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Floor No</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Block</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Available Seats</span></th>
                                <th className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(item => <Row key={item._id} room={item.room_no} floor={item.floor_no} block={item.block}
                                available={item.capacity} handleDelete={handleDelete} />)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-8 py-4 mt-4">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className="font-Outfit-Regular">Total Seats Available: {totalCapacity}</p>
                    </div>
                    <div className="flex flex-row gap-10">
                        <button className="bg-gray-500 hover:bg-gray-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" onClick={handleClearall}>CLEAR ALL</button>
                        <button className="bg-green-500 hover:bg-green-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" onClick={handleNext}>NEXT</button>
                    </div>
                </div>
            </div>
        </div >
    );
}
