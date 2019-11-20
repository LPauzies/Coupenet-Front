import { OnInit, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, ElementRef } from '@angular/core';

import { RootGroupScheduleComponent } from './../root-group-schedule/root-group-schedule.component';

import { GroupService, AuthenticationService } from './../../_services';
import { Group } from './../../_models';

/**
 * Author : Lucas Pauzies
 *
 * Component to display group selection
 *
 */
@Component({
  selector: 'app-root-group-search',
  templateUrl: './root-group-search.component.html',
  styleUrls: ['./root-group-search.component.css']
})
export class RootGroupSearchComponent implements OnInit {

  groupList: Array<Group>;
  selectedGroup: Group;
  globalGroupList: Array<Group>;
  selectedGlobalGroup: Group;
  private componentRef: any;

  @ViewChild('rootgroupschedulecomponent', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private groupService: GroupService,
    private authenticationService: AuthenticationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.groupService.getAllGlobalGroups().then(data => {
      this.globalGroupList = data.map(
        e => new Group(e.id, e.label)
      );
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });
    this.groupService.getAllGroups().then(data => {
      this.groupList = data.map(
        e => new Group(e.id, e.label, e.arel_id)
      );
    }).catch(error => {
      if (error.status == 401) {
        this.authenticationService.tokenExpires();
      }
    });

  }

  /**
   * Author : Lucas Pauzies
   *
   * @param {Group} group The group used to generate schedule
   *
   * Create schedule for the group as input
   */
  createDynamicallyScheduleForThisGroup(group: Group) {
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(RootGroupScheduleComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.group = group;
  }

  /**
   * Author : Lucas Pauzies
   *
   * @param {Group} group The group used to generate schedule
   *
   * Create schedule for the group as input
   */
  createDynamicallyScheduleForThisGlobalGroup(group: Group) {
    this.entry.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(RootGroupScheduleComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.group = group;
    this.componentRef.instance.isGlobalGroup = true;
  }

  unselectGroup() {
    this.elementRef.nativeElement.querySelector("#groupSchedule").selectedIndex = "0";
  }

  unselectGlobalGroup() {
    this.elementRef.nativeElement.querySelector("#groupGlobalSchedule").selectedIndex = "0";
  }

}
