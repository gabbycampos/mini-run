import React from 'react';

class TimerActive extends React.Component {
    constructor() {
        super();

        this.state = {
            isActive: true,
            seconds: 0,
            intervalId: 0,
            coordinates: []
        }
        this.startTimer = this.startTimer.bind(this);
        this.decreaseTimer = this.decreaseTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.getWatchLocation = this.getWatchLocation.bind(this);
    }

    startTimer() {
        let intervalId = setInterval(this.decreaseTimer, 1000);
        this.setState({
            intervalId: intervalId
        })
        // call watchLocation function
    }
    decreaseTimer() {
        switch (this.state.seconds) {
            case 0:
                if (this.props.minutes === 0) {
                    if (this.state.isActive) {
                        this.setState({
                            ...this.state,
                            isActive: false
                        });
                        this.props.toggleInterval(this.state.isActive);
                    } else {
                        this.setState({
                            ...this.state,
                            isActive: true
                        });
                        this.props.toggleInterval(this.state.isActive);
                    }
                }
                this.props.updateTimerMinute()
                this.setState({
                    ...this.state,
                    seconds: 59
                })
                break;
            default:
                this.setState((prev) => {
                    return {
                        seconds: prev.seconds - 1
                    }
                })
                break;
        }
    }
    stopTimer() {
        clearInterval(this.state.intervalId);
        this.props.stopTimer()
        this.setState({
            seconds: 0
        })
    }
    pauseTimer() {
        clearInterval(this.state.intervalId);
    }

    // geolocation connection
    getWatchLocation() {
        navigator.geolocation.watchPosition(
            data => {
                // push coordinates to coordinates array in state
                console.log(data);
                console.log(data.coords.latitude)
            }, error => console.log(error)
        )
    }


    render() {
        return (
            <div>
                <h2>Show active timer and run active data</h2>
                <div>
                    <p>{this.state.isActive === true ? "Run!" : "Walk!"}</p>
                    <span>{this.props.minutes}</span>
                    <span>:</span>
                    <span>{this.state.seconds === 0 ? "00" :
                        this.state.seconds < 10 ? "0" :
                            this.state.seconds}</span>
                </div>
                <div>
                    <button onClick={this.startTimer}>Start</button>
                    {/* <button onClick={() => {this.startTimer} {this.getWatchLocation}}>Start</button> */}
                    <button onClick={this.pauseTimer}>Pause</button>
                    <button onClick={this.stopTimer}>Stop</button>
                </div>
                {/* <p>{props.cycleType}</p>
                <p>{props.distance}</p>
                <p>{props.currentSpeed}</p>
                <p>{props.duration}</p>
                <p>{props.locations}</p> */}
            </div>
        )
    }
}

export default TimerActive;