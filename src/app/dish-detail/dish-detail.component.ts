import {Component, Input, OnInit} from '@angular/core';
import {DISHES} from "../shared/dishes";
import {Dish} from "../shared/dish";
import {ActivatedRoute} from "@angular/router";
import {DishService} from "../services/dish.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {


  dish : Dish;
  id : string;
  constructor(private activatedRoute : ActivatedRoute,
              private dishService : DishService,
              private location : Location) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dishService.getDish(this.id).then((dish) => this.dish = dish);
  }
  goBack(){
    this.location.back();
  }

}
