import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../Models/Category';
import { CategoryList } from '../Models/CategoryList';

const URL:string= environment.Base_URL;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(URL+"/CategoryApi",{responseType:"json"});
 }

 getCList():Observable<CategoryList[]>{
  return this.http.get<CategoryList[]>(URL+"/TransactionApi/catList",{responseType:"json"});
}

searchCat(data:any):Observable<Category[]>{
  return this.http.post<Category[]>(URL+"/CategoryApi/search",data,{responseType:"json"});
}
}
