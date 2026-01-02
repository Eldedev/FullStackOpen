const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    else if (message.includes("wrong") || message.includes("required")) {
        return (
            <div className="error">{message}</div>
        )
    }
    else return (
            <div className="notification">{message}</div>
        )
}

export default Notification