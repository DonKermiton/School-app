import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {homeworkService} from "../homework/services/homework.service";
import {Subject} from "rxjs";
import {homeworkModel} from "./models/homework.model";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  homeworkList: homeworkModel[];
  selectedGroup = new Subject();
  group: string;
  title: string;

  showFilters = false;
  groupList = [
    '401',
    '402',
    '410',
  ];

  homeworkSortForm: FormGroup;

  constructor(private homeworkService: homeworkService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.queryParams.pipe(
      mergeMap((params: Params) => {
        if (params['group'] || params['title']) {
         this.showFilters = true;
        }
        this.title = params['title']
        this.group = params['group'];
        return this.homeworkService.getHomeworks(this.group, params['title']);
      })).subscribe((doc: any) => {
      this.homeworkList = doc;
      this.homeworkSortForm.controls['group'].patchValue(this.group)
      this.homeworkSortForm.controls['title'].patchValue(this.title)
    })

    this.homeworkSortForm = new FormGroup({
      group: new FormControl(),
      title: new FormControl(),
    })
  }

  ChangeGroup(event: Event) {
    this.selectedGroup.next((<HTMLInputElement>event.target).value);
  }

  filterHomework() {
    this.router.navigate([], {
      queryParams: {
        group: this.homeworkSortForm.value.group,
        title: this.homeworkSortForm.value.title,
      }
    })
  }
}
