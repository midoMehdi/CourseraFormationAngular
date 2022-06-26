import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
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
  @ViewChild('fform') feedbackFormDirective : FormGroupDirective;
  constructor(private fb : FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname : ['',Validators.required],
      lastname : ['',Validators.required],
      telnum : [0,Validators.required],
      email : ['',Validators.required],
      agree : [false,Validators.required],
      contacttype : ['None',Validators.required],
      message : ''
    });
  }
  ngOnInit(): void {
  }

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      messafe:''
    });
    this.feedbackFormDirective.resetForm();
  }

}
