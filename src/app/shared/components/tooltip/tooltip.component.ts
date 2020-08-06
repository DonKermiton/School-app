import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'tooltip-component',
  styleUrls: ['./tooltip.component.css'],
  templateUrl: './tooltip.component.html',
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class tooltipComponent{
  @Input() text = 'test'
}
