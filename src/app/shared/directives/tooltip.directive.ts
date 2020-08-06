import {ComponentRef, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {tooltipComponent} from "../components/tooltip/tooltip.component";

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') text = '';
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    const tooltipRef: ComponentRef<tooltipComponent>
      = this.overlayRef.attach(new ComponentPortal(tooltipComponent));
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseout')
  hide() {
    this.overlayRef.detach();
  }
}


