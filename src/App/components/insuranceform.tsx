import React, { useEffect, useState } from 'react';
import {FormTypes} from '../types'
import {defaultFormValues} from '../constants'
import InsuranceSummaryComponent from './insurancesummary'
import {Link , useNavigate  } from 'react-router-dom';

const InsuranceFormComponent = (props:any) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormTypes>(defaultFormValues);

  /* Calculate permium amount */
  const calculatePremium = (age:number) => {
    let currency: number ;
    switch(formValues.country){
      case 'HKD':
        currency = 1
      break;
      case 'USD':
        currency = 2
      break;
      case 'AUD':
        currency = 3
      break;
      default:
        currency = 1  
    }
    const safeCharges = ((currency) * (10 * age)) * 0.5;
    const superSafeCharges = ((currency) * (10 * age)) * 0.75;
    const premiumAmount = (currency) * (10 * age)
    setFormValues({
      ...formValues,
      premiumAmount,
      safeCharges,
      superSafeCharges
    })
  }

   /* Handle view updates only when change occurs in Age, Country or Plantype */
  useEffect(() => {
    if(formValues.age){
      const {age} = formValues;
      calculatePremium(age)
    }
   
  }, [formValues.age , formValues.country , formValues.packageType]);


  const handleFormChange = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const hideSummarySection = () => {
    setFormValues({
      ...formValues,
      isSummaryEnabled:false
    })
  }

  const submit = (e: React.FormEvent<EventTarget> ) => {
    e.preventDefault();
    e.stopPropagation();
    /** Check Age if greater than 100 navigate to start screen */ 
    if((formValues.age || 0) > 100){
      navigate('/');
    }

    setFormValues({
      ...formValues,
      isSummaryEnabled:true,
      hideSummarySection
    })

  }


   /* Return form template */
  return (!formValues.isSummaryEnabled ? <>
    <section className='section'>
      <h1 className='App-title'>Tell us about yourself</h1>
      <div>
        <form onSubmit={submit } className="premiumform">
        <div className='uper-section'>
            <div className='form-control'>
              <label>Name</label>
              <input type='text' name='name' value={formValues.name ?? ''} onChange={handleFormChange} />
            </div>
            <div className='form-control'>
              <label>Age</label>
              <input type='number' name='age' value={formValues.age ?? ''} onChange={handleFormChange} />
            </div>
            <div className='form-control'>
              <label>Where do you live</label>
              <select name="country" value={formValues.country} onChange={handleFormChange}>
                <option value="HKD">Hong Kong</option>
                <option value="USD">USA</option>
                <option value="AUD">Australia</option>
              </select>
            </div>
          </div>
          <div className='lower-section'>
            <div className='lower-container'>
              <div className='form-control'>
                <div className='radio-options'>
                  <input type='radio' name='packageType' value="1" checked={formValues.packageType === "1"} onChange={handleFormChange}/>
                  <label className='packageType-label'>Standard </label>
                </div>
                <div className='radio-options'>
                  <input type='radio' name='packageType' value="2" checked={formValues.packageType === "2"} onChange={handleFormChange} />
                  <label className='packageType-label'>Safe {formValues.age  ? `(+${formValues.safeCharges} ${formValues.country}, 50% )`: '(+0HKD, 50%)' }</label>
                </div>
                <div className='radio-options'>  
                  <input type='radio' name='packageType' value="3" checked={formValues.packageType === "3"} onChange={handleFormChange} />
                  <label className='packageType-label'>Super Safe {formValues.age  ? `(+${formValues.superSafeCharges} ${formValues.country}, 75% )`: '(+0HKD, 75%)' }</label>
                </div>  
              </div>
            
              <div className='premium-msg'>
                <h2> {formValues.premiumAmount ? `Your premium amount is: ${formValues.premiumAmount} ${formValues.country}` : ''}  </h2>
              </div>
              <div className='form-control'>
                <Link to="/"><button className='back-btn'>Back</button></Link>
                <input type='submit' className='next-btn' value="Next" />
              </div>
            </div> 
          </div>   
        </form>
      </div>
      
    </section>
  </>: formValues.isSummaryEnabled && <InsuranceSummaryComponent {...formValues} />);
}

export default InsuranceFormComponent;