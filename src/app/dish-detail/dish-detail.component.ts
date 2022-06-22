import {Component, Input, OnInit} from '@angular/core';
import {DISHES} from "../shared/dishes";
import {Dish} from "../shared/dish";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  @Input()
  dish : Dish;
  constructor() { }

  ngOnInit(): void {
  }

}
