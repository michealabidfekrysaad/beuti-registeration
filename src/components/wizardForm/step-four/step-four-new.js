import React, { useEffect, useState } from "react";
import {
  days,
  hoursMinutesDropDown,
  hoursMinutesDropDownAr,
  workingHoursInitalValue,
} from "./../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import {
  getcategories,
  setWorkingHoures,
} from "./../../../services/redux/actions/index";

const StepFour = () => {
  const { language, centerTypes } = useSelector((data) => data);
  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*            Becuase It's Big Object you can find it On Constants            */
  /* -------------------------------------------------------------------------- */

  const [workingHours, setWorkingHours] = useState(workingHoursInitalValue);

  const timeDropDown =
    language === "ar" ? hoursMinutesDropDownAr : hoursMinutesDropDown;

  useEffect(() => {
    getcategories(centerTypes)(dispatch);
  }, []);
  useEffect(() => {
    setWorkingHoures(workingHours)(dispatch);
  }, [workingHours]);

  /* -------------------------------------------------------------------------- */
  /*                        Handle Change Hours And Day                         */
  /* -------------------------------------------------------------------------- */

  function handleChangeStartDate(currentDay, value) {
    // Get Current Day And Mainuplate it
    setWorkingHours(
      workingHours.map((day) => {
        if (day.day === currentDay) {
          return {
            ...day,
            from: value,
            // to: value,
          };
        }
        return day;
      })
    );
  }

  function handleChangeEndDate(currentDay, value) {
    // Get Current Day And Mainuplate it
    setWorkingHours(
      workingHours.map((day) => {
        if (day.day === currentDay) {
          return {
            ...day,
            to: value,
          };
        }
        return day;
      })
    );
  }
  function handleActiveToggle(currentDay, checked) {
    setWorkingHours(
      workingHours.map((day) => {
        if (day.day === currentDay) {
          return {
            ...day,
            isActive: checked,
          };
        }
        return day;
      })
    );
  }

  /* -------------------------------------------------------------------------- */
  /*               Set All Days Like First Day In Array (Saturday)              */
  /* -------------------------------------------------------------------------- */

  function handleActiveAll() {
    const firstDayInArray = workingHours[0];
    setWorkingHours(
      workingHours.map((ele) => {
        if (ele.day === 6) return { ...ele, isActive: true };
        return {
          ...ele,
          isActive: true,
          from: firstDayInArray.from,
          to: firstDayInArray.to,
        };
      })
    );
  }
  /* -------------------------------------------------------------------------- */
  /*        Validation to make user can't pick end date before start date       */
  /* -------------------------------------------------------------------------- */

  function disableToOptions(from, to) {
    if (from && to) return from.split(":").join("") >= to.split(":").join("");
  }

  return (
    <Container className="mb-5">
      <Row>
        {/* Draw The Rows Of Days */}
        {workingHours.map((day) => (
          <Col xs={12} className="workinghours">
            <Row>
              {/* CheckBox And Day */}
              <Col xs={12} md={2} className="workinghours-row">
                <div className="checkbox ">
                  <label className="checkboxLabel">
                    <input
                      type="checkbox"
                      name="workingHourSaturday"
                      checked={day.isActive}
                      onChange={(e) =>
                        handleActiveToggle(day.day, e.target.checked)
                      }
                    />
                    <span
                      className={
                        "checkmark " +
                        (language === "ar" ? "right-0" : "left-0")
                      }
                    ></span>
                  </label>
                </div>
                <p className="mx-1">{days[day.day][language]}</p>
              </Col>
              {day.isActive ? (
                <>
                  {/* From Input DropDown */}
                  <Col xs={12} md={4} className="workinghours-row">
                    <span className="mx-2">
                      {language === "ar" ? "من" : "from"}
                    </span>
                    <select
                      className="form-select  employee-box__controllers-select"
                      aria-label="Default select example"
                      onChange={(e) =>
                        handleChangeStartDate(day.day, e.target.value)
                      }
                      disabled={!day.isActive}
                      value={day.from}
                    >
                      {timeDropDown.map((time) => (
                        <option key={time.key} value={time.value}>
                          {time.text}
                        </option>
                      ))}
                    </select>
                  </Col>
                  {/* To Input DropDown */}
                  <Col xs={12} md={4} className="workinghours-row">
                    <span className="mx-2">
                      {language === "ar" ? "الي" : "to"}
                    </span>
                    <select
                      className={`form-select  employee-box__controllers-select ${
                        (day.to < day.from || day.to === day.from) &&
                        "error-border"
                      }`}
                      aria-label="Default select example"
                      onChange={(e) =>
                        handleChangeEndDate(day.day, e.target.value)
                      }
                      disabled={!day.isActive || !day.from}
                      value={day.to}
                    >
                      {timeDropDown.map((time) => (
                        <option
                          disabled={disableToOptions(day.from, time.value)}
                          key={time.key}
                          value={time.value}
                        >
                          {time.text}
                        </option>
                      ))}
                    </select>
                  </Col>
                </>
              ) : (
                <Col xs={8} className="text-center">
                  {language === "ar" ? "مغلق" : "closed"}
                </Col>
              )}
              {/* Pick All Checkbox */}

              <Col
                xs="auto"
                md={2}
                className="workinghours-row justify-content-center"
              >
                {day.day === 6 && (
                  <>
                    <button
                      className="mx-1 apply-btn"
                      onClick={() => handleActiveAll()}
                    >
                      {language === "ar" ? "تطبيق الكل" : "Apply all"}
                    </button>
                  </>
                )}
              </Col>

              {/* Error Message */}
              {(day.to < day.from || day.to === day.from) && (
                <Col xs={12} className="text-danger font-14px">
                  {language === "ar"
                    ? "ساعات الإغلاق يجب أن تكون بعد بداية ساعات العمل"
                    : "Closing hours should be after working hours"}
                </Col>
              )}
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StepFour;
