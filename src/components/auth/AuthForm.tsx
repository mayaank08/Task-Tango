
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onLogin(data: LoginFormValues) {
    console.log('Login data:', data);
    // In a real app, you would make an API call to authenticate
    toast({
      title: "Success!",
      description: "Logged in successfully. Welcome back!",
    });
    // For demo purposes, let's redirect to the dashboard
    window.location.href = '/';
  }

  function onRegister(data: RegisterFormValues) {
    console.log('Register data:', data);
    // In a real app, you would make an API call to register
    toast({
      title: "Account created!",
      description: "Your account has been created successfully.",
    });
    // For demo purposes, let's redirect to the dashboard
    window.location.href = '/';
  }

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-gray-500">
          {isLogin 
            ? "Enter your credentials to access your account" 
            : "Fill out the form to create your account"}
        </p>
      </div>

      {isLogin ? (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </Form>
      ) : (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Form>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-task-purple-500 hover:underline ml-1 font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
