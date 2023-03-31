import Input from './Input';
import React from 'react'
import row from '../row';
import Row from './Row';

export default function ManageRoom() {
    return (
        <div className="bg-background flex flex-col flex-grow">
            <div className="px-8 pt-4">
                <h2 className="text-2xl font-bold mb-8">ADD ROOM</h2>
                <form className="flex flex-col md:flex-row justify-evenly">
                    <Input title="Room No" />
                    <Input title="Floor No" />
                    <Input title="Block" />
                    <Input title="Total Seats" />
                    <Input title="Default Seats" />
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 my-7 mx-2 h-10 w-[5rem] rounded-[20px]" type="submit">ADD</button>
                </form>
            </div>
            <div className="px-8 py-4">
                <h2 className="text-2xl font-bold mb-4">AVAILABLE ROOMS</h2>
                <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-md">
                    {/* Search Bar */}
                    <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
                        <span className="text-gray-500">
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
                            className="ml-2 flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="w-full sm:w-1/3 sm:mx-2 mb-2 sm:mb-0">
                        <select
                            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>
                                Sort By
                            </option>
                            <option value="name_asc">Name (A - Z)</option>
                            <option value="name_desc">Name (Z - A)</option>
                            <option value="date_asc">Date (Old - New)</option>
                            <option value="date_desc">Date (New - Old)</option>
                        </select>
                    </div>

                    {/* Filter By Dropdown */}
                    <div className="w-full sm:w-1/3 sm:ml-2">
                        <select
                            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>
                                Filter By
                            </option>
                            <option value="category_1">Category 1</option>
                            <option value="category_2">Category 2</option>
                            <option value="category_3">Category 3</option>
                        </select>
                    </div>
                </div>
                <div className="h-72 overflow-y-scroll">
                    <table className="table-auto w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-500">
                                <th className="text-left px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></th>
                                <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Room No</span></th>
                                <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Floor No</span></th>
                                <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Block</span></th>
                                <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Available Seats</span></th>
                                <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Default Seats</span></th>
                                <th className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {row.map(item => <Row room={item.room} floor={item.floor} block={item.block}
                                available={item.available} default={item.default} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="px-8 py-4 mt-4">
                <div className="flex flex-row justify-between">
                    <div>
                        <p>Total Seats Available: 2000</p>
                    </div>
                    <div className="flex flex-row gap-20">
                        <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold h-10 w-[10rem] rounded-[20px]" type="submit">RESET DEFAULT</button>
                        <button className="bg-green-500 hover:bg-green-400 text-white font-bold h-10 w-[10rem] rounded-[20px]" type="submit">SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
