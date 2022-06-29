import { Component, OnInit } from '@angular/core';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";
import {DishService} from "../services/dish.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes : Dish[];
  selectDish : Dish;
  constructor(private dishService : DishService) { }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes);
  }
  onSelectDish(dish:Dish){
    this.selectDish = dish;
  }

}
