import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../Models/Payment';

const URL:string = environment.Base_URL;
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http :HttpClient) { }

  getPayment():Observable<Payment[]>{
    return this.http.get<Payment[]>(URL+"/PaymentApi",{responseType:"json"});
 }

 searchPayment(data:any):Observable<Payment[]>{
  return this.http.post<Payment[]>(URL+"/PaymentApi/search",data,{responseType:"json"});
}
}
