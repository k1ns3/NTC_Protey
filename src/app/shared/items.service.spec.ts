import { TestBed } from '@angular/core/testing';
import { ItemsService } from './items.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ItemsService', () => {
  let httpMock: HttpTestingController;
  let itemService: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsService],
    });

    itemService = TestBed.get(ItemsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('getJSON() should http GET items', () => {
    const items = [{ markers: {} }];

    itemService.getJSON().subscribe((res) => {
      expect(res).toEqual(items);
    });

    const req = httpMock.expectOne('./assets/data/data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(items);

    httpMock.verify();
  });
});
