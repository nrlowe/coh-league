import { Component, OnDestroy, TemplateRef  } from '@angular/core';
import { ToastService } from '../services/toast-service';


@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy {
	constructor(public toastService: ToastService) {}
  toast : any;
  toasts : any[] = [];
  showToast : boolean = false;
  isTemplate(toast : any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

	showStandard() {
		this.toastService.show('I am a standard toast');
	}

	showSuccess() {
		this.toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
	}

	ngOnDestroy(): void {
		this.toastService.clear();
	}
}
