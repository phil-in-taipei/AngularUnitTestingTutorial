import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../../models/post.model';


describe('Test Post Service with Angular HttpClient testing tools', () => {
    let postService: PostService;
    let httpTestingController: HttpTestingController;
    let POSTS: Post[] = [
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
    

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostService ]
        });

        postService = TestBed.inject(PostService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    describe('get post', () => {
      it('should return post when getPost is called', (done: DoneFn) => {
        postService.getPost(1).subscribe(data => {
          expect(data).toEqual(POSTS[0]);
          done();
      });
        const request = httpTestingController.expectOne(
          `https://jsonplaceholder.typicode.com/posts/1`
        );
        request.flush(POSTS[0]);
        expect(request.request.method).toBe('GET')
      });
    });

    describe('get posts', () => {
        it('should return posts when getPosts is called', (done: DoneFn) => {
            postService.getPosts().subscribe(data => {
                expect(data).toEqual(POSTS);
                done();
            });
            const request = httpTestingController
                                .expectOne(`https://jsonplaceholder.typicode.com/posts`);
            request.flush(POSTS);
            expect(request.request.method).toBe('GET');
        });
    });

    // only use this here is every test function makes an api call
    // otherwise just include it in the bottom of the individual
    // test functions
    afterEach(() => {
      httpTestingController.verify();
    });

});