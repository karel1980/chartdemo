import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SortablePieComponent} from './sortable-pie/sortable-pie.component';
import {SortablePieLegendComponent} from './sortable-pie-legend/sortable-pie-legend.component';
import {GroupedStacksComponent} from './grouped-stacks/grouped-stacks.component';
import {HelloComponent} from './hello/hello.component';
import {Route, RouterModule} from "@angular/router";


const routes: Route[] = [
  { path: '',
    pathMatch: 'full',
    component: HelloComponent
  },
  { path: 'pie',
    component: SortablePieComponent
  },
  { path: 'stacks',
    component: GroupedStacksComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SortablePieComponent,
    SortablePieLegendComponent,
    GroupedStacksComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
