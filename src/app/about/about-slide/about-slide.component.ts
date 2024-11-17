import { Component, ElementRef, input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about-slide',
  standalone: true,
  imports: [],
  templateUrl: './about-slide.component.html',
  styleUrl: './about-slide.component.scss',
})
export class AboutSlideComponent implements OnInit {
  title = input.required<string>();
  background = input.required<string>();
  titleFlip = input<boolean>();
  description = input<string>();
  image1 = input<string>();
  image2 = input<string>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.background) {
      this.renderer.setStyle(
        this.el.nativeElement,
        '--background-image-url',
        `url(${this.background})`
      );
    }
    if (this.titleFlip()) {
      this.renderer.setStyle(this.el.nativeElement, '.title.margin-left', 0);
    }
  }
}
