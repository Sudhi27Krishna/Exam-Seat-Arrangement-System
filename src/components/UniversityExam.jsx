import DropDownInput from './DropDownInput';
import { useState, useRef, useEffect } from 'react';
import Input from './Input';
// import uerow from '../uerow';
import UeRow from './UeRow';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const url = '/university-exam';

export default function UniversityExam() {
    const [exams, setExams] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const semRef = useRef();
    const formRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const branchRef = useRef();
    const slotRef = useRef();
    const subRef = useRef();
    const [subArray, setSubArray] = useState([]);
    const navigate = useNavigate();

    const handleSchedule = (e) => {
        e.preventDefault()
        const newExam = { date: dateRef.current.value, time: timeRef.current.value, sem: Number(semRef.current.options[semRef.current.selectedIndex].value), branch: branchRef.current.value, slot: slotRef.current.value, subcode: subRef.current.value };
        // const allExams = [...exams, newExam];
        // setExams(allExams);
        formRef.current.reset();
        dateRef.current.focus();

        let isMounted = true;
        const controller = new AbortController();

        const postSchedule = async () => {
            try {
                await axiosPrivate.post(url, newExam, {
                    signal: controller.signal
                });
                isMounted && setExams(prev => [...prev, newExam]);
                console.log(exams);
            } catch (error) {
                console.log(error);
            }
        }

        postSchedule();

        semRef.current.focus();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    const handleSlot = () => {
        let isMounted = true;
        const controller = new AbortController();

        const subInfo = { sem: Number(semRef.current.options[semRef.current.selectedIndex].value), branch: branchRef.current.value, slot: slotRef.current.value }

        console.log(subInfo);

        const getSubcode = async () => {
            try {
                const response = await axiosPrivate.get(url, {
                    params: subInfo,
                    signal: controller.signal
                });
                if (isMounted) {
                    console.log(response.data);
                    setSubArray(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getSubcode();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const subInfo = { sem: Number(semRef.current.options[semRef.current.selectedIndex].value), branch: branchRef.current.value, slot: slotRef.current.value }

        console.log(subInfo);

        const getSubcode = async () => {
            try {
                const response = await axiosPrivate.get(url, {
                    params: subInfo,
                    signal: controller.signal
                });
                if (isMounted) {
                    console.log(response.data);
                    setSubArray(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getSubcode();

        const getSchedule = async () => {
            try {
                const response = await axiosPrivate.get(url.concat("/schedule"), {
                    signal: controller.signal
                });
                isMounted && setExams(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        isMounted && getSchedule();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate])

    const handleDelete = (id) => {
        let isMounted = true;
        const controller = new AbortController();

        const deleteSchedule = async () => {
            try {
                await axiosPrivate.delete(url.concat(`/${id}`), {
                    signal: controller.signal
                });
                isMounted && setExams(prev => prev.filter(item => item._id !== id));
            } catch (error) {
                console.log(error);
            }
        }

        deleteSchedule();

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
        navigate('/seat-allocation')
    }

    return (
        <div className="bg-background flex flex-col flex-grow">
            <div className="px-8 pt-4 flex flex-row justify-between flex-wrap">
                <div className="flex flex-row mt-6 items-center">
                    <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT SEMESTER</span></h2>
                    <select ref={semRef} className="h-10 px-3 py-2 ml-5 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login" onChange={handleSlot}>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="4">Semester 4</option>
                        <option value="5">Semester 5</option>
                        <option value="6">Semester 6</option>
                        <option value="7">Semester 7</option>
                        <option value="8">Semester 8</option>
                    </select>
                </div>

                <div className="flex flex-row justify-center items-center mt-6">
                    <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">EXAMINEE DETAILS</span></h2>
                    <input type="file" className="font-Outfit-Regular ml-5" />
                </div>
            </div>

            <div className="px-8 pt-6">
                <h2 className="text-xl font-Outfit-Bold mb-8">ADD SLOTS</h2>
                <form ref={formRef} className="flex flex-col st:flex-row justify-between" onSubmit={handleSchedule}>
                    <Input input_id="date" title="Date" inputRef={dateRef} type="date" placeholder="09-09-2020" />
                    <DropDownInput input_id="time" title="Time" inputRef={timeRef} options={['FN', 'AN']} />
                    <DropDownInput input_id="branch" title="Branches" inputRef={branchRef} options={['CS', 'CC', 'CE', 'EC', 'EE', 'CA', 'ME']} isTarget handleSlot={handleSlot} />
                    <DropDownInput input_id="slot" title="Slot" inputRef={slotRef} options={['A', 'B', 'C', 'D', 'E', 'F', 'G']} isTarget handleSlot={handleSlot} />
                    <DropDownInput input_id="subject" title="Subject" inputRef={subRef} options={subArray} />
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-Outfit-Bold py-1 px-2 my-7 mx-2 h-10 w-[5rem] rounded-[20px]" type="submit">ADD</button>
                </form>
            </div>

            <div className="px-8 py-4">
                <h2 className="text-xl font-Outfit-Bold mb-4">EXAM SCHEDULES</h2>
                <div className="h-72 overflow-y-scroll">
                    <table className="table-auto w-full">
                        <thead className="sticky top-0">
                            <tr className="bg-grey-all font-Outfit-Bold">
                                <th className="text-center px-4 py-2 rounded-tl-2xl rounded-bl-2xl"><span className="whitespace-nowrap">Date</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Time</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Semester</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Branch</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Slot</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Subject</span></th>
                                <th className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map(item => <UeRow key={item._id} id={item._id} date={item.date} time={item.time} sem={item.sem} branch={item.branch} slot={item.slot} subject={item.subcode} handleDelete={handleDelete} />)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-8 py-4 mt-2">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className="font-Outfit-Regular">No of Exams scheduled : {exams.length}</p>
                    </div>
                    <div className="flex flex-row gap-10">
                        <button className="bg-gray-500 hover:bg-gray-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" onClick={handleClearall}>CLEAR ALL</button>
                        <button className="bg-green-500 hover:bg-green-400 text-white font-bold h-10 w-[10rem] rounded-[20px] font-Outfit-Bold" onClick={handleNext}>NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
