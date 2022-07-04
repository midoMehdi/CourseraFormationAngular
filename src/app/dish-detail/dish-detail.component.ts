import {Component, Input, OnInit} from '@angular/core';
import {DISHES} from "../shared/dishes";
import {Dish} from "../shared/dish";
import {ActivatedRoute, Params} from "@angular/router";
import {DishService} from "../services/dish.service";
import {Location} from "@angular/common";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {


  dish : Dish;
  id : string;
  dishIds : String[];
  next : string;
  prev : string;
  constructor(private activatedRoute : ActivatedRoute,
              private dishService : DishService,
              private location : Location) {
  }

  ngOnInit(): void {
    /*this.id = this.activatedRoute.snapshot.params['id'];
    this.dishService.getDish(this.id)
      .subscribe((dish) => this.dish = dish);*/
    this.dishService.getDishIds()
      .subscribe((dishIds)=>this.dishIds = dishIds);
    this.activatedRoute.params.pipe(switchMap((params : Params)=>this.dishService.getDish(params['id'])))
      .subscribe((dish)=>{this.dish = dish; this.setPrevNext(dish.id)});

  }

  setPrevNext(dishId : string){
    const index = this.dishIds.indexOf(dishId);
    console.log(this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length].toString();
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length].toString();
  }
  goBack(){
    this.location.back();
  }

}
