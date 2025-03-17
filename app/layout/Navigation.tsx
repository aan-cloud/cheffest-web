import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"

type Userdata = {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        avatarUrl: string
    }
}

export function Navigation() {
    const [userdata, setUserdata] = useState<Userdata | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    function isActive(path: string) {
        return location.pathname === path ? "text-gray-300 text-sm font-semibold p-2 rounded-b-md border-b-white transition bg-[#191919] duration-300 border-b-transparent border-b-4" : "text-gray-300 text-sm font-semibold p-2 rounded-b-md  hover:border-b-white transition hover:bg-[#191919] duration-300 border-b-transparent border-b-4";
    }

    const handleLogin = async (credentialResponse: any) => {
        try {
            
            if (!credentialResponse.credential) {
                throw new Error("Credential not recieved!")
            }

            const res = await fetch("http://localhost:3000/auth/google/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });
    
            if (!res.ok) throw new Error("Login failed");
    
            const data = await res.json();
            console.log(data)
            document.cookie = `jwt=${data.accessToken}; path=/; max-age=86400; secure; samesite=strict`;
            setIsAuth(true)
    
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleLogout = () => {
        document.cookie = "jwt=; path=/; max-age=0";

        setIsAuth(false)
        setUserdata(null)
    }

    useEffect(() => {
        async function checkUserData () {
            try {
                const token = document.cookie
                ?.split("; ")
                .find((row) => row.startsWith("jwt="))
                ?.split("=")[1];
    
                console.log(token, "from checkuserdata")
    
                const res = await fetch("http://localhost:3000/auth/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
    
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
    
                const data = await res.json();
    
                setUserdata(data);
                setIsAuth(true)
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setIsAuth(false);
                setUserdata(null);
            }
        }

        checkUserData();
    }, [isAuth]);

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            navigate(`/foods?name=${e.currentTarget.value}`);
            e.currentTarget.value = "";
        };
    };

    

    return (
        <nav className="p-4 md:px-24 flex justify-between items-center bg-black">
            <Link to={"/"} id="logo">
                <img src="https://ucarecdn.com/ae03f850-4195-44d8-9137-921139adbbd6/Logo.svg" alt="Cheffest Logo" className="w-14"/>
            </Link>
            <ol className="flex justify-between items-center gap-5">
                <Link to={"/about"} className={`${isActive("/about")}`}>About</Link>
                <Link to={"/foods"} className={`${isActive("/foods")}`}>Our Menu</Link>
            </ol>
            <Input onKeyDown={handleSearch} placeholder="Search..." className="w-[55%] text-white border-gray-300" />
            <Link to={"/cart"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-white">
                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                </svg>
            </Link>
            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarImage className="size-10 rounded-full bg-white" src={userdata?.user?.avatarUrl ??  "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="end" className="absolute border-none shadow-sm -right-4 flex flex-col gap-1.5 bg-[#191919]">
                    {
                        isAuth && userdata ? (
                            <div className="p-3 bg-white flex flex-col gap-1.5">
                                <h1 className="font-light font-sans text-center">{userdata.user.name}</h1>
                                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-800">Logout</Button>
                            </div>
                        ) : (
                            <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Login Failed")} />
                        )
                    }
                </PopoverContent>
            </Popover>
        </nav>
    )
}