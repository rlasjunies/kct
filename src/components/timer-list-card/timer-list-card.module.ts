import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerListCardComponent } from './timer-list-card';
import * as components from 'components';

@NgModule({
    declarations: [
        TimerListCardComponent,
    ],
    imports: [
        IonicPageModule.forChild(TimerListCardComponent),
        components.GaugeRadialModule,
    ],
    exports: [
        TimerListCardComponent
    ]
})
export class TimerListCardModule { }
