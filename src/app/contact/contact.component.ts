import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ContactType, FeedBack} from "../shared/feedback";
import {flyInOut} from "../animations/app.animation";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  host : {
    '[@flyInOut]' : 'true',
    'style' : 'display : block'
  },
  animations : [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback : FeedBack;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective : FormGroupDirective;

  formErrors = {
    'firstname': '',
    'lastname' : '',
    'telnum' : '',
    'email' : ''
  };
  ValidationMessages  = {
    'firstname' : {
      'required' : 'First name is required.',
      'minlength' : 'First name must be at least 2 characters long.',
      'maxlength' : 'First name can not be more than 25 characters long.'
    },
    'lastname' : {
      'required' : 'Last name is required.',
      'minlength' : 'Last name must be at least 2 characters long.',
      'maxlength' : 'Last name can not be more than 25 characters long.'
    },
    'telnum' : {
      'required' : 'Tel.num is required.',
      'pattern' : 'Tel.num must contain only numbers.'
    },
    'email' : {
      'required' : 'email is required.',
      'pattern' : 'Email not in valid format.'
    }
  };

  constructor(private fb : FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum : [0,[Validators.required,Validators.pattern]],
      email : ['',[Validators.required,Validators.email]],
      agree : [false,Validators.required],
      contacttype : ['None',Validators.required],
      message : ''
    });

    this.feedbackForm.valueChanges.subscribe((data=>this.onValueChanged(data)));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.ValidationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {

              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
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
