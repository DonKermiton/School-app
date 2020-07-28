import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
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

  selectedGroup: string;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: studentsService,
              private afs: AngularFirestore,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param: Params) => {
      this.selectedGroup = param.group;
    });


    }

  showUser(user: User) {
    this.studentService.studentProfile.next(user);

    this.router.navigate([user.uid], {relativeTo: this.activatedRoute, queryParams: {group: this.selectedGroup}});
  }
}
