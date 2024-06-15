const nullishValues = {
    "step1": null,
    "step2": null,
    "step3": null,
    "step4": null,
    "step5": null,
}
export class PayloadCreator{
    //Make Props Private 
    #centerName;#email;#location;#cityID;#address;#promoCode;#referralCode;#centerTypes;#employees;#workingHours;#services;#step;#phoneNumber;#registerationToken;
    // Inital Props With Null - Backend Asked For it
    constructor({centerName = null, email = null , location = null ,  cityID = null , address = null , promoCode = null , referralCode = null , centerTypes = null, employees=null , workingHours = null, services = null, step = 1 , phoneNumber = null , registerationToken = null}){
        this.#centerName = centerName;
        this.#email = email;
        this.#location= location;
        this.#cityID= cityID;
        this.#address= address;
        this.#promoCode= promoCode;
        this.#referralCode= referralCode;
        this.#centerTypes = centerTypes;
        this.#employees = employees;
        this.#workingHours = workingHours;
        this.#services = services;
        this.#step = step;
        this.#phoneNumber = phoneNumber;
        this.#registerationToken = registerationToken;

    };
    createStep1 = () => {
        return  {
            ...nullishValues,
            "step1" :{
                "centerName" : this.#centerName,
                "email":this.#email,
                "location": this.#location,
                "cityID": this.#cityID,
                "address": this.#address,
                "promoCode": this.#promoCode,
                "referralCode": this.#referralCode,
            },
            "step": this.#step,
            "phoneNumber": this.#phoneNumber,
            "registerationToken":this.#registerationToken
        } 
    }
    createStep2 = () =>{
        return  {
            ...nullishValues,
            "step2": {
                "centerTypes" : this.#centerTypes
            },
            "step": this.#step,
            "phoneNumber": this.#phoneNumber,
            "registerationToken":this.#registerationToken
        }
    }  
    createStep3 = () =>{
        return  {
            ...nullishValues,
            "step3": {
                "employees": this.#employees
            },
            "step": this.#step,
            "phoneNumber": this.#phoneNumber,
            "registerationToken":this.#registerationToken
        } 
    }
    createStep4 = () =>{
        return  {
            ...nullishValues,
            "step4": {
                "workingHours":this.#workingHours
            },
            "step": this.#step,
            "phoneNumber": this.#phoneNumber,
            "registerationToken":this.#registerationToken
        } 
    }
    createStep5 = () =>{
        return  {
            ...nullishValues,
            "step5": {
                "services": this.#services 
            },
            "step": this.#step,
            "phoneNumber": this.#phoneNumber,
            "registerationToken":this.#registerationToken
        } 
    }
}
