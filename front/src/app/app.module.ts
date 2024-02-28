import { NgModule } from '@angular/core';
import {PathLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ToastModule} from "primeng/toast";
import {
    CalendarDateFormatter,
    CalendarModule,
    CalendarNativeDateFormatter,
    DateAdapter,
    DateFormatterParams
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import localFr from '@angular/common/locales/fr'
registerLocaleData(localFr,'fr')

class CustomDateFormatter extends CalendarNativeDateFormatter{

    public override dayViewHour({date, locale}: DateFormatterParams): string {
        return new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'numeric'}).format(date)
    }

    public override weekViewHour({date, locale}: DateFormatterParams): string {
        return new Intl.DateTimeFormat(locale,{hour:'numeric',minute:'numeric'}).format(date)
    }
}

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
        ConfirmationService,
        DialogService,
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
