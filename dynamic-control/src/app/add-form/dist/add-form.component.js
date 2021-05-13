"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.country = exports.AddFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddFormComponent = /** @class */ (function () {
    function AddFormComponent(fb, empServoce, route, router) {
        this.fb = fb;
        this.empServoce = empServoce;
        this.route = route;
        this.router = router;
        this.submitted = false;
        this.countryList = [
            new country("1", "India"),
            new country('2', 'USA'),
            new country('3', 'England')
        ];
    }
    Object.defineProperty(AddFormComponent.prototype, "contactFormGroup", {
        // returns all form groups under contacts
        get: function () {
            return this.form.get('contacts');
        },
        enumerable: false,
        configurable: true
    });
    AddFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.form = this.fb.group({
            name: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            organization: [null],
            contacts: this.fb.array([this.createContact()])
        });
        // set contactlist to this field
        // this.contactList = this.form.get('contacts') as FormArray;
        if (!this.isAddMode) {
            this.empServoce.getById(this.id)
                .subscribe(function (x) { return _this.form.patchValue(x); });
        }
    };
    // contact formgroup
    AddFormComponent.prototype.createContact = function () {
        return this.fb.group({
            type: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            value: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
    };
    // add a contact form group
    AddFormComponent.prototype.addContact = function () {
        this.contactList.push(this.createContact());
    };
    // remove contact from group
    AddFormComponent.prototype.removeContact = function (index) {
        // this.contactList = this.form.get('contacts') as FormArray;
        this.contactList.removeAt(index);
    };
    // triggered to change validation of value field type
    AddFormComponent.prototype.changedFieldType = function (index) {
        var validators = null;
        if (this.getContactsFormGroup(index).value === 'email') {
            validators = forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email]);
        }
        else {
            validators = forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern(new RegExp('^\\+[0-9]{10})$')) // pattern for validating international phone number
            ]);
        }
        this.getContactsFormGroup(index).controls['value'].setValidators(validators);
        this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
    };
    // get the formgroup under contacts form array
    AddFormComponent.prototype.getContactsFormGroup = function (index) {
        // this.contactList = this.form.get('contacts') as FormArray;
        var formGroup = this.contactList.controls[index];
        return formGroup;
    };
    // method triggered when form is submitted
    AddFormComponent.prototype.onSubmit = function (value) {
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        if (this.isAddMode) {
            this.createUser(value);
        }
        else {
            this.updateUser();
        }
    };
    AddFormComponent.prototype.createUser = function () {
        var _this = this;
        this.empServoce.create(this.form.value)
            .subscribe(function (data) {
            alert("Submit Data");
            // this.alertService.success('User added', { keepAfterRouteChange: true });
            _this.router.navigate(['../'], { relativeTo: _this.route });
        });
        // .add(() => this.loading = false)
    };
    AddFormComponent.prototype.updateUser = function () {
        var _this = this;
        this.empServoce.update(this.id, this.form.value)
            .subscribe(function () {
            alert("update  Data");
            // this.alertService.success('User added', { keepAfterRouteChange: true });
            _this.router.navigate(['/list'], { relativeTo: _this.route });
        });
    };
    AddFormComponent = __decorate([
        core_1.Component({
            selector: 'app-add-form',
            templateUrl: './add-form.component.html',
            styleUrls: ['./add-form.component.css']
        })
    ], AddFormComponent);
    return AddFormComponent;
}());
exports.AddFormComponent = AddFormComponent;
var country = /** @class */ (function () {
    function country(id, name) {
        this.id = id;
        this.name = name;
    }
    return country;
}());
exports.country = country;
