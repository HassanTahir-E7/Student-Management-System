import React from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";

const Card = (props) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/students');
    };

    return (
        <div className="stCard" onClick={handleClick} style={{cursor: 'pointer'}}>
            <p style={{color:"black"}}>Name: {props.name}</p>
            <p style={{color:"black"}}>Roll No: {props.rollNo}</p>
            <p style={{color:"black"}}>Course: {props.course}</p>
            <p style={{color:"black"}}>Department: {props.dept}</p>
        </div>
    )
};

export default Card;