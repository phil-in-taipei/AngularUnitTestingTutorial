import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync, tick } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';

describe('PostDetailComponent', () => {
  let POSTS = [
    {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    },
    {
      id: 2,
      body: 'body 2',
      title: 'title 2',
    },
    {
      id: 3,
      body: 'body 3',
      title: 'title 3',
    },
  ];
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(() => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    let mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(PostDetailComponent);
  });

});
