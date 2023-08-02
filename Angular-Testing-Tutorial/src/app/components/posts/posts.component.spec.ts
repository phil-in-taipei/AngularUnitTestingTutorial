import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostsComponent } from './posts.component';
//import { PostService } from '../../services/Post/post.service';


fdescribe('PostsComponent', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  //let fixture: ComponentFixture<PostsComponent>;

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

    //TestBed.configureTestingModule({
    //  declarations: [PostsComponent],
    //  providers: [
    //    {
     //     provide: PostService,
    //      useValue: mockPostService,
    //    },
   //   ],
    //});

    //fixture = TestBed.createComponent(PostsComponent);
    component = new PostsComponent(mockPostService);//fixture.componentInstance;
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

    it('should call the deletePosts method in postService only once', () => {
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });

    it('should remove the posts from the posts data in the component', () => {
      component.delete(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });
  });

});

  //it('should create', () => {
  //  expect(component).toBeTruthy();
  //});
  
