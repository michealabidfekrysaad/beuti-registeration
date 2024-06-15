import React from 'react';
import { useLocation } from "react-router-dom";

const ThanksYouAdvertiser  =( {centerName,language,advertiserToken}) =>{
	const location = useLocation();
	return (
		<div className="row text-center">
			<div className="col-12 mb-5">
				<h1 style={{direction: `${language !== 'en' && 'rtl'}`}}>
					{language === 'en' ? 
						`The SP ${centerName} Has been registered successfully` : 
						`تم تسجيل مقدم الخدمة ${centerName} بنجاح`}
				</h1>
			</div>
			<div className="col-12 mt-5">
			<div className="row mt-5">
			<div className="col-12 mt-2">
			<button
			type="button"
			className="btn field__button ar-font text-right"
			onClick={() => window.location.replace(`${location.pathname+'?adv='+advertiserToken}`)}
			  >
				{language === 'en' ? 'Add another SP': 'إضافة مقدم خدمة آخر'}
			  </button>
			</div>
			</div>
			</div>
		</div>
	)
}


  export default ThanksYouAdvertiser ;   