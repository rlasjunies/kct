import { $, $$ } from 'protractor';

export let url = '/#';
export let title = 'Kids Coaching - Timers';

export const sidebarToggle$ = $('ion-header ion-navbar button[menutoggle]');
export const sidebar$ = $('ion-menu');
export const sidebarTitle$ = $('ion-menu ion-toolbar ion-title');
export const sidebarMenus$$ = $$('ion-list button');

export const settingMenu$ = sidebarMenus$$.first();
export const aboutMenu$ = sidebarMenus$$.get(1);

