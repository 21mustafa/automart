import { useState, useEffect } from "react";

function OnlineHelp() {
    const [extendHelp, setExtendHelp] = useState(false);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setExtendHelp(true);
            clearTimeout(timeoutID);

            const closeTimeout = setTimeout(() => {
                setExtendHelp(false);
                clearTimeout(closeTimeout);
            }, 5000);
        }, 2000);

    }, []);

    return (
        <div className="online-help">
            <button className="online-help__button" style={extendHelp ? {"width": "25rem"} : {}}>
                <i className="fa-solid fa-message"></i>
                <div className="online-help__button-text">
                    Need help? Ask us!
                </div>
            </button>
        </div>
    );
}

export default OnlineHelp;
