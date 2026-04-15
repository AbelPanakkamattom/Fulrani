// Simple localStorage-based store for demo admin functionality
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

export interface VideoPost {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  date: string;
}

export interface ImagePost {
  id: string;
  title: string;
  url: string;
  caption: string;
  category: string;
  date: string;
}

const ADMIN_CREDENTIALS = { email: "admin@fulrani.com", password: "fulrani2024" };

export const authStore = {
  login: (email: string, password: string): boolean => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem("fulrani_admin", "true");
      return true;
    }
    return false;
  },
  logout: () => localStorage.removeItem("fulrani_admin"),
  isLoggedIn: () => localStorage.getItem("fulrani_admin") === "true",
};

function getItems<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function setItems<T>(key: string, items: T[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

export const blogStore = {
  getAll: (): BlogPost[] => getItems("fulrani_blogs"),
  add: (post: Omit<BlogPost, "id" | "date">) => {
    const items = getItems<BlogPost>("fulrani_blogs");
    items.unshift({ ...post, id: crypto.randomUUID(), date: new Date().toISOString() });
    setItems("fulrani_blogs", items);
  },
  update: (id: string, post: Partial<BlogPost>) => {
    const items = getItems<BlogPost>("fulrani_blogs").map(i => i.id === id ? { ...i, ...post } : i);
    setItems("fulrani_blogs", items);
  },
  delete: (id: string) => {
    setItems("fulrani_blogs", getItems<BlogPost>("fulrani_blogs").filter(i => i.id !== id));
  },
};

export const videoStore = {
  getAll: (): VideoPost[] => getItems("fulrani_videos"),
  add: (post: Omit<VideoPost, "id" | "date">) => {
    const items = getItems<VideoPost>("fulrani_videos");
    items.unshift({ ...post, id: crypto.randomUUID(), date: new Date().toISOString() });
    setItems("fulrani_videos", items);
  },
  update: (id: string, post: Partial<VideoPost>) => {
    const items = getItems<VideoPost>("fulrani_videos").map(i => i.id === id ? { ...i, ...post } : i);
    setItems("fulrani_videos", items);
  },
  delete: (id: string) => {
    setItems("fulrani_videos", getItems<VideoPost>("fulrani_videos").filter(i => i.id !== id));
  },
};

export const imageStore = {
  getAll: (): ImagePost[] => getItems("fulrani_images"),
  add: (post: Omit<ImagePost, "id" | "date">) => {
    const items = getItems<ImagePost>("fulrani_images");
    items.unshift({ ...post, id: crypto.randomUUID(), date: new Date().toISOString() });
    setItems("fulrani_images", items);
  },
  update: (id: string, post: Partial<ImagePost>) => {
    const items = getItems<ImagePost>("fulrani_images").map(i => i.id === id ? { ...i, ...post } : i);
    setItems("fulrani_images", items);
  },
  delete: (id: string) => {
    setItems("fulrani_images", getItems<ImagePost>("fulrani_images").filter(i => i.id !== id));
  },
};
