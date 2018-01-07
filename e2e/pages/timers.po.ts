import { $, $$ } from 'protractor';

export let url = '/#timers';
export let title = 'Kids Coaching - Timers';

export const timers$$ = $$('timer-list-card');

export const timer1$ = timers$$.first();

export const timer1Setting$ = timer1$.$('#setting');
export const addButton$ = $('button[ion-fab]');

