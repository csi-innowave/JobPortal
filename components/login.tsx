'use client'

import { useState,useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signIn,signOut } from 'next-auth/react'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'
import useUserStore from '@/store/UserStore'
import axios from 'axios'
import { getUser } from '@/actions/user.actions'
export default function AuthPage() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);
  const { toast } = useToast();
  const {setUser}=useUserStore()
  const router = useRouter()
  const [isloading,setisloading]=useState(false)
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [passwordError, setPasswordError] = useState('')

  const handleSignUpSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    setPasswordError('')
    console.log('Sign Up Data:', signUpData)
    try {
      setisloading(true);
   const response=   await axios.post("/api/register", { signUpData });
      toast({ title: "Registration Successful" });
      console.log(response)

     
      if (response.statusText==='OK') {
        toast({ title: "Correct login" });
        window.location.assign("/");
      } else if (response?.status!==200) {
        toast({ title: "Error! Please Try Again" });
      }
    } catch (err) {
      toast({ title: `Register ERR ${err}` });
    } finally {
      setisloading(false);
    }
  }

  const handleLoginSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login Data:', loginData)
    const email = loginData.email
    const password = loginData.password
   const login= await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(login)
    if (login?.ok) {
      toast({ title: "Correct login" });
      
   
        const info= await getUser(email)
        console.log(info)
        if (info?.emailId && info?.isVerified !== undefined && info?.name) {
          setUser({ email: info.emailId, isVerified: info.isVerified, name: info.name });
          console.log('aayayu')
          router.push('/');
          console.log('aaya')
          // Redirect to homepage
        } else {
          toast({ title: "Error! User info not available." });
        }
    } else if (login?.error) {
      toast({ title: "Error! Please Try Again"+login.error });
    }

  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordError('')
    }
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to login.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    name="email" 
                    type="email" 
                    required 
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password" 
                    name="password" 
                    type="password" 
                    required 
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <Button type="submit" className="w-full mt-4">Login</Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSignUpSubmit}>
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    name="email" 
                    type="email" 
                    required 
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    name="password" 
                    type="password" 
                    required 
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    name="confirmPassword" 
                    type="password" 
                    required 
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                  />
                </div>
                {passwordError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full mt-4">Sign Up</Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}