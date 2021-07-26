import React from 'react';
import TimerActive from './TimerActive';
import TimerSetUp from './TimerSetUp';

class Timer extends React.Component {
    constructor() {
        super();

        this.state = {
            distance: 10,
            currentSpeed: 5,
            duration: 20,
            locations: ['data point', 'data point'],
            cycleType: 'Run',
            // same as runTimer
            minutes: 2,

            cycleNumber: 3,
            walkTimer: 1,
            runTimer: 2
        }
        this.onIncreaseWalk = this.onIncreaseWalk.bind(this);
        this.onDecreaseWalk = this.onDecreaseWalk.bind(this);
        this.onIncreaseRun = this.onIncreaseRun.bind(this);
        this.onDecreaseRun = this.onDecreaseRun.bind(this);
        this.onToggleInterval = this.onToggleInterval.bind(this);
        this.onUpdateTimerMinute = this.onUpdateTimerMinute.bind(this);
        this.onStopTimer = this.onStopTimer.bind(this);
    }
    
    onIncreaseWalk() {
        this.setState(prev => {
            return {
                walkTimer: prev.walkTimer + 1
            }
        })
    }
    onDecreaseWalk() {
        this.setState(prev => {
            return {
                walkTimer: prev.walkTimer - 1
            }
        })
    }
    onIncreaseRun() {
        this.setState(prev => {
            return {
                runTimer: prev.runTimer + 1,
                minutes: prev.runTimer + 1
            }
        })
    }
    onDecreaseRun() {
        this.setState(prev => {
            return {
                runTimer: prev.runTimer - 1,
                minutes: prev.runTimer - 1
            }
        })
    }

    onUpdateTimerMinute() {
        this.setState((prev) => {
            return {
                minutes: prev.minutes - 1
            }
        })
    }
    onToggleInterval(isActive) {
        if (isActive) {
            this.setState({
                minutes: this.state.runTimer
            })
        } else {
            this.setState({
                minutes: this.state.walkTimer
            })
        }
    }
    onStopTimer() {
        this.setState({
            minutes: this.state.runTimer
        })
    }

    render() {
        return (
            <div>
                <div>
                    <TimerSetUp
                        cycleNumber={`Run Cycles: ${this.state.cycleNumber}`}

                        runTimer={`Run Time: ${this.state.runTimer}`}
                        increaseRun={this.onIncreaseRun}
                        decreaseRun={this.onDecreaseRun}

                        walkTimer={`Walk Time: ${this.state.walkTimer}`}
                        increaseWalk={this.onIncreaseWalk}
                        decreaseWalk={this.onDecreaseWalk}
                    />
                </div>
                <div>
                    <TimerActive
                        minutes={`Minutes: ${this.state.minutes}`} 
                        walkTimer={this.state.walkTimer}
                        updateTimerMinute={this.onUpdateTimerMinute}
                        toggleInterval={this.onToggleInterval}
                        stopTimer={this.onStopTimer}

                        cycleType={`Cycle: ${this.state.cycleType}`}
                        distance={`Distance: ${this.state.distance}`}
                        currentSpeed={`Speed: ${this.state.currentSpeed}`}
                        duration={`Duration: ${this.state.duration}`}
                        locations={`Locations: ${this.state.locations}`}
                    />
                </div>
            </div>
        )
    }
}

export default Timer;