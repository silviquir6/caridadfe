import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [

  ],
  declarations:
   [ImagenPipe, SafePipe
  ],
  exports: [
    ImagenPipe, SafePipe ]
})
export class PipesModule { }
