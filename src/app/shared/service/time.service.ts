import {Injectable} from "@angular/core";
import {isPast} from "date-fns";

@Injectable({
  providedIn: 'root'
})

export class TimeService {

  isInPast(date){
    return isPast(new Date(date));
  }
}
