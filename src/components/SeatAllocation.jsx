// import AllocRow from './AllocRow';
import { useState, useRef, useEffect } from 'react';
// import rooms from '../rooms';
// import row from '../row';
import SeatBox from './SeatBox';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const url = '/seat-allocation';

export default function SeatAllocation() {
  const axiosPrivate = useAxiosPrivate();
  const [exams, setExams] = useState([]);
  const [details, setDetails] = useState([]);
  const [dates, setDates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookedRooms, setBookedRooms] = useState([]);
  const dateRef = useRef();
  const timeRef = useRef();
  const examRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let totalCapacity = rooms.reduce((total, obj) => total + obj.capacity, 0);

  // Update the window width state when the window is resized
  window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  const isHalfWidth = (windowWidth <= 1384);

  const handleRooms = async () => {
    let isMounted = true;
    const controller = new AbortController();

    const date = dateRef.current.options[dateRef.current.selectedIndex].value;
    const time = timeRef.current.options[timeRef.current.selectedIndex].value;
    const payload = {
      date,
      time,
      rooms: rooms.reduce((acc, { room_no, capacity }) => {
        if (selectedRooms.includes(room_no)) {
          acc.push({ room_no, capacity });
        }
        return acc;
      }, []),
      details
    };

    try {
      const response = await axiosPrivate.post(url.concat("/allocation"), payload, {
        signal: controller.signal
      });
      isMounted && console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // console.log(details);
    // console.log(selectedRooms, selectedRooms.length);

    return () => {
      isMounted = false;
      controller.abort();
    }
  }

  const handleExams = () => {
    let isMounted = true;
    const controller = new AbortController();

    const date = dateRef.current.options[dateRef.current.selectedIndex].value;
    const time = timeRef.current.options[timeRef.current.selectedIndex].value;

    const examInfo = { date, time };

    const getExams = async () => {
      try {
        const response = await axiosPrivate.get(url.concat('/get-exams'), {
          params: examInfo,
          signal: controller.signal
        });
        const { exams, details } = response.data;
        if (isMounted) {
          setExams(exams);
          setDetails(details);
        }

        const bookedRoomsResponse = await axiosPrivate.get(url.concat('/get-booked-rooms'), {
          params: { date, time },
          signal: controller.signal
        });

        if (isMounted) {
          if (bookedRooms !== undefined) {
            setBookedRooms(bookedRoomsResponse.data);
            console.log(bookedRooms);
          }
          else {
            setBookedRooms([]);
          }
        }
      }
      catch (error) {
        console.log(error);
      }
    }

    getExams();

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
        const response = await axiosPrivate.get(url.concat('/get-rooms'), {
          signal: controller.signal
        });
        isMounted && setRooms(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getRooms();

    const getDates = async () => {
      try {
        const dateResponse = await axiosPrivate.get(url.concat("/dates"), {
          signal: controller.signal
        });
        isMounted && setDates(dateResponse.data);
        const init_date = dateResponse.data[0];

        const examsResponse = await axiosPrivate.get(url.concat('/get-exams'), {
          params: { date: init_date, time: "FN" },
          signal: controller.signal
        });
        const { exams, details } = examsResponse.data;
        if (isMounted) {
          setExams(exams);
          setDetails(details);
        }

        const bookedRoomsResponse = await axiosPrivate.get(url.concat('/get-booked-rooms'), {
          params: { date: init_date, time: "FN" },
          signal: controller.signal
        });

        if (isMounted) {
          if (bookedRooms !== undefined) {
            setBookedRooms(bookedRoomsResponse.data);
            // console.log(bookedRooms);
          }
          else {
            setBookedRooms([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    isMounted && getDates();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [axiosPrivate]);

  return (
    <div className="bg-background flex flex-col flex-grow md:w-3/4">
      <div className="bg-background px-8 pt-4 flex flex-col st:flex-row justify-between">
        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT DATE</span></h2>
          <select ref={dateRef} onChange={handleExams} className="h-10 px-3 py-2 ml-5 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            {dates.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT TIME</span></h2>
          <select ref={timeRef} defaultValue={"FN"} onChange={handleExams} className="h-10 px-3 py-2 ml-6 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            <option value="FN">FN</option>
            <option value="AN">AN</option>
          </select>
        </div>

        <div className="flex flex-row mt-6 items-center">
          <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT EXAM</span></h2>
          <select ref={examRef} className="h-10 px-3 py-2 ml-4 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
            {exams.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-background px-8 pt-4 mt-1 flex flex-col st:flex-row flex-grow justify-between">
        <div className="py-4 st:w-full">
          <h2 className="text-xl font-Outfit-Bold mb-4">SELECTED EXAM HALLS</h2>
          <div className="flex flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-t-2xl">
            <div className={`w-1/2 flex ${isHalfWidth ? "flex-col" : "flex-row"}`}>
              {/* Search Bar */}
              <div className="mr-4 flex flex-row items-center w-full">
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
                  id="search"
                  className="border p-2 ml-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login"
                  placeholder="Search..."
                />
              </div>

              {/* Filter By Dropdown */}
              <div className={`${isHalfWidth ? "mt-4" : ""} flex flex-row items-center`}>
                <label htmlFor="filter-by" className="mr-4"><span className="whitespace-nowrap font-Outfit-Regular">Filter By:</span></label>
                <select id="filter-by" className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-login ">
                  <option value="all">All</option>
                  <option value="featured">Featured</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>
            <div className={`flex ${isHalfWidth ? "flex-col" : "flex-row"} sm:w-1/2 sm:ml-2 w-1/2 justify-center items-center gap-x-4 mr-8 pl-4`}>
              <p className={`${isHalfWidth ? "mt-4 pl-8 self-start" : ""} font-Outfit-Regular`}><span className="whitespace-nowrap">Total Rooms : {rooms.length}</span></p>
              <p className={`${isHalfWidth ? "mt-4 pl-8 self-start" : ""} font-Outfit-Regular`}><span className="whitespace-nowrap">Available Seats : {bookedRooms.length > 0 ? 0 : totalCapacity}</span></p>
              <p className={`${isHalfWidth ? "mt-4 pl-8 self-start" : ""} font-Outfit-Regular text-green-500`}><span className="whitespace-nowrap">Rooms selected: {bookedRooms.length > 0 ? bookedRooms.length : selectedRooms.length}</span></p>
            </div>
          </div>
          <div className="bg-gray-100 h-[21.5rem] overflow-y-scroll rounded-b-2xl p-4">
            {rooms.map(item => <SeatBox key={item.room_no} room={item.room_no} capacity={item.capacity} setSelectedRooms={setSelectedRooms} bookedRooms={bookedRooms} />)}
          </div>
        </div>
      </div>

      <div className="px-8 py-4 my-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="font-Outfit-Regular">Total Participants : 2000 (1899 Regular + 111 Supplymentary)</p>
          </div>
          <div className="flex flex-row gap-10">
            <button className="bg-green-500 hover:bg-green-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="button" onClick={handleRooms}>SAVE</button>
            <button className="bg-green-medium hover:bg-green-light text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="button">PROCEED</button>
          </div>
        </div>
      </div>
    </div >
  );
}
