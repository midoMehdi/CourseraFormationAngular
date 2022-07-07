import {Component, Inject, Input, OnInit} from '@angular/core';
import {DISHES} from "../shared/dishes";
import {Dish} from "../shared/dish";
import {ActivatedRoute, Params} from "@angular/router";
import {DishService} from "../services/dish.service";
import {Location} from "@angular/common";
import {switchMap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../shared/comment";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {


  dish : Dish;
  id : string;
  errMsg : string;
  dishIds : String[];
  next : string;
  prev : string;
  comment : Comment;
  rating : number;


  commentForm : FormGroup;

  formErrors = {
    'author': '',
    'rating' : '',
    'comment' : ''
  };

  validationMessages = {
    'author' : {
      'required' : 'The name is required.',
      'minlength' : 'The name must be at least 2 characters long.'
    },

    'comment' : {
      'required' : 'The comment is required.'
    }
  };

  constructor(private activatedRoute : ActivatedRoute,
              private dishService : DishService,
              private location : Location,
              private fb : FormBuilder,
              @Inject('BaseURL') public baseURL) {

    this.createForm();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating:[''],
      comment : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
    });
    this.commentForm.valueChanges.subscribe((data)=>this.onValueChanged(data))
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if(!this.commentForm) return;
    const form = this.commentForm;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key];
        }
      }
    }
  }

  ngOnInit(): void {
    /*this.id = this.activatedRoute.snapshot.params['id'];
    this.dishService.getDish(this.id)
      .subscribe((dish) => this.dish = dish);*/
    this.dishService.getDishIds()
      .subscribe((dishIds)=>this.dishIds = dishIds);
    this.activatedRoute.params.pipe(switchMap((params : Params)=>this.dishService.getDish(params['id'])))
      .subscribe((dish)=>{this.dish = dish; this.setPrevNext(dish.id)},
        (errMss) => this.errMsg = <any>errMss);

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

  formatLabel(value : number){
    this.rating = value;
    return value;
  }

  onSubmit(){
    this.rating = 0;
    if(this.commentForm.get('rating')?.value)
      this.rating = this.commentForm.get('rating')?.value;
    this.comment = {
      'rating' : this.rating,
      'comment' : this.commentForm.get('comment')?.value,
      'author' : this.commentForm.get('author')?.value,
      'date' : new Date().toString()
    };
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    //window.location.reload();

  }

}
