import {
  Component,
  OnInit
} from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  Info
} from '../StudentInfo'
import {
  StudentService
} from '../student.service'


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [{
      provide: MAT_DATE_LOCALE,
      useValue: 'ja-JP'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    },
  ],
})
export class StudentComponent implements OnInit {

  public student: Info = new Info();

  constructor(private adapter: DateAdapter < any > , private StudentService: StudentService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.adapter.setLocale('en-GB');
  }

  Reset(): void {
    this.student = new Info();
  }

  //Create a form
  StudentForm = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Mobile: ['', [Validators.required, ]],
    emailFormControl: ['', [Validators.required, Validators.email]],
    DOB: ['', [Validators.required]],
    Gender: ['', [Validators.required]],
    Address: ['', [Validators.required]]
  });

  submit(): void {
    if (this.StudentForm) {

      this.StudentService.InsertStudent(this.student).subscribe(
        student => {
          this.Reset()
        },
        error => alert(error.Message)
      );
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  FirstName = new FormControl('', [
    Validators.required,
  ]);

  Mobile = new FormControl('', [
    Validators.required,
  ]);

  LastName = new FormControl('', [
    Validators.required,
  ]);
  DOB = new FormControl('', [
    Validators.required
  ]);
  Gender = new FormControl('', [
    Validators.required
  ])
  Address = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
}
