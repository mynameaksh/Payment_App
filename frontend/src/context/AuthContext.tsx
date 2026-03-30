import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
    userId: string | null;
    accessToken: string | null;
    signin: (accessToken: string, userId: string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const [accessToken, setaccessToken] = useState<string | null>(localStorage.getItem("accessToken"));

    const signin = (newaccessToken: string, newUserId: string) => {
        localStorage.setItem("accessToken", newaccessToken)
        localStorage.setItem("userId", newUserId)

        setaccessToken(newaccessToken);
        setUserId(newUserId);
    }
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");

        setaccessToken(null);
        setUserId(null);
    }

    return (
        <AuthContext.Provider value={{ userId, accessToken, logout, signin }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}