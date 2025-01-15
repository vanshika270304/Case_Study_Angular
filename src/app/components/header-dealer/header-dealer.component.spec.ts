import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDealerComponent } from './header-dealer.component';

describe('HeaderDealerComponent', () => {
  let component: HeaderDealerComponent;
  let fixture: ComponentFixture<HeaderDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDealerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
