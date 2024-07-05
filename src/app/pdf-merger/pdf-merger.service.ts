import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

interface SelectedFile extends File {
  pageRanges?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfMergerService {
  async mergePDFs(selectedFiles: SelectedFile[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();

    for (const file of selectedFiles) {
      await this.addPagesFromPDF(file, mergedPdf);
    }

    return await mergedPdf.save();
  }

  private async addPagesFromPDF(
    file: SelectedFile,
    mergedPdf: PDFDocument
  ): Promise<void> {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);

    const pagesToCopy = this.getPageNumbers(
      file.pageRanges,
      pdf.getPageCount()
    );
    const copiedPages = await mergedPdf.copyPages(pdf, pagesToCopy);

    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  private getPageNumbers(
    pageRanges: string | undefined,
    pageCount: number
  ): number[] {
    if (!pageRanges) {
      return Array.from({ length: pageCount }, (_, i) => i);
    }

    const ranges = pageRanges.split(',').map((range) => range.trim());
    const pageNumbers = new Set<number>();

    for (const range of ranges) {
      const [start, end] = range.split('-').map(Number);
      if (isNaN(start)) continue;

      if (isNaN(end) || start === end) {
        pageNumbers.add(start - 1);
      } else {
        for (let i = start; i <= end; i++) {
          pageNumbers.add(i - 1);
        }
      }
    }

    return Array.from(pageNumbers).filter(
      (page) => page >= 0 && page < pageCount
    );
  }

  createBlobUrl(bytes: Uint8Array): string {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }
}
