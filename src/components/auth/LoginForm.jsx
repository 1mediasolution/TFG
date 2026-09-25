import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('elena@vance.io');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await auth.login(email, password);
      if (res.success) {
        if (onSuccess) onSuccess(res.user);
        navigate('/founder/dashboard');
      } else {
        setError(res.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-medium">
          {error}
        </div>
      )}

      <Input
        label="Executive Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={Mail}
        placeholder="founder@company.com"
        required
      />

      <div>
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          placeholder="••••••••"
          required
        />
        <div className="flex justify-end mt-1.5">
          <Link
            to="/auth/forgot-password"
            className="text-xs text-amber-600 hover:text-amber-500 font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="md"
        icon={LogIn}
        loading={loading}
        className="w-full mt-2"
      >
        Sign In to Founder Grid
      </Button>

      <div className="text-center text-xs text-zinc-500 pt-2">
        Don't have an executive profile?{' '}
        <Link to="/auth/register" className="font-semibold text-amber-600 hover:underline">
          Apply for Membership
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
