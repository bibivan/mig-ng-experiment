import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PreloaderComponent } from './preloader.component'


@NgModule({
  declarations: [PreloaderComponent],
  exports: [
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class PreloaderModule {}
