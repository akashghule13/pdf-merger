import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(NgxExtendedPdfViewerModule)],
}).catch((err) => console.error(err));
