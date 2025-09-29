import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  PoAvatarModule,
  PoMenuItem,
  PoMenuModule,
  PoModule,
  PoPageModule,
  PoToolbarAction,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { SharedModule } from '../../shared/shared.module';
import { isEmpty } from 'lodash';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BranchesService } from '../../core/services/branches.service';
import { LoginService } from '../../core/services/login.service';
import { split } from 'lodash';
import { CoreService } from '../../core/services/core.service';
import { finalize, first } from 'rxjs';
import { LoginResponse } from '../../core/services/login.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoModule,
    RouterOutlet,
    SharedModule,
    FormsModule,
    PoAvatarModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  user: LoginResponse['user'] | null = null;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private branchesService: BranchesService
  ) {}

  [x: string]: any;
  readonly menus: Array<PoMenuItem> = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: 'an an-squares-four',
      shortLabel: 'Dashboard',
    },
    {
      label: 'Nova Solicitação',
      link: '/contract-management/new-request',
      icon: 'an an-git-pull-request',
      shortLabel: 'Novo Contrato',
    },
    {
      label: 'Novo Contrato',
      link: '/contract-management/contract-item/add',
      icon: 'an an-plus',
      shortLabel: 'Novo Contrato',
    },
    {
      label: 'Central de Notas',
      link: '/contract-center',
      icon: 'an an-archive',
      shortLabel: 'Central de Notas',
    },
  ];

  actions: Array<PoToolbarAction> = [
    { label: 'IGNORE', icon: 'an an-gear', action: () => {}, visible: false },
  ];

  firstBranch: string = '';
  branchesOptions: any = [];

  ngOnInit() {
    // this.onLoadBranches();

    // Inscreve-se no observable do usuário logado
    this.loginService.user$().subscribe((user) => {
      this.user = user;
      console.log(user, ' Main Layout')
    });
  }

  // private onLoadBranches() {
  //   // this.branchesOptions = this.branchesService.branches.map((branch: any) => (
  //   //   {
  //   //   label: branch.cgc,
  //   //   value: branch.code,
  //   // }));

  //   // this.firstBranch = this.branchesService.selBranch;
  // }

  onChangeBranch(branch: string): void {
    this.branchesService.selBranch = branch;
    this.firstBranch = branch;
    if (!isEmpty(split(this.router.url, '?')[1])) {
      this.router.navigate([split(this.router.url, '?')[0]]);
    } else {
      this.router.navigate([this.router.url], {
        queryParams: { refresh: new Date().getTime() },
      });
    }
  }

  // Se esta na tela principal
  isMainScreen() {
    return this.router.url.split('/').length > 2;
  }

  async logout() {
    await this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
