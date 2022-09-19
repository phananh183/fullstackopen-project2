import React from "react";

const NameList = ({ persons, deleteNum }) => {
    return (
      <>
        {persons.length === 0 
        ? 'No names available' 
        : persons.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={deleteNum}>delete</button>
          </div>
        )}
      </>
    )
  }

  export default NameList