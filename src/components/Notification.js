import React from "react";

const Notification = ({ message, error }) => {
    const successNotification = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        background: 'lightgrey'
      }

      const errorNotification = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        background: 'lightgrey'
      }

    if (message === null) {
        return null
    }

    return (
        <div style={error ? errorNotification : successNotification}>
            {message}
        </div>
    ) 
}

export default Notification