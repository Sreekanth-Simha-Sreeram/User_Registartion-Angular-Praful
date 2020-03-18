import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterUser {
  constructor(
    public username: string,
    public password: string,
    public repeatpassword: string,
    public email: string
  ) {}
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  @Output() registerIn = new EventEmitter<RegisterUser>();
  registerForm: FormGroup;
  hide = true;
  public obj: any = {};

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      repeatpassword: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]]
    });
  }
  
  onFileSelect(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        console.log("Got here: ", e.target.result);
        this.obj.photoUrl = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit() {
    this.obj = { ...this.registerForm.value, ...this.obj };
    this.registerForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.registerForm.value",
      this.registerForm.value
    );
    if (
      this.registerForm.value.password == this.registerForm.value.repeatpassword
    ) {
      if (this.registerForm.valid) {
        this.registerIn.emit(
          new RegisterUser(
            this.registerForm.value.username,
            this.registerForm.value.password,
            this.registerForm.value.repeatpassword,
            this.registerForm.value.email
          )
        );
      }
    }
  }

  signinpage() {
    this.router.navigateByUrl("signin");
  }

  registerpage() {
    this.router.navigateByUrl("register");
  }

  adminpage() {
    this.router.navigateByUrl("admin");
  }
}
