import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
  validateReferalCode,
  validatePromoCodeFailure,
  validateReferalCodeFailure,
  validatePromoCodeSuccess,
  validateReferalCodeSuccess,
} from "./../../services/redux/actions/index";
import HTTPClient from "../../services/networking/queries";

function AddCodeModal(props) {
  const [show, setShow] = useState(false);
  const [userSelection, setUserSelection] = useState("promocode");
  const [code, setCode] = useState();
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  // make the api in modal because i want to close the modal if the promise resolved
  const validatePromoCode = async (promoCode) => {
    HTTPClient.fetch(`SPPromoCode/Validate?promoCode=${promoCode}`, true, 2)
      .then((res) => {
        dispatch(validatePromoCodeSuccess(promoCode));
        dispatch(validateReferalCodeSuccess(""));
        dispatch(validatePromoCodeFailure(""));
        setShow(false);
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(validatePromoCodeFailure(err.response.data.error.message));
          dispatch(validatePromoCodeSuccess(""));
        }
      });
  };
  const validateReferalCode = async (referralCode) => {
    HTTPClient.fetch(
      `ReferralCode/Validate?referralCode=${referralCode}`,
      true,
      2
    )
      .then((res) => {
        dispatch(validateReferalCodeSuccess(referralCode));
        dispatch(validatePromoCodeSuccess(""));
        dispatch(validateReferalCodeFailure(""));
        setShow(false);
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(validateReferalCodeFailure(err.response.data.error.message));
          dispatch(validateReferalCodeSuccess(""));
        }
      });
  };
  // useEffect(() => {
  //   if (store.referralCode === code || store.promoCode === code) {
  //     setShow(false);
  //     setCode(null);
  //   }
  // }, [store]);

  const { language: locale, promoFailure, referalFailure } = store;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCheckAndClose = () => {
    if (userSelection === "referalcode") {
      // dispatch(validateReferalCode(code));
      validateReferalCode(code);
    }

    if (userSelection === "promocode") {
      // dispatch(validatePromoCode(code));
      validatePromoCode(code);
    }
    dispatch(validateReferalCodeFailure(""));
    dispatch(validatePromoCodeFailure(""));
  };

  return (
    <>
      <button
        type="button"
        className="btn field__button ar-font"
        onClick={handleShow}
      >
        {store.referralCode.length === 0 && store.promoCode.length === 0 && (
          <>{locale === "ar" ? "إضافة كود خصم" : "Add Code"}</>
        )}
        {(store.referralCode.length !== 0 || store.promoCode.length !== 0) && (
          <>{locale === "ar" ? "تغيير كود" : "Change Code"}</>
        )}
      </button>
      <h5 className="ar-font">
        {((store.referralCode && locale === "ar") ||
          (store.promoCode && locale === "ar")) && (
          <span>تم إضافة كود بنجاح</span>
        )}
        {((store.referralCode && locale === "en") ||
          (store.promoCode && locale === "en")) && (
          <span>Code Added Successfully</span>
        )}
      </h5>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={locale === "ar" ? "text-right ar-font" : "ar-font"}
          >
            <h3>{locale === "ar" ? "إضافة كود خصم" : "Add Code"}</h3>
            <div className="form-check form-check-inline mt-4 mb-4 ar-font">
              <input
                type="radio"
                className="form-check-input ar-font"
                id="promocode"
                checked={userSelection === "promocode"}
                name="select-promo-referal"
                onClick={() => {
                  setUserSelection("promocode");
                  dispatch(validateReferalCodeFailure(""));
                  dispatch(validatePromoCodeFailure(""));
                }}
              />
              <label className="form-check-label ar-font" for="promocode">
                {locale === "ar" ? "إضافة كود خصم" : "promo code"}
              </label>
            </div>

            <div className="form-check form-check-inline ar-font">
              <input
                type="radio"
                className="form-check-input"
                id="materialInline2"
                checked={userSelection === "referalcode"}
                name="select-promo-referal"
                onClick={() => {
                  setUserSelection("referalcode");
                  dispatch(validateReferalCodeFailure(""));
                  dispatch(validatePromoCodeFailure(""));
                }}
              />
              <label className="form-check-label ar-font" for="materialInline2">
                {locale === "ar" ? "كود الإحالة" : "Referal code"}
              </label>
            </div>
            {promoFailure && (
              <div className="text-danger ar-font">{promoFailure}</div>
            )}
            {referalFailure && (
              <div className="text-danger ar-font">{referalFailure}</div>
            )}
          </div>
          <div className="mt-1 m-4" dir={locale === "ar" ? "rtl" : "ltr"}>
            <input
              className="form-control form-control-lg ar-font"
              type="text"
              placeholder={locale === "ar" ? "الكود" : "CODE"}
              onChange={(e) => {
                setCode(e.target.value);
                dispatch(validateReferalCodeFailure(""));
                dispatch(validatePromoCodeFailure(""));
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn field__button ar-font" onClick={handleClose}>
            {locale === "ar" ? "إلغاء" : "Cancel"}
          </button>
          <button
            className="btn field__button ar-font"
            onClick={handleCheckAndClose}
          >
            {locale === "ar" ? "التأكيد والحفظ" : "Confirm and save"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCodeModal;
