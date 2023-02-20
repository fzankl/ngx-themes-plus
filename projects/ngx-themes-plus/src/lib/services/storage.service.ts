
import { Injectable, OnDestroy } from '@angular/core'

import { BehaviorSubject } from "rxjs";

export interface StorageIem {
  key: string;
  value: string | null;
}

@Injectable()
export class LocalStorageReferenceService {
  public get localStorage(): Storage {
    return localStorage;
  }
}

@Injectable()
export class LocalStorageService implements OnDestroy {
  private localStorage: Storage;

  private _storage$ = new BehaviorSubject<StorageIem | null>(null);
  public storage$ = this._storage$.asObservable();

  constructor(localStorageRefService: LocalStorageReferenceService) {
    this.localStorage = localStorageRefService.localStorage;

    if (window.addEventListener) {
      window.addEventListener("storage", this.handleStorageUpdate.bind(this), false);
    }
  }

  public ngOnDestroy(): void {
    window.removeEventListener("storage", this.handleStorageUpdate.bind(this), false);
  }

  private handleStorageUpdate(e: StorageEvent): void {
    if (!e || !e.key) {
      return;
    }

    this._storage$.next({
      key: e.key,
      value: e.newValue
    });
  }

  public getItem(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }
}
