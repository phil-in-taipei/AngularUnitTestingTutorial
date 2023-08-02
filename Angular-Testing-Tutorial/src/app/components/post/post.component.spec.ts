import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { PostComponent } from './post.component';
import { Post } from '../../models/post.model';

fdescribe('PostComponent', () => {
  let fixture: ComponentFixture<PostComponent>;

  let component: PostComponent;
  //const post: Post = { id: 1, body: 'Body 1', title: 'Title 1' };
    /*
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    .compileComponents();
  }); */

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit event when the delete post is clicked', () => {
    //let component:PostComponent = new PostComponent();
    const post: Post = { id: 1, body: 'Body 1', title: 'Title 1' };
    component.post = post;

    component.delete.pipe(first()).subscribe(selectedPost  => {
      expect(selectedPost).toEqual(post);
    })

    component.onDeletePost(new MouseEvent('click'));
  });
});
