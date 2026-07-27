import { createAction, props } from '@ngrx/store';
import { MarketplaceListing, OrderBook } from '../../services/marketplace.service';
import { PaginatedResponse } from '../../models/pagination.model';
import { OhlcCandle, PriceChartTimeRange } from '../../models/marketplace.model';

// ─── Load Listings ────────────────────────────────────────────────────────────

export const loadListings = createAction(
  '[Marketplace] Load Listings',
  props<{
    params?: {
      page?: number;
      limit?: number;
      status?: string;
      projectId?: string;
      search?: string;
    };
  }>(),
);

export const loadListingsSuccess = createAction(
  '[Marketplace] Load Listings Success',
  props<{ response: PaginatedResponse<MarketplaceListing> }>(),
);

export const loadListingsFailure = createAction(
  '[Marketplace] Load Listings Failure',
  props<{ error: string }>(),
);

// ─── Load Order Book ──────────────────────────────────────────────────────────

export const loadOrderBook = createAction(
  '[Marketplace] Load Order Book',
  props<{ projectId: string }>(),
);

export const loadOrderBookSuccess = createAction(
  '[Marketplace] Load Order Book Success',
  props<{ orderBook: OrderBook }>(),
);

export const loadOrderBookFailure = createAction(
  '[Marketplace] Load Order Book Failure',
  props<{ error: string }>(),
);

/** Dispatched by the WebSocket effect when a live order book update arrives. */
export const updateOrderBookRealtime = createAction(
  '[Marketplace] Update Order Book Realtime',
  props<{ orderBook: OrderBook }>(),
);

// ─── Create Listing ───────────────────────────────────────────────────────────

export const createListing = createAction(
  '[Marketplace] Create Listing',
  props<{ data: { projectId: string; amount: string; price: number; expiresAt?: string } }>(),
);

export const createListingSuccess = createAction(
  '[Marketplace] Create Listing Success',
  props<{ listing: MarketplaceListing }>(),
);

export const createListingFailure = createAction(
  '[Marketplace] Create Listing Failure',
  props<{ error: string }>(),
);

// ─── Set Filters ──────────────────────────────────────────────────────────────

export const setListingsFilters = createAction(
  '[Marketplace] Set Filters',
  props<{ status?: string; projectId?: string; search?: string }>(),
);

export const setListingsPage = createAction('[Marketplace] Set Page', props<{ page: number }>());

// ─── Price History ────────────────────────────────────────────────────────────

export const loadPriceHistory = createAction(
  '[Marketplace] Load Price History',
  props<{ projectId: string; range: PriceChartTimeRange }>(),
);

export const loadPriceHistorySuccess = createAction(
  '[Marketplace] Load Price History Success',
  props<{ projectId: string; range: PriceChartTimeRange; candles: OhlcCandle[] }>(),
);

export const loadPriceHistoryFailure = createAction(
  '[Marketplace] Load Price History Failure',
  props<{ error: string }>(),
);

/** Dispatched by the WebSocket effect when a live candle update arrives. */
export const updateCandleRealtime = createAction(
  '[Marketplace] Update Candle Realtime',
  props<{ candle: OhlcCandle }>(),
);

export const setPriceChartRange = createAction(
  '[Marketplace] Set Price Chart Range',
  props<{ range: PriceChartTimeRange }>(),
);
