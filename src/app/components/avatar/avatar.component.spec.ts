import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvatarComponent, DEFAULT_NAME, DEFAULT_SIZE} from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a container', () => {
    const expectedOnline = false;
    const container = fixture.debugElement.query(By.css('.avatar'));
    expect(container).toBeTruthy();
  });

  it('should have default `name` input field', () => {
    const expectedName = DEFAULT_NAME;
    expect(component.name).toBeTruthy();
    expect(component.name).toBe(expectedName);
  });

  it('should display the first letter of the `name`', () => {
    const expectedName = DEFAULT_NAME,
      expectedLetter = expectedName[0],
      nameEl = fixture.debugElement.query(By.css('.name')).nativeElement;
    expect(nameEl).toBeTruthy();
    expect(nameEl.textContent).toMatch(expectedLetter);
  });

  it('should display the uppercased first letter of the `name`', () => {
    const expectedName = 'foo',
      expectedLetter = expectedName[0].toUpperCase();
    component.name = expectedName;
    fixture.detectChanges();

    const nameEl = fixture.debugElement.query(By.css('.name')).nativeElement;
    expect(nameEl.textContent).toBe(expectedLetter);
  });

  it('should have a status element', () => {
    const statusEl = fixture.debugElement.query(By.css('.status'));
    expect(statusEl).toBeTruthy();
  });

  it('should not have default online status', () => {
    const statusEl = fixture.debugElement.query(By.css('.status')).nativeElement;
    expect(statusEl.classList).toContain('status');
    expect(statusEl.classList).not.toContain('online');
  });

  it('should have `lineStatus` input', () => {
    expect(component.lineStatus).toBeDefined();
  });

  it('should be offline by default', () => {
    expect(component.lineStatus).toBeFalsy();
  });

  it('should contain online class when `lineStatus` input is true', () => {
    const expectedClass = 'online';
    component.lineStatus = true;
    const statusEl = fixture.debugElement.query(By.css('.status')).nativeElement;
    fixture.detectChanges();
    expect(statusEl.classList).toContain(expectedClass);
  });

  it('should have `size` input with default value', () => {
    expect(component.size).toBeDefined();
    expect(component.size).toBe(DEFAULT_SIZE);
  });

  it('should resize container', () => {
    const expectedSize = Math.round(DEFAULT_SIZE * 1.5),
      expectedSizeWithPx = expectedSize + 'px';
    component.size = expectedSize;
    component.name = 'd';
    component.lineStatus = true;
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.avatar')).nativeElement;
    fixture.detectChanges();
    expect(container.style.width).toBe(expectedSizeWithPx);
    expect(container.style.height).toBe(expectedSizeWithPx);
  });

  it('should not display status when `showStatus` is false', () => {
    component.showStatus = false;
    fixture.detectChanges();
    const statusEl = fixture.debugElement.query(By.css('.status'));
    expect(statusEl).toBeNull();
  });

  it('should be round when `round` input is true and vice versa', () => {
    component.round = true;
    const container = fixture.debugElement.query(By.css('.avatar')).nativeElement;
    fixture.detectChanges();
    expect(container.classList).toContain('round');
    component.round = false;
    fixture.detectChanges();
    expect(container.classList).not.toContain('round');
  });
});
