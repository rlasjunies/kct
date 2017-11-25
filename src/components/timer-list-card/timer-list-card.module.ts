import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerListCard } from './timer-list-card';
import * as components from 'components';

@NgModule({
    declarations: [
        TimerListCard,
    ],
    imports: [
        IonicPageModule.forChild(TimerListCard),
        components.GaugeRadialModule,
    ],
    exports: [
        TimerListCard
    ]
})
export class TimerListCardModule { }
