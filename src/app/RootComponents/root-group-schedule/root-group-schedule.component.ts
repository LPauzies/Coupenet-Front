import { Input, OnInit, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';

import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

import { ScheduleService, AuthenticationService } from './../../_services';
import { Event, Group } from './../../_models';

import { RootGroupDescriptionComponent } from './../root-group-description/root-group-description.component';

/**
 * Author : Lucas Pauzies
 *
 * Component to display full calendar for the current group
 *
 */
@Component({
  selector: 'app-root-group-schedule',
  templateUrl: './root-group-schedule.component.html',
  styleUrls: ['./root-group-schedule.component.css']
})
export class RootGroupScheduleComponent implements OnInit {

  calendarPlugins = [timeGridPlugin];
  locales = [frLocale];
  private eventsForThisGroup: Array<Object>;
  private componentRef: any;
  private currentGroup: number;
  private mapEventGroup: Object;

  @ViewChild('rootgroupdescriptioncomponent', {read: ViewContainerRef}) entry: ViewContainerRef;

  @Input() isGlobalGroup: boolean;
  @Input() group: Group;
  constructor(
    private scheduleService: ScheduleService,
    private authenticationService: AuthenticationService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.mapEventGroup = {};
    if (this.isGlobalGroup == undefined) {
      this.scheduleService.getEventsForAGroup(this.group.id).then(data => {
        this.eventsForThisGroup = data.map(
          e => new Event(e.id,e.start_date.replace("+00:00","+02:00"),e.end_date.replace("+00:00","+02:00"),e.label,"#5bb4ff").toJSON()
        )
      }).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    } else {
      this.scheduleService.getEventsForAGlobalGroup(this.group.id).then(data => {
        this.eventsForThisGroup = data.map(
          e => new Event(e.id,e.start_date.replace("+00:00","+02:00"),e.end_date.replace("+00:00","+02:00"),e.label,"#5bb4ff").toJSON()
        );
        data.forEach(e => this.mapEventGroup[e.id.toString()] = +e.group);
      }).catch(error => {
        if (error.status == 401) {
          this.authenticationService.tokenExpires();
        }
      });
    }

  }

  /**
   * Author : Lucas Pauzies
   *
   * @param {Object} event The event object captured from click event
   *
   * Create description for the clicked event
   */
  triggerClickEvent(event) {
    this.createDynamicallyDescriptionForThisEvent(event);
  }

  private createDynamicallyDescriptionForThisEvent(event) {
    var formattedEvent = this.getInterestingDataFromEvent(event);
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(RootGroupDescriptionComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.event = formattedEvent;
    if (this.isGlobalGroup == undefined) {
      this.componentRef.instance.idGroup = this.group.id;
    } else {
      this.componentRef.instance.idGroup = +this.mapEventGroup[formattedEvent.id.toString()];
    }
  }

  private getInterestingDataFromEvent(event) {
    let id = event.el.fcSeg.eventRange.def.publicId;
    let title = event.el.fcSeg.eventRange.def.title;
    let start = event.el.fcSeg.start;
    let end = event.el.fcSeg.end;
    return { id: id, title: title, start: start, end: end };
  }

}
