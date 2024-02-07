import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage } from '../../models/ToastMessage';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent implements OnDestroy {
  toastMessage: ToastMessage;
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.toastMessage = { message: '', type: 'success', show: false };

    this.subscription = this.toastService.toastState.subscribe(
      (state: ToastMessage) => {
        this.toastMessage = state;
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
