import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { Post } from '../../models/post.model';
import { of } from 'rxjs';


describe('PostService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: PostService;
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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    TestBed.configureTestingModule({
      providers: [PostService, 
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected posts when getPosts is called', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(POSTS));
    service.getPosts().subscribe({
      next: (posts) => {
        expect(posts).toEqual(POSTS);
        done();
      }, error: () => {
        done.fail
        console.log('there was an error!');
      }
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
