import { create } from "zustand"


export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'light',
    toggleTheme: () => set((state) => {
        const NewTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", NewTheme);
        return {theme : NewTheme }
     }),
}));

// si je l'utilise dans un composant  


// const {theme, themetoggle} = useThemeStore()
