import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../../material/menu-item.model';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styles: [],
})
export class ToolbarComponent {
    @Input() title = '';
    @Input() menuItems: MenuItem[] = [];
}
