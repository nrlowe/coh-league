import { EventTypes } from "./eventtypes";


export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}