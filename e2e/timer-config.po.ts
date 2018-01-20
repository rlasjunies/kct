import { $, $$, by } from 'protractor';

// page
export let url = '/#timer-config';
export let title = 'timer configuration';

// navigate from
// export let urlRoot = '/';

// navigated to
export const navigatedTo_Icon = 'icon-selection';

// page components

export const iconButton$ = $('#icon');
export const iconButtonIcon$ = iconButton$.$('ion-icon');

export const timerName$ = $('ion-input.kct-input-timer-name');

export const durationOfTimerText$ = $('#durationText');
export const hoursSelector$ = $('app-hours-selector');

// export const hoursSelector_0h$ = hoursSelector$.all(by.css('input')).get(0);
export const hoursSelector_1h$ = hoursSelector$.all(by.css('input')).get(1);

export const minutesSelector$ = $('app-minutes-selector');
export const minutesSelector_30m$ = minutesSelector$.all(by.css('input')).get(2);
// export const minutesSelector_45m$ = minutesSelector$.all(by.css('input')).get(3);

export const daysSelector$ = $('app-days-selector');
export const daysSelector_mon$ = daysSelector$.$('#day1');
export const daysSelector_tue$ = daysSelector$.$('#day2');
export const daysSelector_wed$ = daysSelector$.$('#day3');
export const modalPageIconSelection = $('page-icon-selection');

export const modalPageIconSelection_title = modalPageIconSelection.$('ion-title > div');

export const modalPageIconSelection_listIcon = modalPageIconSelection.$$('.col');

export const deleteIcon = $('#delete');
export const deleteAlert = $('.alert-wrapper');
export const deleteAlert_title = deleteAlert.$('.alert-title');

export const deleteAlert_cancel = deleteAlert.$('.fakeidCancel4e2e');
