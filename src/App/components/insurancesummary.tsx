import * as React from 'react';
import {FormTypes} from '../types'
import {Link , useNavigate  } from 'react-router-dom';

const InsuranceSummaryComponent = (props: any) => {
    const navigate = useNavigate();
    const {name , age , premiumAmount , packageType , safeCharges , superSafeCharges , hideSummarySection } = props
    const getCountry = (currencyCode:string) =>{
        switch(currencyCode){
            case 'HKD':
                return 'Hong Kong';
            break; 
            case 'USD':
                return 'USA';
            break;    
            case 'AUD':
                return 'Australia';
            break;
            default:
                return 'Hong Kong'
        }
    }

    const getFinalPremium = () => {
        let packagePremium;
        switch(packageType){
            case '1':
                return premiumAmount
            break;
            case '2':
                return (premiumAmount || 0) + (safeCharges || 0)
            break;
            case '3':
                return (premiumAmount || 0) + (superSafeCharges || 0 )
            break;         
        }
    }

    const navToPremiumForm = () => {
        navigate('/start') 
    }

	return <>
	<section className='summary section'>
        <h1 className='title'>Summary</h1>
        <div>
            <h3>{name}</h3>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Where do you live: {getCountry(props.country || '')}</p>
            <p>Package: {packageType}</p>
            <p>Premium: {getFinalPremium()}</p>
            <div className='btn-holder'>
                <button className='back-btn' onClick={hideSummarySection }>Back</button>
                <Link to="/"><button className='next-btn'>Buy</button></Link>
            </div>
        </div>
    </section>
	</>;
}

export default InsuranceSummaryComponent;

