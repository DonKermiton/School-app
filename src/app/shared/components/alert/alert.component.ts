import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Output() closeVar = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
      this.closeVar.emit();
  }
}
