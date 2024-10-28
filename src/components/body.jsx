/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Attendance from './attendance';



const body = () => {
    const [courses, setcourses] = useState([])
    const [course, setcourse] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [index,setIndex]=useState(null)
    const [oldCourse,setOldCourse]=useState(null)
    const handleCourse = (event) => {
        setcourse(event.target.value)
        // console.log(course)
    }
    useEffect(() => {
        const savedCourses = localStorage.getItem("courses")
        if (savedCourses) {
            setcourses(JSON.parse(savedCourses))
        }
    }, [])
    const handleAdd = () => {
        if (course.length > 0) {
                setcourses((prevcourses) => {
                    const updatedcourses = [...prevcourses, course];
                    // this mode ensures synchoronus updation of courses rather than by default asynchoronous mode
                    localStorage.setItem("courses", JSON.stringify(updatedcourses))
                    return updatedcourses

                })
            setcourse("")
        }
    }
    const handleEdit = (index) => {
        setIsEditing(true);
       
        // console.log(details)
        setOldCourse(courses[index]);
        setcourse(courses[index]);
        setIndex(index);

    }
    const handleDelete = (cours) => {
        // setcourses(courses.filter((course)=> {return course!=cours} ))
        setcourses((prevcourses) => {
            const updatedcourses = prevcourses.filter(course => { return course != cours })
            localStorage.setItem("courses", JSON.stringify(updatedcourses))
            return updatedcourses
        })
    }
    const handleUpdate=()=>{
        setcourses((courses)=>{
            courses[index]=course;
            localStorage.setItem("courses", JSON.stringify(courses))
            return courses;

        })
        
        var details=localStorage.getItem(oldCourse)
        details=JSON.parse(details);
        console.log(details)
        localStorage.setItem(course, JSON.stringify(details));
        const det=localStorage.getItem(course);
        console.log(det)
        setIsEditing(false);
        setcourse('')
        localStorage.removeItem(oldCourse);
        setOldCourse(null);
    }
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element=<>
                        <div className="body">
                            <div className="user p-2">
                                <h3 className="text-3xl">Welcome User</h3>
                            </div>
                            <div className="courses w-full flex  flex-col align-middle ">
                                <div className=' p-2'>
                                    <h2 className=" my-2 text-xl ">My Courses</h2>
                                    <input type="text" className='p-2 border-2 border-black min-w-[50vw] rounded-md me-2' value={course} onChange={handleCourse} />
                                    <button className="mx-2 p-2 border-2 bg-blue-500 border-none rounded-md" onClick={handleAdd} disabled={course.length == 0 || isEditing} >Add Course</button>
                                    <button className="mx-2 p-2 border-2 bg-blue-500 border-none rounded-md" onClick={handleUpdate} disabled={course.length == 0 || !isEditing}>Update Course</button>
                                </div>

                                {
                                    courses.map((course, index) => {
                                        return (
                                            // <Link key={index} to={`attendance/${course}`}>
                                                <div key={index} className='w-[98vw]  h-12 border-2 border-black flex  justify-between p-2 items-center mx-auto my-1'>
                                                    <Link to={`attendance/${course}`}><span>{course}</span></Link>
                                                    <button onClick={()=>handleEdit(index)}>Edit Course</button>
                                                    <button onClick={() => handleDelete(course)}>Delete Course</button>
                                                </div>
                                            // </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </> />
                </Routes>

                <Routes>
                    <Route path="/attendance/:course"  element=<><Attendance/></> />
                </Routes>
            </Router >
        </>

    )
}

export default body
