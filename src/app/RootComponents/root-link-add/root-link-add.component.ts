import { Component, OnInit } from '@angular/core';

import { GroupService } from '../../_services';

@Component({
  selector: 'app-root-link-add',
  templateUrl: './root-link-add.component.html',
  styleUrls: ['./root-link-add.component.css']
})
export class RootLinkAddComponent implements OnInit {

  hasError: boolean;

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.hasError = false;
  }

  addGlobalGroup(globalGroup: string) {
    if (globalGroup == "") {
      this.hasError = true;
    } else {
      this.groupService.addGlobalGroup(globalGroup);
      setTimeout('location.reload(true)', 100);
    }
  }

}
