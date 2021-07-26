import React from 'react';
//import { Duration } from 'luxon';

function TimerSetUp(props) {
    function decreaseCounter() {
        if (props.walkTimer === 1) {
            return;
        }
        props.decreaseWalk();
    }
    function increaseCounter() {
        if (props.walkTimer === 60) {
            return;
        }
        props.increaseWalk();
    }
    function decreaseRun() {
        if (props.runTimer === 1) {
            return;
        }
        props.decreaseRun();
    }
    function increaseRun() {
        if (props.runTimer === 60) {
            return;
        }
        props.increaseRun();
    }
    return (
        <div>
            <h2>Timer Set Up</h2>
            <div>
                <span>{props.cycleNumber}</span>
                <br />
                <span><button onClick={decreaseCounter}> - </button></span>
                <span><button onClick={increaseCounter}> + </button></span>
            </div>
            <br />
            <div>
                <span>{props.walkTimer}</span>
                <br />
                <span><button onClick={decreaseCounter}> - </button></span>
                <span><button onClick={increaseCounter}> + </button></span>
            </div>
            <br />
            <div>
                <span>{props.runTimer}</span>
                <br />
                <span><button onClick={decreaseRun}> - </button></span>
                <span><button onClick={increaseRun}> + </button></span>
            </div>
        </div>
    )
}

export default TimerSetUp;

// return (
//     <div>
//         <h1>Timer set up</h1>
//         {/* <p>{props.cycleNumber}</p>
//         <p>{props.runTimer}</p>
//         <p>{props.walkTimer}</p> */}
//     </div>
// )