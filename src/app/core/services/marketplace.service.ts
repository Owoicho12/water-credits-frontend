import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginatedResponse } from '../models/pagination.model';
import {
  MarketplaceListing,
  CreateListingRequest,
  OrderBook,
  PriceHistoryResponse,
  PriceChartTimeRange,
} from '../models/marketplace.model';

// Re-export for backward-compat with existing store files that import from here.
export type { MarketplaceListing, CreateListingRequest, OrderBook } from '../models/marketplace.model';
export type { OrderBookEntry } from '../models/marketplace.model';

@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  constructor(private api: ApiService) {}

  async getListings(params?: {
    page?: number;
    limit?: number;
    status?: string;
    projectId?: string;
    search?: string;
  }): Promise<PaginatedResponse<MarketplaceListing>> {
    return this.api.get<PaginatedResponse<MarketplaceListing>>('/marketplace/listings', { params });
  }

  async getListing(id: string): Promise<MarketplaceListing> {
    return this.api.get<MarketplaceListing>(`/marketplace/listings/${id}`);
  }

  async createListing(data: CreateListingRequest): Promise<MarketplaceListing> {
    return this.api.post<MarketplaceListing>('/marketplace/listings', data);
  }

  async cancelListing(id: string): Promise<void> {
    return this.api.post<void>(`/marketplace/listings/${id}/cancel`);
  }

  async getOrderBook(projectId: string): Promise<OrderBook> {
    return this.api.get<OrderBook>(`/marketplace/orderbook/${projectId}`);
  }

  /**
   * Fetch OHLC price history candles for a project's credits.
   *
   * @param projectId  The project whose credit price history to fetch.
   * @param range      Time window: 1H | 6H | 24H | 7D | 30D.
   */
  async getPriceHistory(projectId: string, range: PriceChartTimeRange): Promise<PriceHistoryResponse> {
    return this.api.get<PriceHistoryResponse>(`/marketplace/prices/${projectId}`, {
      params: { range },
    });
  }
}
