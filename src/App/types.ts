export interface AppProps {}

export interface FormTypes {
    name?: string;
    age?:number;
    country?:string;
    packageType?:string;
    premiumAmount?:number;
    safeCharges?:number;
    superSafeCharges?:number;
    isSummaryEnabled?:boolean;
    isWelcomeEnabled?:boolean;
    isFormEnabled?:boolean;
    hideSummarySection?:Function;
}

