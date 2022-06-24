import {Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {ContactComponent} from "../contact/contact.component";
import {AboutComponent} from "../about/about.component";
import {MenuComponent} from "../menu/menu.component";

export const routes : Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'contact', component : ContactComponent},
  {path: 'aboutus', component: AboutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
