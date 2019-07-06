import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employee_list;

  current_index;

  setLocalStorage(list){
    localStorage.setItem("employee_list",JSON.stringify(list));
  }

  getIndex(){
    let index = Number(localStorage.getItem("myIndex"))||0;
    index=index+1;
    localStorage.setItem("myIndex",String(index));
    return index;

  }
  getLocalStorage(){
    return JSON.parse(localStorage.getItem("employee_list"));
  }

  getNewId(){
    this.current_index=this.current_index+1;
    return this.current_index;
  }

  getList(){
    return this.getLocalStorage();
  }

  constructor() { }
}
