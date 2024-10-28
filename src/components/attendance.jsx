/* eslint-disable react-hooks/rules-of-hooks */
// import React, { useRef } from 'react'
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar"
import '../index.css'
import '../calendar.css';
import { useParams } from "react-router-dom";
const attendance = () => {

  const [register, setRegister] = useState({})
  
  const paramId=useParams();
  const [key, setKey] = useState(paramId.course)
  const totalDays = useRef(0)
  const presentDays = useRef(0)
  const absentDays = useRef(0)
  const precentage=useRef(0)
  
  useEffect(() => {
    
    console.log(key);
    const storedRegister = localStorage.getItem(key)
    if (storedRegister) {
      const obj = JSON.parse(storedRegister)
      setRegister(obj.register)
      totalDays.current=obj.totalDays
      presentDays.current=obj.presentDays
      absentDays.current=obj.absentDays
      precentage.current = (presentDays.current / totalDays.current) * 100;
    }

  }, [])
  // console.log(paramId)
  const toggleAttendance=(date)=>{
    console.log(date,typeof(date))
    const Date=date.toDateString();
    console.log(Date)

    const attendance=register[Date]
    
    if(attendance=='Present'){
      presentDays.current--;
      absentDays.current++;
    }else if(attendance=='Absent'){
      absentDays.current--;
      // presentDays.current++;
      totalDays.current--;
    }else{
      presentDays.current++;
      totalDays.current++;
    }  
    precentage.current=(presentDays.current/totalDays.current)*100;

    setRegister((prevRegister)=>{
      const newRegister = { ...prevRegister, [Date]: attendance === 'Present' ? 'Absent' : attendance === 'Absent' ? '' : 'Present'  } // Dynamically setting key using square bracket
        console.log(newRegister)
        const obj={register:newRegister ,totalDays:totalDays.current ,presentDays:presentDays.current,absentDays:absentDays.current}
        localStorage.setItem([key],JSON.stringify(obj))
        return newRegister 
    })  
  }
  const updateClassName=({date,view})=>{
    if(view ==='month'){
      const Date = date.toDateString()
      const attendance = register[Date]
      return attendance ? attendance :''
    }
  }
  return (
    <div>
      <Calendar className="" onClickDay={toggleAttendance}    tileClassName={updateClassName}/>
      <div className="details m-5">

        <h1 className="text-xl my-2">Attendance Details:</h1>
        <h2>Total Working Days : {totalDays.current}</h2>
        <h2>Days Present :{presentDays.current}</h2>
        <h2>Days Absent : {absentDays.current}</h2>
        <h2>Percentage : {precentage.current}%</h2>
      </div>
    </div>
  )
}

export default attendance

