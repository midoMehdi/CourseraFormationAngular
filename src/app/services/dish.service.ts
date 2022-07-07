import { Injectable } from '@angular/core';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";
import {delay, map, Observable, of} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {baseURL} from "../shared/basrurl";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http : HttpClient) { }

  getDishes() : Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL+'dishes');
  }
  getDish(id : string) : Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes'+'/'+id);


  }
  getFeaturedDish() : Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes?featuredDish=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds() : Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)));
  }
}
