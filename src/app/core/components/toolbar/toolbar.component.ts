import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../../material/menu-item.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
    @Input() isLoggedIn: boolean | null = null;
    @Input() title = '';
    @Input() menuItems: MenuItem[] = [];

    @Output() private logout = new EventEmitter();

    onLogout(): void {
        this.logout.emit();
    }

}
