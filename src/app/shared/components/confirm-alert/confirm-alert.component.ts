import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-alert',
  templateUrl: './confirm-alert.component.html',
  styleUrls: ['./confirm-alert.component.css']
})
export class ConfirmAlertComponent implements OnInit {
  @Input() message: string;
  @Output() decline=  new EventEmitter<void>();
  @Output() accept=  new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onDecline() {
    this.decline.emit()
  }

  onAccept() {
    this.accept.emit();
  }
}
