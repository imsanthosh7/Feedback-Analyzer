import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const handelSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } = await axios.post(`${backendurl}/api/admin/login`, { email, password }, {
                withCredentials: true
            })

            if (data.success) {
                toast.success(data.message)
                navigate('/admin')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }


    }




    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <Toaster richColors position="bottom-right" />
            <form onSubmit={handelSubmit}>
                <Card className="w-[360px] shadow-xl border rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-semibold">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-center text-sm text-gray-500">
                            Please sign in to your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={email}
                                type="email"
                                placeholder="you@example.com"
                                autocomplete="email"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                placeholder="••••••••"
                                autocomplete="new-password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button className="w-full cursor-pointer">Sign In</Button>
                        <p className="text-sm text-muted-foreground text-center">
                            Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default Login;
