import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync, tick } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';

fdescribe('PostDetailComponent', () => {
  let postService: any;
  let location: any;
  let route: any;

  /*
  let mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          return '3';
        }
      }
    }
  };
  let mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
  let mockLocation = jasmine.createSpyObj(['back']);
  */
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
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let el: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };
    let mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    await TestBed.configureTestingModule({
      declarations: [ PostDetailComponent ],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService},
        { provide: ActivatedRoute, useValue: mockActivatedRoute  }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    postService = TestBed.inject(PostService);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    postService.getPost.and.returnValue(of(POSTS[2]));
    location.back.and.returnValue('');
    fixture.detectChanges();
  });

  it('should render the post title in the h2 template',() => {
    const element = el.query(By.css('h2')).nativeElement as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});