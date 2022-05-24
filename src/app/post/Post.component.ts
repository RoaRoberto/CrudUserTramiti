import { Component, OnInit } from '@angular/core';
import { MessageToast } from '../dto/MessageToast';
import { PostDto } from '../dto/PostDto';
import { PostService } from '../services/Post.service';

@Component({
  selector: 'app-post',
  templateUrl: './Post.component.html',
  styleUrls: ['./Post.component.css'],
})
export class PostComponent implements OnInit {
  posts: PostDto[] = [];
  Auth: PostDto[] = [];
  regModel: PostDto = {} as PostDto;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number = 0;
  message: MessageToast = {} as MessageToast;
  show: boolean = false;
  constructor(private postservice: PostService) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    this.posts = await this.postservice.getAllAsync();
  }

  onNew() {
    this.submitType = 'Save';
    this.regModel = {
      id: 0,
      userId: 0,
      title: '',
      body: '',
    } as PostDto;
    this.showNew = true;
  }

  async onSave() {
    if (this.submitType === 'Save') {
      try {
        const response = await this.postservice.createAsync(this.regModel);
        console.log(response);
        this.getData();
        this.showNew = false;
        this.regModel = {} as PostDto;
        this.showAlert('Success', 'Success');
      } catch (error: any) {
        console.log(error);
        this.showAlert('Error', error.error);
      }
    } else {
      try {
        const response = await this.postservice.updateAsync(
          this.regModel,
          this.regModel.id + ''
        );

        this.getData();
        this.showNew = false;
        this.regModel = {} as PostDto;
        this.showAlert('Success', 'Success');
      } catch (error: any) {
        console.log(error);
        this.showAlert('Error', error.error);
      }
    }
  }

  onEdit(id: number) {
    this.selectedRow = id;
    this.regModel = {} as PostDto;
    this.regModel = Object.assign(
      {},
      this.posts.find((i) => i.id === this.selectedRow)
    );
    this.submitType = 'Update';
    this.showNew = true;
  }

  async onDelete(id: number) {
    try {
      const response = await this.postservice.deleteAsync(id + '');
      this.getData();
      this.showAlert('Success', 'Success');
    } catch (error: any) {
      this.showAlert('Error', error.error);
    }
  }

  onCancel() {
    this.showNew = false;
  }

  showAlert(title: string, body: string) {
    if (title == 'Error') {
      this.message.class = 'bg-success text-light';
    } else if (title == 'Exito') {
      this.message.class = 'bg-danger text-light';
    } else {
      this.message.class = 'text-light';
    }
    this.message.body = body;
    this.message.title = title;
    this.show = true;
    setTimeout(() => (this.show = false), 5000);
  }
}
