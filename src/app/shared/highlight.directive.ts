import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = '';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = '';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight, 'white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('', '');
  }

  private highlight(backGroundColor: string, textColor: string) {
    this.el.nativeElement.style.backgroundColor = backGroundColor;
    this.el.nativeElement.style.color = textColor;
  }
}
