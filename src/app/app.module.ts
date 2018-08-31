import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { StoryComponent } from './story/story.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { BlogService } from './services/blog.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BlogObjComponent } from './blog-obj/blog-obj.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SubscribeToBlogComponent } from './subscribe-to-blog/subscribe-to-blog.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { FileSelectDirective } from '../../node_modules/ng2-file-upload';
import { AuthGuard } from './services/guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    StoryComponent,
    BlogFormComponent,
    BlogObjComponent,
    LoginComponent,
    CreateAccountComponent,
    SubscribeToBlogComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [BlogService, AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
