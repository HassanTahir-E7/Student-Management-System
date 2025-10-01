import React from "react";
import "./components.css";

const Card = (props) => {
    return (
        <div className="stCard">
            <p>Name: {props.name}</p>
            <p>Roll No: {props.rollNo}</p>
            <p>Course: {props.course}</p>
            <p>Department: {props.dept}</p>
        </div>
    )
};

export default Card;