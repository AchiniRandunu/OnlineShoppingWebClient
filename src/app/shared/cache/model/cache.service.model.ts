export interface CacheService {

  /// get item
  getItem(key: string): any;

  /// set item
  setItem(key: string, value: any, exMins?: number): boolean;

  /// clear item
  clearItem(key: string): boolean;
}
