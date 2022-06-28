import { Injectable } from '@angular/core';
import {Leader} from "../shared/leader";
import {LEADERS} from "../shared/leaders";
import {leadingComment} from "@angular/compiler";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Promise<Leader[]>{
    return new Promise((resolve) => {
      setTimeout(()=>resolve(LEADERS),2000);
    });
  }
  getLeader(id : string ): Promise<Leader>{
    return new Promise((resolve) => {
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.id === id)[0]),2000);
    });
  }
  getFeatureLeader() : Promise<Leader>{
    return new Promise((resolve)=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2000);
    });
  }

}
