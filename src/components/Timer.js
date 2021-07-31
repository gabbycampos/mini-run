import React from 'react';
import TimerSetUp from './TimerSetUp';

class Timer extends React.Component {
    constructor() {
        super();

        this.state = {
            walkTimer: 1,
            runTimer: 2,
            cycleNumber: 3,
            timerCount: 2 * 60,
            cycleType: 'RUN',
            runActive: false,
            coordinates: [],

            distance: '',
            currentSpeed: '',
            duration: '',
        }
        // loop timer until cycle ends
        this.loop = undefined;
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    // componentDidMount() {
    //     // react will fire when component mounts
    //     // can have it here so it watches geolocation all the time
    //     navigator.geolocation.watchPosition(
    //         data => {
    //             this.setState({
    //                 ...this.state,
    //                 currentGeolocation: data.coords
    //                 // store current in a variable 

    //             })
    //             // push coordinates to coordinates array in state
    //             // console.log(data);
    //             // console.log(data.coords.latitude)
    //         }, error => console.log(error)
    //     )
    // }

    // // then send  whatever data I need to db when run ends

    // hook to handle isActive state
    handleStart = () => {
        const { isActive } = this.state;

        if (isActive) {
            clearInterval(this.loop);

            this.setState({
                isActive: false
            });
        } else {
            this.setState({
                isActive: true
            });

            this.loop = setInterval(() => {
                const { timerCount, cycleType, walkTimer, runTimer } = this.state;

                if (timerCount === 0) {
                    this.setState({
                        cycleType: (cycleType === 'RUN') ? 'WALK' : 'RUN',
                        timerCount: (cycleType === 'RUN') ? (walkTimer * 60) : (runTimer * 60)
                    });
                } else {
                    this.setState({
                        timerCount: timerCount - 1,
                    });
                }

            }, 1000);
        }
    }

    // stop and reset timer
    handleStop = () => {
        this.setState({
            walkTimer: 1,
            runTimer: 2,
            cycleNumber: 3,
            timerCount: 2 * 60,
            cycleType: 'RUN',
            runActive: false
        });

        clearInterval(this.loop);
    }

    // handle time conversion
    convertToTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;

        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return `${minutes}:${seconds}`;
    }

    handleWalkDecrease = () => {
        const { walkTimer, isActive, cycleType } = this.state;
        if (walkTimer > 1) {
            if (!isActive && cycleType === 'WALK') {
                this.setState({
                    walkTimer: walkTimer - 1,
                    timerCount: (walkTimer - 1) * 60
                })
            } else {
                this.setState({
                    walkTimer: walkTimer - 1
                });
            }
        }
    }
    handleWalkIncrease = () => {
        const { walkTimer, isActive, cycleType } = this.state;
        if (!isActive && cycleType === 'WALK') {
            this.setState({
                walkTimer: walkTimer + 1,
                timerCount: (walkTimer + 1) * 60
            })
        } else {
            this.setState({
                walkTimer: walkTimer + 1
            });
        }
    }
    handleRunDecrease = () => {
        const { runTimer, isActive, cycleType } = this.state;
        if (runTimer > 1) {
            if (!isActive && cycleType === 'RUN') {
                this.setState({
                    runTimer: runTimer - 1,
                    timerCount: (runTimer - 1) * 60
                })
            } else {
                this.setState({
                    runTimer: runTimer - 1
                });
            }
        }
    }
    handleRunIncrease = () => {
        const { runTimer, isActive, cycleType } = this.state;
        if (!isActive && cycleType === 'RUN') {
            this.setState({
                runTimer: runTimer + 1,
                timerCount: (runTimer + 1) * 60
            })
        } else {
            this.setState({
                runTimer: runTimer + 1
            });
        }
    }
    handleCycleDecrease = () => {
        const { cycleNumber, isActive } = this.state;
        if (cycleNumber > 1) {
            if (!isActive) {
                this.setState({
                    cycleNumber: cycleNumber - 1,
                })
            } else {
                this.setState({
                    cycleNumber: cycleNumber - 1
                });
            }
        }
    }
    handleCycleIncrease = () => {
        const { cycleNumber, isActive } = this.state;
        if (!isActive) {
            this.setState({
                cycleNumber: cycleNumber + 1,
            })
        } else {
            this.setState({
                cycleNumber: cycleNumber + 1
            });
        }
    }

    render() {
        const cycleProps = {
            title: 'Cycle Number',
            count: this.state.cycleNumber,
            handleDecrease: this.handleCycleDecrease,
            handleIncrease: this.handleCycleIncrease
        }
        const walkProps = {
            title: 'Walk Minutes',
            count: this.state.walkTimer,
            handleDecrease: this.handleWalkDecrease,
            handleIncrease: this.handleWalkIncrease
        }
        const runProps = {
            title: 'Run Minutes',
            count: this.state.runTimer,
            handleDecrease: this.handleRunDecrease,
            handleIncrease: this.handleRunIncrease
        }

        return (
            <div>
                <div>
                    <h2>{this.state.cycleType}</h2>
                    <span>{this.convertToTime(this.state.timerCount)}</span>
                    <button onClick={this.handleStart}>{`${this.state.isActive ? 'Pause' : 'Start'}`}</button>
                    <button onClick={this.handleStop}>Stop</button>
                </div>
                <div>
                    <TimerSetUp {...cycleProps} />
                    <TimerSetUp {...walkProps} />
                    <TimerSetUp {...runProps} />
                </div>
            </div>
        )
    }
}

export default Timer;