import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { PagesRoutingModule } from './pages/pages-routing.module'; PagesRoutingModule
@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent],
  imports: []
})
export class SharedModule {}
