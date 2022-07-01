import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const COMPONENTS = [LoadingComponent, MessagesComponent, PageNotFoundComponent, ToolbarComponent, ConfirmationDialogComponent];
const MODULES = [FlexLayoutModule, MaterialModule, RouterModule];

@NgModule({
    declarations: [COMPONENTS],
    imports: [CommonModule, MODULES],
    exports: [MODULES, COMPONENTS],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule has already been loaded. Import this module in the AppModule.'
            );
        }
    }
}
