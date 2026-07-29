import { createAction, props } from '@ngrx/store';

export const toggleSidebar = createAction('[UI] Toggle Sidebar');
export const setDarkMode = createAction('[UI] Set Dark Mode', props<{ isDark: boolean }>());
export const setLoading = createAction('[UI] Set Loading', props<{ isLoading: boolean }>());

export const addNotification = createAction(
  '[UI] Add Notification',
  props<{
    id: string;
    notificationType: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
    duration?: number;
  }>(),
);
export const removeNotification = createAction('[UI] Remove Notification', props<{ id: string }>());
export const markNotificationsRead = createAction('[UI] Mark Notifications Read');

export const setRouteError = createAction(
  '[UI] Set Route Error',
  props<{ error: '404' | '500' | '403' | 'offline' | null }>()
);
export const clearRouteError = createAction('[UI] Clear Route Error');
