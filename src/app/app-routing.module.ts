import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { StoryComponent } from './story/story.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { SubscribeToBlogComponent } from './subscribe-to-blog/subscribe-to-blog.component';
import { AuthGuard } from './services/guard.service';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BeforeComponent } from './before/before.component';
import { ThereComponent } from './there/there.component';
import { HotspotsComponent } from './hotspots/hotspots.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'about', component: AboutComponent },
    { path: 'story', component: StoryComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateAccountComponent },
    { path: 'postblog', component: BlogFormComponent, canActivate: [AuthGuard] },
    { path: 'subscribe', component: SubscribeToBlogComponent },
    { path: 'editblog/:id', component: EditBlogComponent, canActivate: [AuthGuard] },
    { path: 'blogdetail/:id', component: BlogDetailComponent, canActivate: [AuthGuard] },
    { path: 'before', component: BeforeComponent },
    { path: 'there', component: ThereComponent },
    { path: 'hotspots', component: HotspotsComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
