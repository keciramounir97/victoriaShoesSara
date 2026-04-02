import { create } from "zustand";
import { persist } from "zustand/middleware";

// Données fake (utilisateurs simulés)
const fakeUsers = [
  {
    id: 1,
    name: "Sarah Benali",
    email: "sarah@example.com",
    password: "123456",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 2,
    name: "Karim Amrani",
    email: "karim@example.com",
    password: "password",
    avatar: "https://i.pravatar.cc/150?img=68"
  }
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // ==================== ÉTAT ====================
      user: null,
      token: null,
      isLoading: false,
      error: null,
      resetEmailSent: false,
      resetSuccess: false,

      // ==================== ACTIONS ====================

      // Connexion (Fake)
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        await new Promise(resolve => setTimeout(resolve, 800));

        const foundUser = fakeUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
          const fakeToken = "fake-jwt-token-" + Date.now();

          set({
            user: {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email,
              avatar: foundUser.avatar,
            },
            token: fakeToken,
            isLoading: false,
            error: null,
          });
        } else {
          set({
            error: "Email ou mot de passe incorrect",
            isLoading: false,
          });
        }
      },

      // Inscription (Fake)
      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });

        await new Promise(resolve => setTimeout(resolve, 700));

        if (fakeUsers.some(u => u.email === email)) {
          set({ error: "Cet email est déjà utilisé", isLoading: false });
          return;
        }

        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };

        fakeUsers.push(newUser);

        const fakeToken = "fake-jwt-token-" + Date.now();

        set({
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
          },
          token: fakeToken,
          isLoading: false,
        });
      },

      // Déconnexion
      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
          resetEmailSent: false,
          resetSuccess: false,
        });
      },

      // Vérification de l'authentification (utilisée dans ProtectedRoute)
      checkAuth: async () => {
        const token = get().token;
        if (!token) return;

        set({ isLoading: true, error: null });

        try {
          await new Promise(resolve => setTimeout(resolve, 600));

          const currentUserEmail = get().user?.email;
          const foundUser = fakeUsers.find(u => u.email === currentUserEmail);

          if (foundUser && get().user) {
            set({ isLoading: false });
          } else {
            set({
              user: null,
              token: null,
              isLoading: false,
            });
          }
        } catch (err) {
          set({
            user: null,
            token: null,
            isLoading: false,
            error: "Session expirée",
          });
        }
      },

      // ==================== RESET PASSWORD ====================

      // Demander un lien de réinitialisation
      requestPasswordReset: async (email) => {
        set({ isLoading: true, error: null, resetEmailSent: false });

        await new Promise(resolve => setTimeout(resolve, 900));

        const userExists = fakeUsers.some(u => u.email === email);

        if (userExists) {
          set({
            resetEmailSent: true,
            isLoading: false,
            error: null,
          });
        } else {
          set({
            error: "Aucun compte trouvé avec cet email",
            isLoading: false,
          });
        }
      },

      // Réinitialiser le mot de passe
      resetPassword: async (email, newPassword) => {
        set({ isLoading: true, error: null });

        await new Promise(resolve => setTimeout(resolve, 700));

        const userIndex = fakeUsers.findIndex(u => u.email === email);

        if (userIndex !== -1) {
          fakeUsers[userIndex].password = newPassword;

          set({
            resetSuccess: true,
            isLoading: false,
            error: null,
          });
        } else {
          set({
            error: "Impossible de réinitialiser le mot de passe",
            isLoading: false,
          });
        }
      },

      // Réinitialiser les états du reset password
      clearResetStates: () => set({
        resetEmailSent: false,
        resetSuccess: false,
        error: null,
      }),

      // Nettoyer les erreurs
      clearError: () => set({ error: null }),
    }),

    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);