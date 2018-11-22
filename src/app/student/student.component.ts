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
import {
  ActivatedRoute,Router
} from '@angular/router';

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
  public id=0;
  constructor(private adapter: DateAdapter < any > ,
    private StudentService: StudentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, ) {}

  ngOnInit() {
    this.adapter.setLocale('en-GB');
    this.id = +this.route.snapshot.paramMap.get('Id');
    if (this.id != null && this.id!=0) {
      this.StudentService.EditStudent(this.id)
        .subscribe(student => this.student = student);
    }
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
    if (this.StudentForm.valid) {
      if (this.id != null && this.id!=0) {
        this.StudentService.UpdateStudent(this.student).subscribe(
          student => {
            this.router.navigate(['Dashboard']);
            alert('Successfull');
          },
          error => alert(error.Message)
        );
      }
      else{
       
        this.StudentService.InsertStudent(this.student).subscribe(
          student => {
            this.Reset(),
            alert('Successfull');
          },
          error => alert(error.Message)
        );
      }
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
