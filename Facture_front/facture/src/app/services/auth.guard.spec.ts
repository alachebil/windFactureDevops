import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './AuthService';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
       imports: [
        HttpClientTestingModule,  // <-- Ajoute ceci pour fournir HttpClient
        RouterTestingModule       // <-- Souvent nécessaire pour les tests de garde avec routing
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  function createMockState(url: string): RouterStateSnapshot {
    return { url } as RouterStateSnapshot;
  }

  it('should allow access when authenticated and route is allowed', () => {
    authServiceMock.isAuthenticated.and.returnValue(true);
    localStorage.setItem('role', 'System');
    const result = guard.canActivate({} as ActivatedRouteSnapshot, createMockState('/system'));
    expect(result).toBeTrue();
  });

  it('should redirect to 404 when role is PARTNER accessing /system', () => {
    authServiceMock.isAuthenticated.and.returnValue(true);
    localStorage.setItem('role', 'PARTNER');
    const result = guard.canActivate({} as ActivatedRouteSnapshot, createMockState('/system'));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/404']);
    expect(result).toBeTrue(); // toujours true même si redirection, selon ton code
  });

  it('should deny access when not authenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(false);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, createMockState('/home'));
    expect(routerMock.navigate).toHaveBeenCalledWith(['/404']);
    expect(result).toBeFalse();
  });
});
