import {Component} from '@angular/core';
import {
    CalendarCommonModule,
    CalendarDayModule,
    CalendarEvent,
    CalendarMonthModule,
    CalendarView,
    CalendarWeekModule
} from "angular-calendar";
import {ButtonModule} from "primeng/button";
import {NgClass, NgSwitch, NgSwitchCase} from "@angular/common";
import {isPast, isSameDay, isSameMonth} from "date-fns";
import {Subject} from "rxjs";
import {getProfileStorage} from "../../../../api-request";
import {AppointmentService} from "../../../utils/services/customer/appointment.service";
// @ts-ignore
import moment from "moment";



@Component({
  selector: 'app-mcalendar',
  standalone: true,
    imports: [
        CalendarWeekModule,
        CalendarCommonModule,
        ButtonModule,
        CalendarMonthModule,
        CalendarDayModule,
        NgSwitch,
        NgSwitchCase,
        NgClass
    ],
  templateUrl: './mcalendar.component.html',
  styleUrl: './mcalendar.component.scss'
})
export class McalendarComponent {
    profile:any
    viewDate = new Date()
    view:CalendarView = CalendarView.Week
    calendarView = CalendarView
    activeDayIsOpen = false
    refresh = new Subject<void>()

    events:CalendarEvent[] = []
    constructor(private service : AppointmentService) {
        this.profile = getProfileStorage()
        this.loadAppointement()
    }

    loadAppointement(){
        this.service.calendar(this.profile.role,this.profile.id,this.view.toString(),this.viewDate.toISOString())
            .subscribe((next)=>{
                console.log(next)
                this.events = next?.map(appointment => {
                    const totalMinutes = appointment.services?.reduce((total, service) => {
                        return total + service.duration;
                    }, 0);
                    const details = appointment.services?.map(service => {
                        return `Service: ${service.name}, Employé: ${service.emp?.name} <br>`;
                    });
                    const start = moment(appointment.date);
                    const end = moment(start).add(totalMinutes, 'minutes');
                    return {
                        id:appointment._id,
                        title: `Client: ${appointment.customer?.name} <br> detail: ${details}`,
                        start: start.toDate(),
                        end: end.toDate(),
                        draggable: !isPast(start.toDate()),
                        resizable: {
                            beforeStart: true,
                            afterEnd: false
                        },
                        meta: {
                            details: details
                        }
                        // color: {
                        //     primary: '#ad2121',
                        //     secondary: '#FAE3E3'
                        // }
                    };
                })
            });
    }
    setView(calendar:CalendarView){
        this.view = calendar
        this.loadAppointement()
    }
    viewDateChanged(){
        console.log(this.viewDate)
        console.log(this.view)
        this.loadAppointement()
    }
    dayClicked({date, events}:{date:Date, events:CalendarEvent[]}){
        if (isSameMonth(date,this.viewDate)){
            this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
            this.viewDate = date
        }
    }
    eventClicked(event:any){
        console.log(event)
    }
    eventTimesChanged(event:any){
        event.event.start = event.newStart
        event.event.end = event.newEnd
        console.log(event)
        const form = {
            start : event.newStart.toString(),
            end: event.newEnd.toISOString()
        }
        this.service.updateDateEvent(event.event.id,form)
            .subscribe((next)=>{
                console.log('nety')
            })
        this.refresh.next()
    }
    protected readonly CalendarView = CalendarView;
}
