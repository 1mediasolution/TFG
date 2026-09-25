import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Save, User, Building, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const FounderProfile = () => {
  const auth = useAuth();
  const [user, setUser] = useState(auth.user || {});
  const [saved, setSaved] = useState(false);

  const handleChange = (field, val) => {
    setUser((prev) => ({ ...prev, [field]: val }));
  };

  const handleStatsChange = (field, val) => {
    setUser((prev) => ({
      ...prev,
      stats: { ...(prev.stats || {}), [field]: val },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.updateUser(user);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout
      title="Executive Dossier Settings"
      subtitle="Manage your public verification credentials, syndicate metrics, and profile copy."
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {saved && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Executive dossier updated successfully.
          </div>
        )}

        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
            Identity & Organization
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={user.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              icon={User}
              required
            />
            <Input
              label="Title / Role"
              value={user.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Founder & CEO"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              value={user.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              icon={Building}
              required
            />
            <Input
              label="Publication Subdomain"
              value={user.subdomain || ''}
              onChange={(e) => handleChange('subdomain', e.target.value)}
              icon={Globe}
              helperText=".thefoundergrid.com"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
              Executive Biography & Syndicate Pitch
            </label>
            <textarea
              rows={4}
              value={user.bio || ''}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Detail your background, prior exits, and core enterprise mission..."
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
            Validated Enterprise Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Input
              label="Valuation"
              value={user.stats?.valuation || ''}
              onChange={(e) => handleStatsChange('valuation', e.target.value)}
              placeholder="$12M"
            />
            <Input
              label="Revenue"
              value={user.stats?.revenue || ''}
              onChange={(e) => handleStatsChange('revenue', e.target.value)}
              placeholder="$3.4M"
            />
            <Input
              label="Total Raised"
              value={user.stats?.totalRaised || ''}
              onChange={(e) => handleStatsChange('totalRaised', e.target.value)}
              placeholder="$4.2M"
            />
            <Input
              label="Employees"
              value={user.stats?.employees || ''}
              onChange={(e) => handleStatsChange('employees', e.target.value)}
              placeholder="24"
            />
          </div>
        </div>

        <Button type="submit" variant="gold" size="md" icon={Save}>
          Save Dossier Changes
        </Button>
      </form>
    </DashboardLayout>
  );
};

export default FounderProfile;
