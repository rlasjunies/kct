import { EventsBroadcasterProvider } from './events-broadcaster';

let events: EventsBroadcasterProvider;

describe('event-broadcaster:', () => {

    beforeEach(() => {
        events = new EventsBroadcasterProvider();
    });

    it('should emit 1 event', () => {
        const obj = {
            toBeCalled: () => { }
        };
        spyOn(obj, 'toBeCalled').and.callThrough();

        events.subscribe('test', obj.toBeCalled);
        events.publish('test', null);

        expect(obj.toBeCalled).toHaveBeenCalled();
    });

    it('should emit 2 events when subscribe twice', () => {
        const obj = {
            toBeCalled: () => { }
        };
        spyOn(obj, 'toBeCalled').and.callThrough();

        events.subscribe('test', obj.toBeCalled);
        events.subscribe('test', obj.toBeCalled);
        events.publish('test', null);

        expect(obj.toBeCalled).toHaveBeenCalledTimes(2);
    });

    it('should emit once if there are others events', () => {
        const obj = {
            toBeCalled: () => { }
        };
        spyOn(obj, 'toBeCalled').and.callThrough();

        events.subscribe('test', obj.toBeCalled);
        events.subscribe('test1', obj.toBeCalled);
        events.subscribe('test2', obj.toBeCalled);
        events.publish('test', null);

        expect(obj.toBeCalled).toHaveBeenCalledTimes(1);
    });

    it('should NOT emit once when unsubcribed', () => {
        const obj = {
            toBeCalled: () => { }
        };
        spyOn(obj, 'toBeCalled').and.callThrough();

        events.subscribe('test', obj.toBeCalled);
        events.subscribe('test1', obj.toBeCalled);
        events.subscribe('test2', obj.toBeCalled);
        events.unsubscribe('test', obj.toBeCalled);
        events.publish('test', null);

        expect(obj.toBeCalled).toHaveBeenCalledTimes(0);
    });
});