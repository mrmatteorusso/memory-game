import React from "react"


export default function EnterNumberOfCards(props) {
    return (
        <div>
            <label htmlFor="number">Enter how many pairs =&#62;</label>
            <input type="number" id="number" onChange={props.handleChange} />
        </div>
    )
}