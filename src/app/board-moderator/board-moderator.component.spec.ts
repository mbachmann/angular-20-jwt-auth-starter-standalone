import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModeratorComponent } from './board-moderator.component';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BoardModeratorComponent', () => {
  let component: BoardModeratorComponent;
  let fixture: ComponentFixture<BoardModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BoardModeratorComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(BoardModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
