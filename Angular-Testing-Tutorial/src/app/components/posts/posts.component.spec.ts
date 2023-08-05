import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Post } from '../../models/post.model';
import { PostsComponent } from './posts.component';
import { PostService } from '../../services/Post/post.service';
import { PostComponent } from '../post/post.component';


describe('PostsComponent', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let postService: any;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  /*
  @Component({
    selector: 'app-post',
    template: '<div></div>',
  })
  class FakePostComponent {
    @Input() post!: Post;
  } */ // note: this is for shallow test

  /*
  class mockPostService {
    getPosts() {}

    deletePost(post: Post) {
      return of(true);
    }
  } */

  beforeEach(() => {
    POSTS = [
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

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent], //FakePostComponent 
      providers: [
        {
          provide: PostService,
          useValue: mockPostService, // note: useClass for custom mock service (above)
          },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should create exact same number of Post Component with Posts', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    //ngOnInit()
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    expect(postComponentDEs.length).toEqual(POSTS.length);
  });

  it('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    for (let i = 0; i < postComponentDEs.length; i++) {
      let postComponentInstance = postComponentDEs[i]
        .componentInstance as PostComponent;
      expect(postComponentInstance.post.title).toEqual(POSTS[i].title);
    }
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });

  it('should create one post child Element for each post ', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postsElement = debugElement.queryAll(By.css('.posts'));
    expect(postsElement.length).toBe(POSTS.length);
  }); 
  

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
    });

    it('should delete a post from the posts', () => {
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });

    it('should remove the posts from the posts data in the component', () => {
      component.delete(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the deletePosts method in postService only once', () => {
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    }); 


    // below is a deep integration test where a button in a child component
    // is clicked, it iterates through each child component and tests the click
    it('should call delete method when post component delete button is clicked', () => {
      spyOn(component, 'delete');
      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
        );
      
      for (let i=0; i < postComponentDEs.length; i++) {
        postComponentDEs[i].query(By.css('button'))
        .triggerEventHandler('click', { preventDefault: () => {}});
        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }

    });

    it('should call the delete method when delete is emitted in child (PostComponent)', () => {
      spyOn(component, 'delete');
      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement
                              .queryAll(
                                By.directive(PostComponent)
                                );
      for (let i=0; i < postComponentDEs.length; i++) {
        (postComponentDEs[i].componentInstance as PostComponent).delete.emit(
          POSTS[i]
        );
        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });
  });

});

  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
  
