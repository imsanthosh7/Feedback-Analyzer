import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";


const Signup = () => {


  const navigate = useNavigate();

  const backendurl = import.meta.env.VITE_BACKEND_URL

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');





  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const { data } = await axios.post(`${backendurl}/api/admin/register`,
        { name, email, password },
        {
          withCredentials: true
        })

      if (data.success) {
        toast.success(data.message)
        setName('');
        setEmail('');
        setpassword('');
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }





  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <Toaster richColors />
      <form onSubmit={handleSubmit}>
        <Card className="w-[360px] shadow-xl border rounded-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-sm text-gray-500">
              Fill in your details to sign up
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                autocomplete="name"
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
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
                placeholder="Create a password"
                value={password}
                autocomplete="new-password"
                onChange={e => setpassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full cursor-pointer">Sign Up</Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Signup;
