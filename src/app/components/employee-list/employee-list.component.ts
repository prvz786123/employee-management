import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service"

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor( private dataService : DataService ) { }

  employee_list=[];

  name:string="";
  location:string="";
  branch:string="";
  basic_salary:number;

  update_employee_index=null;

  loadEmployeToForm(i){
    this.name=this.employee_list[i].name;
    this.location=this.employee_list[i].location;
    this.branch=this.employee_list[i].branch;
    this.basic_salary=this.employee_list[i].basic_salary;
    this.update_employee_index=i;
  }

  updateEmployee(){
    if(this.update_employee_index>-1){
      if(this.validateForm){
        this.employee_list[this.update_employee_index].name=this.name;
        this.employee_list[this.update_employee_index].location=this.location;
        this.employee_list[this.update_employee_index].branch=this.branch;
        this.employee_list[this.update_employee_index].basic_salary=this.basic_salary;

        this.dataService.setLocalStorage(this.employee_list);
      }
    }
  }

  new_employee_flag=false
  onAddNewEmployee(){
    this.name=""
    this.location="";
    this.branch="";
    this.basic_salary=null;
    this.show_salary_flag=false;
    this.update_form_flag=false;
    this.new_employee_flag=true
  }

  salary_slip={};
  show_salary_flag=false;
  showSalarySlip(i){
    this.update_form_flag=false;
    this.new_employee_flag=false;
    this.show_salary_flag=true;
    this.update_employee_index=i;
    this.salary_slip={};
    this.salary_slip['index']=i;
    this.salary_slip['name']=this.employee_list[i].name;
    this.salary_slip['location']=this.employee_list[i].location;
    this.salary_slip['branch']=this.employee_list[i].branch;
    this.salary_slip['basic_salary']=Number(this.employee_list[i].basic_salary);

    this.salary_slip['hra']=Number(this.employee_list[i].basic_salary*35/100);
    this.salary_slip['pf']=Number(this.employee_list[i].basic_salary*12/100);
    this.salary_slip['ctc']=Number(this.employee_list[i].basic_salary+this.salary_slip['hra']+this.salary_slip['pf']);
    if(this.salary_slip['ctc']>30000){
      this.salary_slip['special_allowance']=Number(this.employee_list[i].basic_salary*12/100);
      this.salary_slip['pf']=null;
    }
    this.salary_slip['professional_tax']=Number(200);
    this.salary_slip['payable_salary']=Number(this.salary_slip['ctc']-(this.salary_slip['professional_tex']+this.salary_slip['pf']|this.salary_slip['special_allowance']))

  }

  ngOnInit() {
    this.employee_list=(this.dataService.getLocalStorage())

    console.log(this.dataService.getIndex());
  }

  onSubmit(){
    if(this.new_employee_flag){
      if(this.validateForm()){
        let newEmployee={
          id:this.dataService.getIndex(),
          name:this.name,
          location:this.location,
          branch:this.branch,
          basic_salary:this.basic_salary
        }
        this.employee_list.push(newEmployee);
        this.dataService.setLocalStorage(this.employee_list);
      }else{
        alert("please fill all the details")
      }
    }else if(this.update_form_flag){
      if(this.validateForm()){
        this.updateEmployee()
      }
    }

  }

  validateForm(){
    if(this.name && this.location && this.branch && this.basic_salary){
      return true
    }else{
      return false;
    }
  }

  update_form_flag
  onEmployeeEdit(id){
    console.log(id)
    this.show_salary_flag=false;
    this.new_employee_flag=false;
    this.update_form_flag=true;
    this.loadEmployeToForm(id)
  }

  deleteEmployee(i){
    this.employee_list.splice(i,1)
    this.dataService.setLocalStorage(this.employee_list);
  }

}
