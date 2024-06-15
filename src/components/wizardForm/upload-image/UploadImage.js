import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../services/redux/actions";
import "./UploadImage.scss";
import ThanksYouAdvertiser from "../thanksPageAdvertiser/ThanksYouAdvertiser";

const UploadImage = ({
  onDone,
  onError,
  phoneNumber,
  uploadImageSucees,
  advertiserToken,
  language,
  centerName
}) => {
  const dispatch = useDispatch();
  const uploadInput = useRef();
  const [counter, setCounter] = useState(0);
  const [uploadPayload, setUploadPayload] = useState(null);
  const [success, setSuccess] = useState(null);
  const [firstUpload, setFirstUpload] = useState(null);
  const [thanksPage, setShowThanksPage] = useState(null);
  const [loading, setLoading] = useState(false);


  // Upload Image Function
  const upload = async (e) => {
    const file = e.target.files[0];
	if(file)
	{
		const base64 = await convertBase64(file);
    if (onDone) onDone(base64);
    const indexOfComma = base64.indexOf(",");
    setUploadPayload({
      image: base64.substring(indexOfComma + 1),
      isDefault: true,
      phoneNumber: `${phoneNumber}`,
      code: `${advertiserToken}`,
    });
}
  };
  // Conver File to Base64
  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
	  if(fileReader){
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
        if (onError) onError(err);
      };
	}
    });
  useEffect(() => {
    if (uploadPayload) {
		setLoading(true);
      uploadImage(uploadPayload)(dispatch);
    }
  }, [uploadPayload]);

  useEffect(() => {
    if (uploadImageSucees && uploadImageSucees.status === 200) {
		setCounter(counter+1);
		setFirstUpload(true);
		setLoading(false);
	  setSuccess(`${language === 'en' ? 'Image Uploaded successfully': 'تم رفع الصورة بنجاح'}`);
	  setTimeout(()=>{	
		    setSuccess(null);
	  },[3000])
    }
  }, [uploadImageSucees]);

  return (
	  <>
	  
    <div className="overlay">
      <div className="outer-image">
        <div id="image-popup" className="image-popup mfp-hide">
		{!thanksPage ? (
			<div className="row h-100">
			<div className="col-12 mb-2">
				<h1>{language === 'en' ? 'Upload Images For Service Provider': 'رفع الصور لمقدمي الخدمة'}</h1>
				</div>

				<div className="col-12 mb-3">
					<input
					type="file"
					style={{ display: "none" }}
					ref={uploadInput}
					onChange={(e) => {
					upload(e);
					}}
					accept={"image/x-png,image/jpeg"}
					/>
					<button
					type="button"
					className="btn field__button ar-font text-right"
					onClick={() => uploadInput.current.click()}
					disabled={loading}
					>{loading && (
						<>
						<span class="spinner-grow spinner-grow-sm mb-1" role="status" aria-hidden="true"></span>
						<span class="sr-only">Loading...</span>	{" "}	
						</>		  	
					)}
						{language === 'en' ? 'Upload images': 'رفع الصور'}
					</button>
					{/* {success&&
						(
							<p className="text-success mt-2">{success}</p>
						)} */}
				</div>
			{counter > 0 && (
				<div className="col-12 mt-3">
					<p className="text-success" style={{direction: `${language !== 'en' && 'rtl'}`}}>
					{language === 'en' ? 
										`${counter} imageس uploaded successfully`:
									    `${counter} صورة تم رفعهم بنجاح`}
					</p>
				</div>
			)}
				
				{firstUpload && (
				<div className="col-12 mt-4">
					<button
					type="button"
					className="btn field__button ar-font text-right"
					onClick={() => setShowThanksPage(true)}
					disabled={loading}
          			>
						{language === 'en' ? 'Finish': 'الانتهاء'}
          			</button>
				</div>
				)}
			</div>
				) :(
					<ThanksYouAdvertiser advertiserToken={advertiserToken} language={language} centerName={centerName}></ThanksYouAdvertiser>
				)}
        </div>
      </div>
    </div>
	</>
  );
};

UploadImage.propTypes = {
  onDone: PropTypes.func,
  onError: PropTypes.func,
};
export default UploadImage;
