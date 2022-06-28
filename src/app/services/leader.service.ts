import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";
import {leadingComment} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Promise<Leader[]>{
    return Promise.resolve(LEADERS);
  }
  getLeader(id : string ): Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader) => id === leader.id)[0]);
  }
  getFeatureLeader() : Promise<Leader>{
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
