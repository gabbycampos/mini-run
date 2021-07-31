import React from 'react';
//import { Duration } from 'luxon';

function TimerSetUp(props) {
    return (
        <div>
            <h4>{props.title}</h4>
            <div>
                <span><button onClick={props.handleDecrease}> - </button></span>
                <span>{props.count}</span>
                <span><button onClick={props.handleIncrease}> + </button></span>
            </div>
        </div>
    )
}

export default TimerSetUp;
