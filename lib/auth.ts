// lib/auth.ts
interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
}

// Mock users store (for demo purposes)
const users: User[] = [];

export const auth = {
  register: async (email: string, password: string, name?: string) => {
    // Check if user exists
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    // In a real app, you'd hash the password
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
    };

    users.push(user);
    return { id: user.id, email: user.email, name: user.name };
  },

  login: async (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return { id: user.id, email: user.email, name: user.name };
  },
};
