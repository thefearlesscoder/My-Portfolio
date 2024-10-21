import {  Link} from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { login, clearAllUserErrors} from "../store/slices/userSlices";
import { toast } from "react-toastify";
import SpecialLoadingButton from "@/pages/subComponents/SpecialLoadingButton";

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, isAuthenticated, error } = useSelector(
      (state) => state.user
    ); // to access slice

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleLogin = () => {
      console.log(" inside handle");
      
      dispatch(login(email, password));

      console.log("diusplatch ho gya");
      
    };

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllUserErrors());
      }

      if (isAuthenticated) {
        navigateTo("/");
      }
    }, [dispatch, isAuthenticated, error, loading]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to={"/password/forgot"}
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loading ? (
            <SpecialLoadingButton content={"Logging in"}/>
          ) : (
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
