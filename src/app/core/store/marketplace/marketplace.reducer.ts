import { createReducer, on } from '@ngrx/store';
import * as MarketplaceActions from './marketplace.actions';
import { MarketplaceListing, OrderBook } from '../../services/marketplace.service';
import { OhlcCandle, PriceChartTimeRange } from '../../models/marketplace.model';

export interface MarketplaceState {
  listings: MarketplaceListing[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  /** Active filter values applied to the current listings query. */
  filters: { status?: string; projectId?: string; search?: string };
  orderBook: OrderBook | null;
  /** True while listings or order book fetch is in flight. */
  loading: boolean;
  /** True while create-listing mutation is in flight. */
  creating: boolean;
  error: string | null;

  // ── Price history ──────────────────────────────────────────────────────────
  /** OHLC candles for the active chart view. */
  priceHistory: OhlcCandle[];
  /** Active time range selection in the price chart. */
  priceChartRange: PriceChartTimeRange;
  /** True while price history fetch is in flight. */
  priceHistoryLoading: boolean;
  priceHistoryError: string | null;
}

const initialState: MarketplaceState = {
  listings: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  filters: {},
  orderBook: null,
  loading: false,
  creating: false,
  error: null,

  priceHistory: [],
  priceChartRange: '24H',
  priceHistoryLoading: false,
  priceHistoryError: null,
};

export const marketplaceReducer = createReducer(
  initialState,

  // ── Load Listings ───────────────────────────────────────────────────────────
  on(MarketplaceActions.loadListings, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(MarketplaceActions.loadListingsSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    listings: response.data,
    total: response.total,
    page: response.page,
    limit: response.limit,
    totalPages: response.totalPages,
  })),
  on(MarketplaceActions.loadListingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Load Order Book ─────────────────────────────────────────────────────────
  on(MarketplaceActions.loadOrderBook, (state) => ({
    ...state,
    loading: true,
    orderBook: null,
    error: null,
  })),
  on(MarketplaceActions.loadOrderBookSuccess, (state, { orderBook }) => ({
    ...state,
    loading: false,
    orderBook,
  })),
  on(MarketplaceActions.loadOrderBookFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  /** Replaces the entire order book with a fresh WebSocket snapshot. */
  on(MarketplaceActions.updateOrderBookRealtime, (state, { orderBook }) => ({
    ...state,
    orderBook,
  })),

  // ── Create Listing ──────────────────────────────────────────────────────────
  on(MarketplaceActions.createListing, (state) => ({
    ...state,
    creating: true,
    error: null,
  })),
  on(MarketplaceActions.createListingSuccess, (state, { listing }) => ({
    ...state,
    creating: false,
    listings: [listing, ...state.listings],
    total: state.total + 1,
  })),
  on(MarketplaceActions.createListingFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error,
  })),

  // ── Filters / Pagination ────────────────────────────────────────────────────
  on(MarketplaceActions.setListingsFilters, (state, { status, projectId, search }) => ({
    ...state,
    filters: { status, projectId, search },
    page: 1,
  })),
  on(MarketplaceActions.setListingsPage, (state, { page }) => ({
    ...state,
    page,
  })),

  // ── Price History ───────────────────────────────────────────────────────────
  on(MarketplaceActions.loadPriceHistory, (state) => ({
    ...state,
    priceHistoryLoading: true,
    priceHistoryError: null,
  })),
  on(MarketplaceActions.loadPriceHistorySuccess, (state, { candles }) => ({
    ...state,
    priceHistoryLoading: false,
    priceHistory: candles,
  })),
  on(MarketplaceActions.loadPriceHistoryFailure, (state, { error }) => ({
    ...state,
    priceHistoryLoading: false,
    priceHistoryError: error,
  })),
  /**
   * Upserts a single candle that arrived via WebSocket.
   * If a candle with the same `time` already exists it is replaced (live
   * candle update); otherwise the new candle is appended.
   */
  on(MarketplaceActions.updateCandleRealtime, (state, { candle }) => {
    const existing = state.priceHistory.findIndex((c) => c.time === candle.time);
    const priceHistory =
      existing >= 0
        ? state.priceHistory.map((c, i) => (i === existing ? candle : c))
        : [...state.priceHistory, candle];
    return { ...state, priceHistory };
  }),
  on(MarketplaceActions.setPriceChartRange, (state, { range }) => ({
    ...state,
    priceChartRange: range,
    priceHistory: [],
  })),
);
