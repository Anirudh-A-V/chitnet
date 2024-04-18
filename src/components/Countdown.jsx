import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Countdown = ({ duration, format, styles, setBidStarted }) => {
    const [remainingTime, setRemainingTime] = useState(moment.duration(duration));

    useEffect(() => {
        if (remainingTime.asSeconds() <= 0) {
            setBidStarted(true);
            return;
        }

        const interval = setInterval(() => {
            setRemainingTime(prevTime => {
                const newTime = moment.duration(prevTime);
                newTime.subtract(1, 'second');
                return newTime;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        }

    }, [remainingTime]);

    const formattedTime = moment.utc(remainingTime.asMilliseconds()).format(format);

    return (
        <span >{formattedTime}</span>
    );
};

export default Countdown;
