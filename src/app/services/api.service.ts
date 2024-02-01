import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userInfo: any;
  options = {
    headers: new HttpHeaders({ 'Authorization': '' }),
  };
  httpOptions = {
     headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
  }),};
  constructor(
    private http: HttpClient, ){}
  
    getLocalStorageData(data){
      const storedData = localStorage.getItem(data);
      return storedData;
      }
     getBusinessId(data:any){
      return this.http.post(`${environment.baseUrl}/customer/businessID`,data);
     }
     login(data:any){
      return this.http.post(`${environment.baseUrl}/customer/login`, data);
     }
     customerLogin(data:any){
      return this.http.post(`${environment.baseUrl}/customer/login`, data);
     }
     signup(data:any){
      return this.http.post(`${environment.baseUrl}/customer/signup`,data);
    }
    getReward(data:any){
      return this.http.post(`${environment.baseUrl}/reward/getAll`,data);
    }

    redeemReward(data:any){
      console.log('data',data)
      return this.http.post(`${environment.baseUrl}/reward/redeem`,data);
    }
    getuserinfo(data:any){
      return this.http.post(`${environment.baseUrl}/customer/userinfo`,data);
      // return this.http.post(`${environment.baseUrl}/api/cashier/userinfo`,data);
     }
}


