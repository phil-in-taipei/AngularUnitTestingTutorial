import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync, tick } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


// this is the setup in the Youtube tutorial, which is different thatn
// the approach generated by the CLI with both an async and non-async beforeEach function
// It's possible he didn't finish the Yotube tutorial series, and would have explained
// why he used this non-standar approach
fdescribe('PostDetailComponent', () => {
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
  let mockPostService: jasmine.SpyObj<PostService>

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

    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(PostDetailComponent);
  });

  it('should render the post title in the h2 template', () => {
    mockPostService.getPost.and.returnValue(of(POSTS[2]));
    fixture.detectChanges();
    const element = fixture.debugElement.query(
      By.css('h2')
      ).nativeElement as HTMLElement;
    expect(element.textContent).toBe(POSTS[2].title);
  });

});
