import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Instance } from './instance';
import { InstanceService } from './instance.service';

import { ServerConfiguration } from '../config';
@Component({
  selector: 'instance-detail',
  templateUrl: './instance-detail.component.html',
})
export class InstanceDetailComponent implements OnInit {
  instance: Instance;
  private config= new ServerConfiguration();
  private client_url = 'https://' + this.config.frontend_url + ':' + this.config.frontend_port + '/?roomId=';
lient_url: string;
  constructor(
    private instanceService: InstanceService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) =>
      this.instanceService.getInstance(params['id'])
    )
    .subscribe(instance => this.instance = instance);
  }
  goBack(): void {
    this.location.back();
  }
  launch(): void {
    window.open(this.client_url + this.instance.name, '_blank');

  }
  destroy(): void {
    // TODO destroy launch go here, TODO also prompt warning here.
    this.route.params
    .switchMap((params: Params) =>
      this.instanceService.deleteInstance(params['id'])
    )
    .subscribe(instance => this.router.navigate(['/instances']));
  }
  start(): void {
    this.route.params
    .switchMap((params: Params) =>
      this.instanceService.startInstance(params['id'])
    )
    .subscribe(instance => this.instance = instance);
  }
  stop(): void {
    // TODO this requires active containers that have some state saved up.
    this.route.params
    .switchMap((params: Params) =>
      this.instanceService.stopInstance(params['id'])
    )
    .subscribe(instance => this.instance = instance);
  }
  share(): void {
    // TODO share code goes here.
    // EMAIL links options here would be necessary.
  }
}
