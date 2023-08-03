import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';
import { PostComponent } from './post.component';
import { Post } from '../../models/post.model';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostComponent', () => {
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
      declarations: [ PostComponent ],
      schemas: [NO_ERRORS_SCHEMA], // note: temporary to supress routerLink error
    })
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post title in the anchor element', () => {
    const post: Post = {
      id: 1,
      body: 'body 1',
      title: 'title 1',
    };
    component.post = post;
    fixture.detectChanges();
    const postDebugElement: DebugElement = fixture.debugElement;
    const a = postDebugElement.query(By.css('a')).nativeElement;
    expect(a?.textContent).toContain("title 1");
  });


  it('should emit event when the delete post is clicked', () => {
    const post: Post = { id: 1, body: 'Body 1', title: 'Title 1' };
    component.post = post;

    component.delete.pipe(first()).subscribe(selectedPost  => {
      expect(selectedPost).toEqual(post);
    })

    component.onDeletePost(new MouseEvent('click'));
  });
});
