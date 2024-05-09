import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
import { useCheckAllUsersPaid } from '@/utils/queryHooks';

const CountdownTime = ({ endTime, format, styles, setBidStarted }) => {
    const endTimeMoment = moment(endTime, "HH:mm:ss");

    const [remainingTime, setRemainingTime] = useState(moment.duration(endTimeMoment.diff(moment())));


    useEffect(() => {
        const timer = setInterval(() => {
            const now = moment();
            const remaining = moment.duration(endTimeMoment.diff(now));
            if (remaining.asSeconds() <= 0) {
                clearInterval(timer);
                setBidStarted(true);
            } else {
                setRemainingTime(remaining);
            }
        }, 1000);

        return () => {
            // add timer to cookie
            Cookies.set("endTime", endTime);
            clearInterval(timer);
        };
    }, [endTime, setBidStarted]);

    const formattedTime = moment.utc(remainingTime.asMilliseconds()).format(format);

    return (
        <span>{formattedTime}</span>
    );
};

export default CountdownTime;
