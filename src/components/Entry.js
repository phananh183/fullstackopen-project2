import React from "react";

const Entry = ({ person, deleteNum }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => deleteNum(person)}>delete</button>
        </div>
    )
}

export default Entry