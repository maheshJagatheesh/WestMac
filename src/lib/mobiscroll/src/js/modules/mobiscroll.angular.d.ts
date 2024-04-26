import { ModuleWithProviders, mobiscroll } from '../frameworks/angular';
import { MbscInputModule } from '../input.angular';
import { MbscCalendarModule, MbscCalendar, MbscCalendarOptions, MbscCalendarComponent } from '../calendar.angular';
declare class MbscModule {
    static forRoot(config: {
        angularRouter: any;
    }): ModuleWithProviders;
}
export { mobiscroll, MbscCalendar, MbscCalendarComponent, MbscCalendarOptions, MbscModule, MbscInputModule, MbscCalendarModule };
