import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactType, FeedBack} from "../shared/feedback";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : FeedBack;
  contactType = ContactType;
  constructor(private fb : FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname : '',
      lastname : '',
      telnum : 0,
      email : '',
      agree : false,
      contacttype : 'None',
      message : ''
    });
  }
  ngOnInit(): void {
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
  }

}
