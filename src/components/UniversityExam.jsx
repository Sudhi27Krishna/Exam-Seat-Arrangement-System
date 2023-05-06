import DropDownInput from './DropDownInput';
import { useState, useRef } from 'react';
import Input from './Input';
import uerow from '../uerow';
import UeRow from './UeRow';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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

    const handleExams = (e) => {
        e.preventDefault()
        const newExam = { date: dateRef.current.value, time: timeRef.current.value, sem: Number(semRef.current.options[semRef.current.selectedIndex].value), branch: branchRef.current.value, slot: slotRef.current.value, subject: subRef.current.value };
        const allExams = [...exams, newExam];
        setExams(allExams);
        console.log(allExams);
        formRef.current.reset();
        dateRef.current.focus();
    }

    const handleSlot = (inputRef) => {
        console.log(inputRef.value);
        let isMounted = true;
        const controller = new AbortController();

        const subInfo = { sem: Number(semRef.current.options[semRef.current.selectedIndex].value), branch: branchRef.current.value, slot: inputRef.value }

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

    return (
        <div className="bg-background flex flex-col flex-grow">
            <div className="px-8 pt-4 flex flex-row justify-between flex-wrap">
                <div className="flex flex-row mt-6 items-center">
                    <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">SELECT SEMESTER</span></h2>
                    <select ref={semRef} className="h-10 px-3 py-2 ml-5 rounded-[20px] shadow-sm border-gray-300 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-login">
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

                <div className="flex flex-row justify-center items-baseline mt-6">
                    <h2 className="text-xl font-Outfit-Bold"><span className="whitespace-nowrap">EXAMINEE DETAILS</span></h2>
                    <input type="file" className="font-Outfit-Regular ml-5" />
                </div>
            </div>

            <div className="px-8 pt-6">
                <h2 className="text-xl font-Outfit-Bold mb-8">ADD SLOTS</h2>
                <form ref={formRef} className="flex flex-col st:flex-row justify-between" onSubmit={handleExams}>
                    <Input input_id="date" title="Date" inputRef={dateRef} type="date" placeholder="09-09-2020" />
                    <DropDownInput input_id="time" title="Time" inputRef={timeRef} options={['FN', 'AN']} />
                    <DropDownInput input_id="branch" title="Branches" inputRef={branchRef} options={['CS', 'CC', 'CE', 'EC', 'EE', 'CA', 'ME']} />
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
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Branch</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Slot</span></th>
                                <th className="text-center px-4 py-2"><span className="whitespace-nowrap">Subject</span></th>
                                <th className="px-4 py-2 rounded-tr-2xl rounded-br-2xl"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {uerow.map(item => <UeRow key={item.id} date={item.date} time={item.time} branch={item.branch} slot={item.slot}
                                subject={item.subject} />)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="px-8 py-4 mt-2">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className="font-Outfit-Regular">No of Exams scheduled : 7</p>
                    </div>
                    <div className="flex flex-row gap-10">
                        <button className="bg-gray-500 hover:bg-gray-400 text-white font-Outfit-Bold h-10 w-[10rem] rounded-[20px]" type="submit">CLEAR ALL</button>
                        <button className="bg-green-500 hover:bg-green-400 text-white font-bold h-10 w-[10rem] rounded-[20px] font-Outfit-Bold" type="submit">SAVE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
