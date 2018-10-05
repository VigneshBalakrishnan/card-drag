import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DataObjectService } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [DataObjectService],
  bootstrap: [AppComponent]
})
export class AppModule {}
