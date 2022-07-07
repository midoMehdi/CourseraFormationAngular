import { Injectable } from '@angular/core';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";
import {catchError, delay, map, Observable, of} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {baseURL} from "../shared/basrurl";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http : HttpClient,
              private processHTTPMsg : ProcessHTTPMsgService) { }

  getDishes() : Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL+'dishes')
      .pipe(catchError(this.processHTTPMsg.handleError));
  }
  getDish(id : string) : Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes'+'/'+id)
      .pipe(catchError(this.processHTTPMsg.handleError));


  }
  getFeaturedDish() : Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes?featuredDish=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsg.handleError));
  }

  getDishIds() : Observable<string[] | any>{
    return this.getDishes()
      .pipe(map(dishes=>dishes.map(dish=>dish.id)))
      .pipe(catchError(error => error));
  }
}
