import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";
import {DishService} from "../services/dish.service";
import {expand, flyInOut} from "../animations/app.animation";
import {style} from "@angular/animations";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host : {
    '[@flyInOut]' : 'true',
    'style' : 'display : block'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes : Dish[];
  selectDish : Dish;
  errMsg : string;
  constructor(private dishService : DishService,
              @Inject('BaseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        (errmess)=>this.errMsg = <any>errmess);
  }
  onSelectDish(dish:Dish){
    this.selectDish = dish;
  }

}
