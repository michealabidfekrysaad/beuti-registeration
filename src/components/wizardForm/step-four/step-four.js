import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setWorkingHoures,
  getcategories
} from "./../../../services/redux/actions/index";
import Timekeeper from "react-timekeeper";

import { days, defaultWorkingHoures } from "./../../../constants/constants";
import "./step-four.scss";

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingHoures: [...defaultWorkingHoures],
      workingDays: [...days],
      selectedDays: [],
      timeRangeError: false
    };
  }

  componentDidMount() {
    this.closePicker();
    this.props.getcategories(this.props.centerTypes);
    this.props.setWorkingHoures(this.state.workingHoures);
  }

  activeDay = index => {
    let workingHoures = [...this.state.workingHoures];
    // let selectedDays =  this.state.selectedDays;
    const found = workingHoures.some((el, i) => el.day === index);
    if (found) {
      workingHoures[index].isActive = !workingHoures[index].isActive;
    }
    this.setState(
      {
        workingHoures: workingHoures
      },
      () => {
        this.props.setWorkingHoures(this.state.workingHoures);
      }
    );
  };

  renderWorkingDays = () => {
    const { language } = this.props;
    const { workingDays, workingHoures } = this.state;
    return workingHoures.map((day, index) => {
      return (
        <tr
          className={workingDays[index].en + (!workingHoures[workingDays[index].key].isActive ? " off" : "  ")}
          key={workingDays[index].key}
        >
          <td>
            <div className="checkbox ">
              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="workingHourSaturday"
                  checked={workingHoures[workingDays[index].key].isActive}
                  onChange={() => {
                    this.activeDay(workingDays[index].key);
                  }}
                />
                <span
                  className={
                    "checkmark " + (language === "ar" ? "right-0" : "left-0")
                  }
                ></span>
              </label>
            </div>
          </td>
          <td>
            <p
              className={this.props.language == "ar" ? "ar-font wide-desktop" : "wide-desktop"}
              // style={{ width: "300px" }}
            >
              {workingDays[index][language]}
            </p>
            {day.isActive && workingHoures[index].error && (
              <div>
                <p className="field__errors">
                  {
                    this.props.localization.VALIDATION.TIME_RANGE[
                      `${this.props.language}`
                    ]
                  }
                </p>
              </div>
            )}
          </td>
          <td className="timeKeeper-container relative-position">
            <input
              className="inputTime  "
              value={workingHoures[index]["from12"]}
              type="text"
              readOnly
              onClick={() => {
                this.toggelTime(index, "showStartPicker");
              }}
            />
            {day.showStartPicker
              ? this.renderTimePicker(day, "showStartPicker")
              : null}
          </td>
          <td> - </td>
          <td className="timeKeeper-container relative-position">
            <input
              className="inputTime "
              value={workingHoures[index]["to12"]}
              type="text"
              readOnly
              onClick={() => {
                this.toggelTime(index, "showEndPicker");
              }}
            />
            {day.showEndPicker
              ? this.renderTimePicker(day, "showEndPicker")
              : null}
          </td>
        </tr>
      );
    });
  };

  updateTime = (time, day, startORfrom) => {
    let workingHoures = [...this.state.workingHoures];
    const dayIndex = workingHoures.indexOf(day);
    if (startORfrom === "showStartPicker") {
      workingHoures[dayIndex]["from24"] = time.formatted24;
      workingHoures[dayIndex]["from12"] = time.formatted12;
    } else {
      workingHoures[dayIndex]["to124"] = time.formatted24;
      workingHoures[dayIndex]["to12"] = time.formatted12;
    }
    this.setState({ workingHoures });
  };

  saveTime = () => {
    this.props.setWorkingHoures(this.state.workingHoures);
  };

  toggelTime = (index, startORfrom) => {
    let workingHoures = [...this.state.workingHoures];
    workingHoures.map((el, i) => {
      if (i !== index) {
        el["showStartPicker"] = false;
        el["showEndPicker"] = false;
      }
    });
    const found = workingHoures.some((el, i) => i === index);
    if (found) {
      if (startORfrom === "showStartPicker") {
        workingHoures[index]["showStartPicker"] = !workingHoures[index][
          "showStartPicker"
        ];
        workingHoures[index]["showEndPicker"] = false;
      } else {
        workingHoures[index]["showEndPicker"] = !workingHoures[index][
          "showEndPicker"
        ];
        workingHoures[index]["showStartPicker"] = false;
      }
      this.setState({
        workingHoures: workingHoures
      });
    }
  };

  closePicker = () => {
    let workingHoures = [...this.state.workingHoures];
    workingHoures.map((el, i) => {
      el["showStartPicker"] = false;
      el["showEndPicker"] = false;
    });
    this.setState(
      {
        workingHoures: workingHoures
      },
      () => this.checkRangeErrors()
    );
  };

  isInvalidPeriod(from, to) {
    let fromTime = from.split(":").map(n => Number(n));
    let toTime = to.split(":").map(n => Number(n));
    if (fromTime[0] > toTime[0]) return true;
    if (fromTime[0] === toTime[0] && fromTime[1] > toTime[1]) {
      return true;
    }
    return false;
  }

  checkRangeErrors = () => {
    let workingHoures = [...this.state.workingHoures];
    let timeRangeError = false;
    for (let i = 0; i < workingHoures.length; i++) {
      const { from24, to124, from12, to12 } = workingHoures[i];
      if (this.isInvalidPeriod(from24, to124)) {
        workingHoures[i].error = true;
        timeRangeError = true;
      } else {
        workingHoures[i].error = false;
      }
    }
    this.setState({
      workingHoures: workingHoures,
      timeRangeError: timeRangeError
    });
  };

  renderTimePicker = (day, startORfrom) => {
    return (
      <Timekeeper
        closeOnMinuteSelect={true}
        onChange={newTime => this.updateTime(newTime, day, startORfrom)}
        switchToMinuteOnHourSelect
        coarseMinutes={15}
        forceCoarseMinutes
        time={startORfrom === "showStartPicker" ? day.from12 : day.to12}
        doneButton={newTime => (
          <div
            style={{
              textAlign: "center",
              padding: "10px 0",
              cursor: "pointer"
            }}
            onClick={() => this.closePicker()}
          >
            Close
          </div>
        )}
      />
    );
  };

  render() {
    const { language } = this.props;

    return (
      <React.Fragment>
        <div className="outter-container">
          <Table className={language === "ar" ? "rtl-dir" : "ltr-dir"}>
            <tbody>{this.renderWorkingDays()}</tbody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps, { setWorkingHoures, getcategories })(
  Step4
);
