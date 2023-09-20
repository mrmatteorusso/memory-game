import React from "react"

// when the choice is maden there is a refresh
//or until the choice is not made there is no game
//or when the choice is made the choice is greyed out in the next game unless you refresh 
export default function ChooseApi({ handleChange }) {
    return (
        <div className="chooseAPI" >
            <select defaultValue={"standard"} onChange={(e) => handleChange(e.target.value)}>
                <option value={"standard"}>Dogs or Cats?</option>
                <option value="dog">dogs</option>
                <option value="cat">cats</option>
            </select>
        </div>
    )
}