import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  public form!: FormGroup; 
  public contactList!: FormArray;
  id!: string;
  isAddMode!: boolean;
  submitted = false;
  userdata: any;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private fb: FormBuilder, private empServoce: EmployeeService, private route: ActivatedRoute,
    private router: Router,) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.isAddMode = !this.id;
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      organization: [null],
      contacts: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    // this.contactList = this.form.get('contacts') as FormArray;
    if (!this.isAddMode) {
      this.empServoce.getById(this.id)
          .subscribe(x => this.form.patchValue(x));
  }
  }

  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index: number) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index: any) {
    let validators = null;

    if (this.getContactsFormGroup(index).value === 'email') {
      validators = Validators.compose([Validators.required, Validators.email]);
    } else {
      validators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
      ]);
    }

    this.getContactsFormGroup(index).controls['value'].setValidators(
      validators
    );

    this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index:  number): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
}
createUser() {
  this.empServoce.create(this.form.value)
      .subscribe((data) => {
        alert("Submit Data")
        // this.alertService.success('User added', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      })
    // .add(() => this.loading = false)
}

updateUser() {
  this.empServoce.update(this.id, this.form.value)
      .subscribe(() => {
        alert("update  Data")
        // this.alertService.success('User added', { keepAfterRouteChange: true });
        this.router.navigate(['/list'], { relativeTo: this.route });
      })
}
 

}