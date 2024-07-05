import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfMergerComponent } from './pdf-merger/pdf-merger.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, PdfViewerModule, PdfMergerComponent],
})
export class AppComponent {
  title = 'pdf-merger';
}
