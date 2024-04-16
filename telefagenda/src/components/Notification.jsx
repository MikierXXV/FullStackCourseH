const Notification = ({ message, iserror }) => {
    if (message === null) {
        return null
    }

    return (
        <>{
            iserror ? 
                <div className="error">
                {message}
                </div>
            :
            <div className="message">
                {message}
                </div>
        }
        </>
    )
}

export default Notification