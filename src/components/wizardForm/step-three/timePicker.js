// import React from 'react';
// import TimePicker from 'react-times';
// import 'react-times/css/material/default.css';

// export default class SomeComponent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       focused: false
//     }
//   }
//   onTimeChange(options) {
//     // do something
//   }
 
//   onFocusChange(focusStatue) {
//     // do something
//     console.log(focusStatue)
//   }
//   handleFocusedChange = () => {
//     this.setState({
//       focused: true,
//     })
//   }
//    render() {
//     return (
//       <TimePicker
//       defaultTime="13:20" 
//       withoutIcon={true}
//       timeMode='12'
//       showTimezone={true}
//         onFocusChange={this.onFocusChange.bind(this)}
//         onTimeChange={this.onTimeChange.bind(this)}
//         focused={this.state.focused}
//         trigger={(
//           <div
//             onClick={this.handleFocusedChange} >
//             <input class="inputTime start" value="10:00 am" type="text" readOnly/>
//           </div>
//         )}
//       />
//     )
//   }
// }

import React from 'react';
import TimeKeeper from 'react-timekeeper';

export  function YourComponent(){
    const [time, setTime] = useState('12:34pm')
    const [showTime, setShowTime] = useState(true)

    return (
        <div>
            {showTime &&
                <Timekeeper
                    time={time}
                    onChange={(newTime) => setTime(newTime.formatted12)}
                    onDoneClick={() => setShowTime(false)}
                    switchToMinuteOnHourSelect
                />
            }
            <span>Time is {time}</span>
            {!showTime &&
                <button onClick={() => setShowTime(true)}>Show</button>
            }
        </div>
    )

}