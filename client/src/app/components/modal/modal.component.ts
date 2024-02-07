import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Modal } from 'bootstrap';

declare const $: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponentold implements OnInit {
  @Input('mainTitle') mainTitle!: string;
  @Input('modalId') modalId!: string;
  @Input('modalSize') modalSize: string = 'modal-lg';
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('modal') modal!: any;

  constructor() {}

  ngOnInit() {}

  open() {
    const modal = new Modal(this.modal.nativeElement);
    if (modal) {
      modal.show();
    }
  }

  close() {
    this.closeModal.nativeElement.click();
  }
}
