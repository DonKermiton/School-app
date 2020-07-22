import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {studentsService} from "../students.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../shared/user.model";


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @Input() usersUID;
  @Input() id;



  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private afs: AngularFirestore,
              private router: Router
  ) {
  }

  ngOnInit(): void {

  }


  showUser(user: User) {
    this.studentService.studentProfile.next(user);
    console.log(user);
    this.router.navigate([user.uid], {relativeTo: this.activatedRoute})
  }
}
