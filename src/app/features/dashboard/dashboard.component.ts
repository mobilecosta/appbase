import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  PoModule,
  PoNotificationService,
  PoPageAction,
  PoPageModule,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Utils } from '../../shared/utils/utils';
import { BrowseComponent } from '../../shared/components/browse/browse.component';
import { LoginResponse, LoginService } from '../../core/services/login.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  imports: [PoPageModule, PoModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: LoginResponse['user'] | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  @ViewChild('browse', { static: true }) browse!: BrowseComponent;

  loading: WritableSignal<boolean> = signal(false);

  public readonly actions: Array<PoPageAction> = [
    {
      label: 'Atualizar',
      action: () => this.browse.refresh(),
      icon: 'an an-arrows-clockwise',
      disabled: false,
    },
  ];

  ngOnInit(): void {
    this.loginService.user$().subscribe((user) => {
      console.log(user, ' Dashboard'); // veja se email está vindo
      this.user = user;
    });
  }

  onSearchContract = (search?: any) => {
    this.browse.onSearch(search);
  };

  openColumnManager() {
    this.browse.onOpenColumnManager();
  }
  navigateToAddContract() {
    this.router.navigate(['contract-management/contract-item', 'new']);
  }
}
