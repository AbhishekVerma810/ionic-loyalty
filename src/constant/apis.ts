import {environment} from '../environments/environment'
export const api={
    // Get businessID api
    'businessID':environment.baseUrl+'/api/customer/businessID',
    'customerLogin':environment.baseUrl+'/api/customer/login',
    'customerSignUp':environment.baseUrl+'/api/customer/signup',
    }