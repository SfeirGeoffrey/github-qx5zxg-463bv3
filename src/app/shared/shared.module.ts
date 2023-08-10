import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { SpecialCharacterPipe } from './special-character.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [HighlightDirective, SpecialCharacterPipe],
  exports: [HighlightDirective, SpecialCharacterPipe],
})
export class SharedModule {}
