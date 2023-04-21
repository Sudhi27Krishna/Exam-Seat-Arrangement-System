import AllocRow from './AllocRow';
import React, { useState, useRef, useEffect } from 'react';
import rooms from '../rooms';
import row from '../row';
import SeatBox from './SeatBox';

export default function SeatAllocation() {
  const [schedules, setSchedules] = useState([]);
  const dateRef = useRef();
  const timeRef = useRef();
  const examRef = useRef();

  const handleSchedule = (e) => {
    e.preventDefault()
    const newSchedule = { date: dateRef.current.options[dateRef.current.selectedIndex].value, time: timeRef.current.options[timeRef.current.selectedIndex].value, exam: examRef.current.options[examRef.current.selectedIndex].value };
    const allSchedules = [...schedules, newSchedule];
    setSchedules(allSchedules);
    console.log(allSchedules);
  }

  useEffect(() => {
    dateRef.current.value = 'default';
    timeRef.current.value = 'default';
    examRef.current.value = 'default';
    dateRef.current.value = 'default';
  }, [schedules]);

  return (
    <div className="bg-background flex flex-col flex-grow md:w-3/4">
      <div className="bg-background px-8 pt-4 flex flex-col st:flex-row justify-between">
        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT DATE</span></h2>
          <select ref={dateRef} className="h-10 px-3 py-2 ml-5 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="09-09-2021">09-09-2021</option>
            <option value="09-09-2022">09-09-2022</option>
            <option value="09-09-2023">09-09-2023</option>
            <option value="09-09-2024">09-09-2024</option>
            <option value="09-09-2025">09-09-2025</option>
            <option value="09-09-2026">09-09-2026</option>
            <option value="09-09-2027">09-09-2027</option>
            <option value="09-09-2028">09-09-2028</option>
          </select>
        </div>

        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT TIME</span></h2>
          <select ref={timeRef} className="h-10 px-3 py-2 ml-6 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="15:00:00">15:00:00</option>
            <option value="16:00:00">16:00:00</option>
            <option value="17:00:00">17:00:00</option>
            <option value="18:00:00">18:00:00</option>
            <option value="19:00:00">19:00:00</option>
            <option value="20:00:00">20:00:00</option>
            <option value="21:00:00">21:00:00</option>
            <option value="22:00:00">22:00:00</option>
          </select>
        </div>

        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT EXAM</span></h2>
          <select ref={examRef} className="h-10 px-3 py-2 ml-4 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="FLAT">FLAT</option>
            <option value="OS">OS</option>
            <option value="SS">SS</option>
            <option value="CN">CN</option>
            <option value="CGIP">CGIP</option>
            <option value="DBMS">DBMS</option>
            <option value="OOP">OOP</option>
            <option value="DS">DS</option>
          </select>
        </div>
      </div>

      <div className="bg-background px-8 pt-4 mt-6 flex flex-col st:flex-row flex-grow justify-between">
        <div className="py-4 st:w-[48%]">
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
                  <th className="text-center px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><input type="checkbox" /></th>
                  <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Block</span></th>
                  <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Floor</span></th>
                  <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Room</span></th>
                  <th className="text-center px-4 py-2 rounded-tr-2xl rounded-br-2xl"><span className="whitespace-nowrap">Seats</span></th>
                  <th className="px-0 py-0 rounded-tr-2xl rounded-br-2xl"></th>
                </tr>
              </thead>
              <tbody>
                {row.map(item => <AllocRow key={item.id} room={item.room} floor={item.floor} block={item.block}
                  initial={item.available} />)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-4 st:w-[48%]">
          <h2 className="text-xl font-Outfit-Bold mb-4">SELECTED EXAM HALLS</h2>
          <div className="flex flex-row justify-between my-4">
            <p className="font-Outfit-Regular">Seats Selected: 2000</p>
            <p className="font-Outfit-Regular">Total Participants: 2000</p>
          </div>
          <div className="bg-gray-100 h-80 overflow-y-scroll border rounded-2xl p-4">
            {rooms.map(item => <SeatBox key={item.id} room={item.room} capacity={item.capacity} />)}
          </div>
        </div>
      </div>

      <div className="px-8 py-4 my-2">
        <div className="flex flex-row justify-end items-center">
          <div className="flex flex-row gap-10">
            <button className="bg-green-500 hover:bg-green-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="button" onClick={handleSchedule}>SAVE</button>
            <button className="bg-green-medium hover:bg-green-light text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="button">PROCEED</button>
          </div>
        </div>
      </div>
    </div>
  );
}
