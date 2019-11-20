import { Input, OnInit, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';

import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

import { ScheduleService, AuthenticationService, AlumniService } from './../../_services';
import { Event } from './../../_models';

import { RootGroupDescriptionComponent } from './../../RootComponents/root-group-description/root-group-description.component';

/**
 * Author : Lucas Pauzies
 *
 * Component to display full calendar for current connected user
 *
 */
@Component({
  selector: 'app-home-schedule',
  templateUrl: './home-schedule.component.html',
  styleUrls: ['./home-schedule.component.css']
})
export class HomeScheduleComponent implements OnInit {

  calendarPlugins = [timeGridPlugin];
  locales = [frLocale];
  eventsForThisTeacher: Array<Object>;
  hasClass: boolean;
  private componentRef: any;
  private mapEventGroup: Map<number, number>;

  @ViewChild('rootgroupdescriptioncomponent', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private scheduleService: ScheduleService,
    private authenticationService: AuthenticationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private alumniService: AlumniService
  ) {

  }

  ngOnInit() {
    var currentLogin = this.authenticationService.currentUserValue.username;
    this.scheduleService.getEventsForThisTeacher(currentLogin).then(data => {
      this.mapEventGroup = new Map();
      data.forEach(
        e => this.mapEventGroup.set(+e.id,+e.group)
      );
      this.eventsForThisTeacher = data.map(
        e => new Event(e.id,e.start_date.replace("+00:00","+02:00"),e.end_date.replace("+00:00","+02:00"),e.label,"#5bb4ff",e.group).toJSON()
      );
      this.hasClass = this.eventsForThisTeacher.length != 0;
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
  }

  triggerClickEvent(event): void {
    this.createDynamicallyDescriptionForThisEvent(event);
  }

  private createDynamicallyDescriptionForThisEvent(event): void {
    var formattedEvent: Object = this.getInterestingDataFromEvent(event);
    var idClass: number = this.getIdClass(event);
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(RootGroupDescriptionComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.event = formattedEvent;
    this.componentRef.instance.idGroup = this.mapEventGroup.get(idClass);
  }

  private getInterestingDataFromEvent(event): Object {
    let id = event.el.fcSeg.eventRange.def.publicId;
    let title = event.el.fcSeg.eventRange.def.title;
    let start = event.el.fcSeg.start;
    let end = event.el.fcSeg.end;
    return { id: id, title: title, start: start, end: end };
  }

  private getIdClass(event): number {
    return +event.el.fcSeg.eventRange.def.publicId;
  }

}
