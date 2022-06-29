import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";
import {leadingComment} from "@angular/compiler";
import {resolve} from "@angular/compiler-cli";
import {delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Observable<Leader[] >{
    return of(LEADERS).pipe(delay(2000));

  }
  getLeader(id : string ): Observable<Leader>{
    return of(LEADERS.filter((leader)=>leader.id === id)[0]).pipe(delay(2000));
  }
  getFeatureLeader() : Observable<Leader>{
    return of(LEADERS.filter((leader)=>leader.featured)[0]).pipe(delay(2000));

  }
}
