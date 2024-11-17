import { Component } from '@angular/core';
import { PdfViewerComponent } from '../components/pdf-viewer/pdf-viewer.component';
import { AboutSlideComponent } from './about-slide/about-slide.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutSlideComponent, PdfViewerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
