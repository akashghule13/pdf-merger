import { Component } from '@angular/core';
import { PdfMergerService } from './pdf-merger.service';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';  

interface SelectedFile extends File {
  pageRanges?: string;
}

@Component({
  selector: 'app-pdf-merger',
  templateUrl: './pdf-merger.component.html',
  styleUrls: ['./pdf-merger.component.css'],
  standalone: true,
  imports: [CommonModule, PdfViewerModule,FormsModule],
})
export class PdfMergerComponent {
  selectedFiles: SelectedFile[] = [];
  mergedPDF: string | Uint8Array | null = null;
  errorMessage: string | null = null;
  fileSelected =0


  constructor(private pdfMergerService: PdfMergerService) {}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileSelected = 1;
    if (input.files) {
      this.selectedFiles = Array.from(input.files) as SelectedFile[];
      this.errorMessage = null;
    }
  }

  async mergePDFs(): Promise<void> {
    if (this.selectedFiles.length === 0) {
      this.errorMessage = 'No files selected.';
      return;
    }

    try {
      const mergedPdfBytes = await this.pdfMergerService.mergePDFs(
        this.selectedFiles
      );
      this.mergedPDF = this.pdfMergerService.createBlobUrl(mergedPdfBytes);
    } catch (error) {
      this.errorMessage = `An error occurred while merging PDFs: ${error}`;
    }
  }

  downloadMergedPDF(): void {
    if (!this.mergedPDF) {
      this.errorMessage = 'No merged PDF available for download.';
      return;
    }

    const link = document.createElement('a');
    link.href = this.mergedPDF as string;
    link.download = 'merged.pdf';
    link.click();
  }
}
