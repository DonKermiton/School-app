import { TestBed } from '@angular/core/testing';

import { LogInInterceptorInterceptor } from './log-in-interceptor.interceptor';

describe('LogInInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogInInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogInInterceptorInterceptor = TestBed.inject(LogInInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
