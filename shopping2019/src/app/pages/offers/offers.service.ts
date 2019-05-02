import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainProvider } from '../../shared/headers';

@Injectable()
export class OffersService {
  constructor(private httpClient: HttpClient) {}
  // Get Resources
  getResources() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'resources/active', { headers: MainProvider.getHttpHeader() });
  }
  // Get Resources
  // Get Services
  getServices(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'services/source/' + id + '/active', { headers: MainProvider.getHttpHeader() });
  }
  // Get Services
  // Store Offers
  storeOffers(offer) {
    console.log(offer);

    // tslint:disable-next-line:max-line-length
    return this.httpClient.post(MainProvider.baseUrl + 'offers', offer, { headers: MainProvider.getHttpHeader() });
  }
  // Store Offers
  // get Offers
  getOffers(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'offers?page=' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Offer
  // get Offer
  deleteOffer(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.delete(MainProvider.baseUrl + 'offers/' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Offer
  // get Offer
  getOffer(id) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(MainProvider.baseUrl + 'offers/' + id, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Offer
  // get Offer
  updateOffer(offerData, offerId) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put(MainProvider.baseUrl + 'offers/' + offerId, offerData, { headers: MainProvider.getHttpHeader() });
  }
  // Delete Offer
}
