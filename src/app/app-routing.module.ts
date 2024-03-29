import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/Post.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Users',
    component: UserComponent
  },
  {
    path: 'Post',
    component: PostComponent
  },
  {
    path: 'Auth',
    component: AuthComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
