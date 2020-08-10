import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-layout-logged-component',
  templateUrl: './layout-logged-component.component.html',
  styleUrls: ['./layout-logged-component.component.css']
})
export class LayoutLoggedComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sideMenu = false;


  changeStateMenu(){
    console.log('zmiana')
    this.sideMenu = !this.sideMenu;
  }

}
