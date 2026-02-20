import { create } from "zustand";

const useStore = create((set) => ({

  status: "disconnected",

  metric: 0,

  notifications: [],

  setStatus: (status) => set({ status }),

  setMetric: (value) => set({ metric: value }),

  addNotification: (notification) =>
    set((state) => {
      // Ensure notification has required fields
      const newNotification = {
        id: notification.id || `notification-${Date.now()}-${Math.random()}`,
        title: notification.title || "Notification",
        message: notification.message || "",
        ...notification,
      };
      // Double-check ID is unique, if not generate a new one
      if (state.notifications.some(n => n.id === newNotification.id)) {
        newNotification.id = `notification-${Date.now()}-${Math.random()}`;
      }
      
      return {
        notifications: [...state.notifications, newNotification],
      };
    }),

  removeNotification: (id) =>
    set((state) => {
      const filtered = state.notifications.filter((n) => n.id !== id);
      return {
        notifications: filtered,
      };
    }),

  clearNotifications: () => set((state) => {
    return { notifications: [] };
  }),

}));

export default useStore;