import React from 'react'

export default function ManageRoom() {
    return (
        <div className="bg-background flex flex-col flex-grow">
            <div class="p-8">
                <h2 class="text-2xl font-bold mb-8">ADD ROOM</h2>
                <form class="flex flex-col md:flex-row">
                    <div class="flex flex-col mb-4 md:mr-4">
                        <label for="room-no" class="text-gray-700 font-bold mb-2 pl-2">Room No</label>
                        <input id="room-no" type="text" class="w-5/6 h-12 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder="Room No" required />
                    </div>
                    <div class="flex flex-col mb-4 md:mr-4">
                        <label for="floor-no" class="text-gray-700 font-bold mb-2 pl-2">Floor No</label>
                        <input id="floor-no" type="number" class="w-5/6 h-12 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder="Floor No" required />
                    </div>
                    <div class="flex flex-col mb-4 md:mr-4">
                        <label for="block" class="text-gray-700 font-bold mb-2 pl-2">Block</label>
                        <input id="block" type="text" class="w-5/6 h-12 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder="Block" required />
                    </div>
                    <div class="flex flex-col mb-4 md:mr-4">
                        <label for="total-seats" class="text-gray-700 font-bold mb-2 pl-2">Total Seats</label>
                        <input id="total-seats" type="number" class="w-5/6 h-12 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder="Total Seats" required />
                    </div>
                    <div class="flex flex-col mb-4 md:mr-4">
                        <label for="default-seats" class="text-gray-700 font-bold mb-2 pl-2">Default Seats</label>
                        <input id="default-seats" type="number" class="w-5/6 h-12 px-3 py-2 rounded-[20px] shadow-sm border-gray-300" placeholder="Default Seats" required />
                    </div>
                    <button class="bg-blue-500 text-white font-bold py-1 px-2 my-7 mx-2 h-12 w-[5rem] rounded-[20px]" type="submit">ADD</button>
                </form>
            </div>

        </div>
    )
}
