import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryList } from '../Models/CategoryList';
import { Header } from '../Models/Header';
import { TransactionData } from '../Models/TrasactionData';

const URL:string = environment.Base_URL;
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  getTxnData():Observable<TransactionData[]>{
     return this.http.get<TransactionData[]>(URL+"/TransactionApi",{responseType:"json"});
  }
  
  getCList():Observable<CategoryList[]>{
    return this.http.get<CategoryList[]>(URL+"/TransactionApi/catList",{responseType:"json"});
 }


  getHeader():Observable<Header>{
    return this.http.get<Header>(URL+"/TransactionApi/header",{responseType:"json"});
 }

  deleteTxn(data:any):any{
    return this.http.delete(URL+"/TransactionApi/"+data,{responseType:"text"});
  }

  saveTxn(data:any){
    return this.http.post(URL+"/TransactionApi",data,{responseType:'text'})
  }

  updateTxn(data:any,id:number){
    return this.http.put(URL+"/TransactionApi/"+id,data);
  }

  searchTxn(data:any):Observable<TransactionData[]>{
    return this.http.post<TransactionData[]>(URL+"/TransactionApi/search",data,{responseType:"json"});
  }
}
