    export let STORAGEKEY_PREFIX = 'gt_';
    export let STORAGEKEY_TIMERS: string = STORAGEKEY_PREFIX + 'timers';

    export let TIMER_DURATION = 1000;
    export let TIMER_TICK_EVENT = '_tick';
    export let TIMER_OVER_1ST_TIME_EVENT = '_over_1st_time';
    export let TIMER_OVER_EVENT = '_over';
    export let TIMER_STARTED_EVENT = '_started';
    export let TIMER_STOPPED_EVENT = '_stopped';
    export let TIMER_HELD_EVENT = '_held';

    export let SOUND_OVERTIME_ALERT = 'assets/sounds/alert.m4a'; // 45610__flick3r__bounce-seq-5wav.www.freesound.org.wav";

    export let DATE_STORE_FORMAT = 'YYYY-MM-DD';

    export const EVENT_APP_PAUSE = 'app:pause';
    export const EVENT_APP_RESUME = 'app:resume';
    export const EVENT_APP_READY = 'app:ready';
