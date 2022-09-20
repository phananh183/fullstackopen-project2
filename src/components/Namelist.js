import React from "react";
import Entry from "./Entry";

const NameList = ({ persons, deleteNum }) => {
    return (
      <>
        {persons.length === 0 
        ? 'No names available' 
        : persons.map(person =>
          <Entry key={person.id} person={person} deleteNum={deleteNum} />
        )}
      </>
    )
  }

  export default NameList