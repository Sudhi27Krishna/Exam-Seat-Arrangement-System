import React from 'react';
import uerow from '../uerow';
import UeRow from './UeRow';
import SeatBox from './SeatBox';
import rooms from '../rooms';

export default function SeatAllocation() {
  return (
    <div className="bg-background flex flex-col flex-grow">
      <div className="bg-background flex flex-row flex-grow">
        <div className="px-8 pt-4 flex flex-col gap-y-4 flex-wrap w-1/2">
          <div className="flex flex-row mt-6">
            <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT DATE</span></h2>
            <select className="rounded-[20px] w-36 focus:outline-none focus:ring-2 ml-5 focus:ring-green-login sm:ma" defaultValue="">
              <option value="" disabled hidden></option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
              <option value="09-09-2020">09-09-2020</option>
            </select>
          </div>

          <div className="flex flex-row mt-6">
            <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT TIME</span></h2>
            <select className="rounded-[20px] w-36 focus:outline-none focus:ring-2 ml-6 focus:ring-green-login sm:ma" defaultValue="">
              <option value="" disabled hidden></option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
              <option value="15:00:00">15:00:00</option>
            </select>
          </div>

          <div className="py-4 flex-grow">
            <h2 className="text-xl font-Outfit-Bold mb-4">SELECT EXAM HALLS</h2>
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-md">
              {/* Search Bar */}
              <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0 sm:mr-10 lg:mr-3 font-Outfit-Regular">
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
                  className="ml-2 flex-1 w-1/2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="w-full sm:w-1/3 sm:mx-2 mb-2 sm:mb-0 font-Outfit-Regular">
                <select className="min-h-[40px] w-5/6 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login"
                  defaultValue="">
                  <option value="" disabled hidden>Sort By</option>
                  <option value="name_asc">Name (A - Z)</option>
                  <option value="name_desc">Name (Z - A)</option>
                  <option value="date_asc">Date (Old - New)</option>
                  <option value="date_desc">Date (New - Old)</option>
                </select>
              </div>

              {/* Filter By Dropdown */}
              <div className="w-full sm:w-1/3 sm:ml-2">
                <select className="min-h-[40px] w-5/6 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login font-Outfit-Regular" defaultValue="">
                  <option value="" disabled hidden>Filter By</option>
                  <option value="category_1">Category 1</option>
                  <option value="category_2">Category 2</option>
                  <option value="category_3">Category 3</option>
                </select>
              </div>
            </div>
            <div className="h-80 overflow-y-scroll">
              <table className="table-auto w-full">
                <thead className="sticky top-0">
                  <tr className="bg-grey-all font-Outfit-Bold">
                    <th className="text-left px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></th>
                    <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Date</span></th>
                    <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Branch</span></th>
                    <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Slot</span></th>
                    <th className="text-left px-4 py-2"><span className="whitespace-nowrap">Subject</span></th>
                    <th className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"></th>
                  </tr>
                </thead>
                <tbody>
                  {uerow.map(item => <UeRow key={item.id} date={item.date} branch={item.branch} slot={item.slot}
                    subject={item.subject} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-8 pt-4 flex flex-col flex-wrap gap-y-4 w-1/2">
          <div className="flex flex-row my-6">
            <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT EXAM</span></h2>
            <select className="rounded-[20px] w-36 focus:outline-none focus:ring-2 ml-5 focus:ring-green-login sm:ma" defaultValue="">
              <option value="" disabled hidden></option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
              <option value="FLAT">FLAT</option>
            </select>
          </div>

          <div className="py-4 flex-grow">
            <h2 className="text-xl font-Outfit-Bold mb-4">SELECTED EXAM HALLS</h2>
            <div className="flex flex-row justify-between my-4">
              <p className="font-Outfit-Regular">Total Selected: 2000</p>
              <p className="font-Outfit-Regular">Total Participants: 2000</p>
            </div>
            <div className="bg-gray-100 h-80 overflow-y-scroll border rounded-2xl p-4">
              {rooms.map(item => <SeatBox key={item.id} room={item.room} capacity={item.capacity} />)}
            </div>
          </div>
        </div>


      </div>
      <div className="px-8 py-4 my-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="font-Outfit-Regular">Total Seats Available: 2000</p>
          </div>
          <div className="flex flex-row gap-20">
            <button className="bg-gray-500 hover:bg-gray-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="submit">RESET DEFAULT</button>
            <button className="bg-green-500 hover:bg-green-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="submit">SAVE</button>
          </div>
        </div>
      </div>
    </div>
  )
}
