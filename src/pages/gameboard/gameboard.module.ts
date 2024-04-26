import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameboardPage } from './gameboard';

@NgModule({
  declarations: [
    GameboardPage,
  ],
  imports: [
    IonicPageModule.forChild(GameboardPage),
  ],
})
export class GameboardPageModule {}
