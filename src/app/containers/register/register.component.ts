import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

const MIN_LENGTH = 4;
const MAX_LENGTH = 24;
const REQUIRED_FIELD_ERROR = 'This field is required.';
const PASSWORDS_MISMATCH_ERROR = 'Please retype the password.';
const INVALID_EMAIL = 'Please provide a valid email address.';
const MINIMUM_LENGTH = `Minimum length is ${MIN_LENGTH} characters.`;
const MAXIMUM_LENGTH = `Maximum length is ${MAX_LENGTH} characters.`;
const INVALID_LOGIN = 'Please create a login with only alphanumeric characters.';
const loginRegex: RegExp = /^[a-zA-Z0-9]+$/;
// tslint:disable-next-line:max-line-length
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'ct-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  formErrors = {
    'login': REQUIRED_FIELD_ERROR,
    'email': REQUIRED_FIELD_ERROR,
    'password': REQUIRED_FIELD_ERROR,
    'confirmPassword': REQUIRED_FIELD_ERROR
  };

  validationMessages = {
    'login': {
      'required': REQUIRED_FIELD_ERROR,
      'minlength': MINIMUM_LENGTH,
      'maxlength': MAXIMUM_LENGTH,
      'pattern': INVALID_LOGIN
    },
    'email': {
      'required': REQUIRED_FIELD_ERROR,
      'pattern': INVALID_EMAIL
    },
    'password': {
      'required': REQUIRED_FIELD_ERROR,
      'minlength': MINIMUM_LENGTH,
      'notEqualPasswords': PASSWORDS_MISMATCH_ERROR,
    },
    'confirmPassword': {
      'required': REQUIRED_FIELD_ERROR,
      'minlength': MINIMUM_LENGTH,
      'notEqualPasswords': PASSWORDS_MISMATCH_ERROR,
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      'login': ['', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
        Validators.maxLength(MAX_LENGTH),
        Validators.pattern(loginRegex)
      ]],
      'email': ['', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
      ]],
      'confirmPassword': ['', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
        this.comparePasswords('password')
      ]],
    });

    this.registerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;

    Object.keys(this.formErrors).forEach(field => {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        Object.keys(control.errors).forEach(key => {
          this.formErrors[field] += messages[key] + ' ';
        });
      }
    });
  }

  comparePasswords(otherControlName: string): ValidatorFn {
    let thisControl: AbstractControl;
    let otherControl: AbstractControl;

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as AbstractControl;
        if (!otherControl) {
          return null;
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          'notEqualPasswords': true
        };
      }
      return null;
    };
  }
}

