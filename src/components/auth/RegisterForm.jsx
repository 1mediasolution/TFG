import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, Globe, ArrowRight } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    role: 'Founder',
    tier: 'founder_pro',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await auth.register(formData);
      if (res.success) {
        if (onSuccess) onSuccess(res.user);
        navigate('/founder/dashboard');
      } else {
        setError(res.error || 'Registration failed');
      }
    } catch (err) {
      setError(err?.message || 'Registration failed');
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
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        icon={User}
        placeholder="e.g. Marcus Sterling"
        required
      />

      <Input
        label="Executive Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        icon={Mail}
        placeholder="marcus@sterling.vc"
        required
      />

      <Input
        label="Company / Fund Name"
        type="text"
        value={formData.company}
        onChange={(e) => handleChange('company', e.target.value)}
        icon={Building}
        placeholder="e.g. Sterling Capital Ventures"
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
            Syndicate Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
          >
            <option value="Founder">Founder / Operator</option>
            <option value="Investor">Accredited Investor</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
            Membership Tier
          </label>
          <select
            value={formData.tier}
            onChange={(e) => handleChange('tier', e.target.value)}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
          >
            <option value="founder_pro">Founder Pro ($49/mo)</option>
            <option value="executive_fellow">Executive Fellow ($199/mo)</option>
            <option value="free">Guest Member (Free)</option>
          </select>
        </div>
      </div>

      <Input
        label="Create Password"
        type="password"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        icon={Lock}
        placeholder="••••••••"
        required
      />

      <Button
        type="submit"
        variant="gold"
        size="md"
        loading={loading}
        className="w-full mt-2"
      >
        Complete Registration & Setup Subdomain
      </Button>

      <div className="text-center text-xs text-zinc-500 pt-2">
        Already an accredited member?{' '}
        <Link to="/auth/login" className="font-semibold text-amber-600 hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
