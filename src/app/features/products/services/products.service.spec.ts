import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { PRODUCTS_MOCK } from '../data/products.mock';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should return all products with no filters', () => {
    expect(service.filtered().length).toBe(PRODUCTS_MOCK.length);
  });

  it('should filter by search name', () => {
    service.updateFilters({ search: 'chair' });
    const results = service.filtered();
    expect(results.every(p =>
      p.name.toLowerCase().includes('chair') ||
      p.categories.some(c => c.toLowerCase().includes('chair'))
    )).toBeTrue();
  });

  it('should filter by collection type', () => {
    service.updateFilters({ collectionType: 'Kitchens' });
    const results = service.filtered();
    expect(results.every(p => p.categories.includes('Kitchens'))).toBeTrue();
  });

  it('should filter by price range', () => {
    service.updateFilters({ priceRange: { min: 1000, max: 2500 } });
    const results = service.filtered();
    expect(results.every(p => p.price >= 1000 && p.price <= 2500)).toBeTrue();
  });

  it('should sort by price ascending', () => {
    service.updateFilters({ sortField: 'price', sortDir: 'asc' });
    const prices = service.filtered().map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('should sort by price descending', () => {
    service.updateFilters({ sortField: 'price', sortDir: 'desc' });
    const prices = service.filtered().map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it('should sort by name ascending', () => {
    service.updateFilters({ sortField: 'name', sortDir: 'asc' });
    const names = service.filtered().map(p => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('should sort by rating descending', () => {
    service.updateFilters({ sortField: 'rating', sortDir: 'desc' });
    const ratings = service.filtered().map(p => p.rating);
    expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
  });

  it('should return search suggestions limited to 4', () => {
    service.updateFilters({ search: 'a' });
    expect(service.searchSuggestions().length).toBeLessThanOrEqual(4);
  });

  it('should return empty suggestions when search is empty', () => {
    service.updateFilters({ search: '' });
    expect(service.searchSuggestions().length).toBe(0);
  });
});
