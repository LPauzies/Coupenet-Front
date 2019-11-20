/**
 * Event model
 */
export class Event {
  /*
   * id of the event
   */
  id: string;
  /*
   * start date of the event like 2019-05-28T14:03:18+00:00
   */
  start_date: string;
  /*
   * end date of the event like 2019-05-28T14:03:18+00:00
   */
  end_date: string;
  /*
   * label of the event
   */
  label: string;
  /*
   * color of the event, depend on the ban status of every student in the event
   */
  color: string;
  /*
   * specify if the event is during all day long
   */
  allDay: boolean;
  /*
   * specify if the event is editable
   */
  editable: boolean;
  /*
   * id of the group
   */
  group: number;

  constructor(id: string, start_date: string, end_date: string, label: string, color?: string, group?: number) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.label = label;
    this.color = (color == undefined) ? "#ffffff" : color;
    this.group = group;
    this.allDay = false;
    this.editable = false;
  }

  /**
   * Author : Lucas Pauzies
   *
   * render this object as JSON object easily usable for full calendar framework
   *
   * @returns JSON object of Event model
   */
  public toJSON() {
    return { id: this.id, start: this.start_date, end: this.end_date, title: this.label, allDay: this.allDay, editable: this.editable, color: this.color };
  }
}
