import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentComponent} from './student/student.component';
import {SearchStudentComponent} from './search-student/search-student.component'

const routes: Routes=[
  {path:'',redirectTo:'Dashboard',pathMatch:'full'},
  {path:'Dashboard',component:StudentComponent},
  {path:'SearchStudent',component:SearchStudentComponent}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
  
})
export class AppRoutingModule { }
