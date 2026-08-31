import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/authContext';
import { 
  subscribeToLeads, 
  updateLeadStatusInFirestore, 
  updateLeadNotesInFirestore, 
  deleteLeadFromFirestore,
  saveLeadToFirestore
} from '../lib/leadsService';
import { LeadSubmission, LeadStatus } from '../types';
import { 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  Sparkles, 
  Plus, 
  RefreshCw, 
  Phone, 
  Calendar, 
  Copy, 
  Check, 
  Edit3, 
  Save, 
  X,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Briefcase,
  CreditCard,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { AdminLogin } from '../components/admin/AdminLogin';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateHome }) => {
  const { user, loading: authLoading, logout } = useAuth();
  
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Payment Proof Modal Viewer
  const [selectedScreenshotLead, setSelectedScreenshotLead] = useState<LeadSubmission | null>(null);

  // Notes editing state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  // Manual Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadWhatsApp, setNewLeadWhatsApp] = useState('');
  const [newLeadNiche, setNewLeadNiche] = useState('');
  const [newLeadNotes, setNewLeadNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsubscribe = subscribeToLeads(
      (data) => {
        setLeads(data);
        setLoading(false);
      },
      (err) => {
        console.error('Leads subscription error:', err);
        setError('Failed to load leads from Firestore. Using local cache.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white/70">
          <RefreshCw className="w-8 h-8 animate-spin text-orange-400" />
          <p className="text-sm font-medium">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  // If not logged in, render the login page
  if (!user) {
    return <AdminLogin onBackToLanding={onNavigateHome} />;
  }

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.notes && lead.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || (lead.status || 'new') === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => (l.status || 'new') === 'new').length;
  const inProgressCount = leads.filter(l => l.status === 'in_progress' || l.status === 'contacted').length;
  const completedCount = leads.filter(l => l.status === 'completed').length;
  const estimatedRevenue = totalLeads * 8000;

  // Actions
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatusInFirestore(leadId, newStatus);
  };

  const handleSaveNotes = async (leadId: string) => {
    await updateLeadNotesInFirestore(leadId, notesText);
    setEditingNotesId(null);
  };

  const handleDeleteLead = async (leadId: string) => {
    await deleteLeadFromFirestore(leadId);
    setDeleteConfirmId(null);
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadWhatsApp.trim()) return;

    setIsAdding(true);
    await saveLeadToFirestore({
      fullName: newLeadName,
      whatsapp: newLeadWhatsApp,
      niche: newLeadNiche || 'General Fiverr Optimization',
      notes: newLeadNotes,
      status: 'new',
      price: 'Rs. 8,000'
    });

    setIsAdding(false);
    setShowAddModal(false);
    setNewLeadName('');
    setNewLeadWhatsApp('');
    setNewLeadNiche('');
    setNewLeadNotes('');
  };

  const handleCopyLead = (lead: LeadSubmission) => {
    const text = `Name: ${lead.fullName}\nWhatsApp: ${lead.whatsapp}\nNiche: ${lead.niche}\nStatus: ${lead.status || 'new'}\nDate: ${new Date(lead.createdAt).toLocaleString()}\nNotes: ${lead.notes || 'None'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id || 'id');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Full Name', 'WhatsApp', 'Niche', 'Payment Method', 'Transaction ID', 'Status', 'Price', 'Created Date', 'Notes'];
    const rows = leads.map(l => [
      `"${l.id || ''}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.whatsapp.replace(/"/g, '""')}"`,
      `"${l.niche.replace(/"/g, '""')}"`,
      `"${l.paymentMethod || 'JazzCash'}"`,
      `"${(l.transactionId || '').replace(/"/g, '""')}"`,
      `"${l.status || 'new'}"`,
      `"${l.price || 'Rs. 8,000'}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smart-seo-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp quick chat generator
  const getWhatsAppChatUrl = (lead: LeadSubmission) => {
    // clean phone number
    let cleanPhone = lead.whatsapp.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('03')) {
      cleanPhone = '92' + cleanPhone.substring(1);
    } else if (cleanPhone.length === 10 && !cleanPhone.startsWith('92')) {
      cleanPhone = '92' + cleanPhone;
    }

    const message = encodeURIComponent(
      `👋 Assalam-o-Alaikum ${lead.fullName}!\n\nThis is Smart SEO Solutions regarding your Fiverr Profile & Gig Optimization intake for ${lead.niche}.\n\nWe have received your details and are ready to review your profile. Please share your Fiverr profile link so we can begin!`
    );

    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const getStatusBadge = (status?: LeadStatus) => {
    switch (status) {
      case 'new':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'contacted':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'in_progress':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Smart SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Admin Dashboard</span>
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
              <span>Live Firestore Sync</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Logged in as <strong className="text-white">{user.email}</strong> • Real-time customer intake stream
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-black text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Add Manual Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={leads.length === 0}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
          >
            <Download className="w-4 h-4 text-white/70" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-white/70" />
            <span>View Website</span>
          </button>

          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{totalLeads}</div>
          <div className="text-[11px] text-white/50 mt-1">Direct from funnel intake</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.04] border border-amber-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">New (Uncontacted)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">{newLeadsCount}</div>
          <div className="text-[11px] text-amber-400/70 mt-1">Requires follow-up</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.04] border border-purple-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">In Discussion</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300">{inProgressCount}</div>
          <div className="text-[11px] text-purple-400/70 mt-1">Chatting on WhatsApp</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Completed / Closed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300">{completedCount}</div>
          <div className="text-[11px] text-emerald-400/70 mt-1">Delivered optimization</div>
        </div>
      </div>

      {/* Search & Status Filter Controls */}
      <div className="glass-card rounded-2xl p-4 mb-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/30">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, phone, niche, notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-white/50 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { key: 'all', label: 'All' },
            { key: 'new', label: 'New' },
            { key: 'contacted', label: 'Contacted' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === tab.key
                  ? 'bg-orange-500 text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Leads Table / List */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden bg-black/40 shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-white/60 flex flex-col items-center gap-3">
            <RefreshCw className="w-7 h-7 animate-spin text-orange-400" />
            <p className="text-sm">Connecting to Firestore database...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-white/40">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No Leads Found</h3>
            <p className="text-xs text-white/60 max-w-sm mx-auto mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search criteria or filter to see more leads.'
                : 'As soon as a client submits the form on your website, it will appear here in real time.'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-bold border border-orange-500/30 transition-colors cursor-pointer"
            >
              Add a Test Lead Manually
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold text-white/60 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">WhatsApp Contact</th>
                  <th className="py-3.5 px-4">Niche / Service</th>
                  <th className="py-3.5 px-4">Payment Proof</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted Date</th>
                  <th className="py-3.5 px-4">Admin Notes</th>
                  <th className="py-3.5 px-4 text-right">Direct Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-white/90">
                {filteredLeads.map((lead, index) => {
                  const leadKey = lead.id || `lead-${lead.whatsapp || ''}-${lead.createdAt || ''}-${index}`;
                  return (
                  <tr key={leadKey} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Name */}
                    <td className="py-4 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {lead.fullName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white flex items-center gap-1.5">
                            <span>{lead.fullName}</span>
                            <button
                              onClick={() => handleCopyLead(lead)}
                              title="Copy lead summary"
                              className="text-white/30 hover:text-white transition-colors cursor-pointer"
                            >
                              {copiedId === lead.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          {lead.email && <div className="text-[10px] text-white/50">{lead.email}</div>}
                        </div>
                      </div>
                    </td>

                    {/* WhatsApp */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{lead.whatsapp}</span>
                      </div>
                    </td>

                    {/* Niche */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-white/80">
                        {lead.niche}
                      </span>
                    </td>

                    {/* Payment Proof */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            (lead.paymentMethod || '').toLowerCase().includes('sada')
                              ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {lead.paymentMethod || 'JazzCash'}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400">
                            {lead.price || 'Rs. 8,000'}
                          </span>
                        </div>

                        {lead.transactionId && (
                          <div className="text-[10px] font-mono text-white/60 truncate max-w-[120px]">
                            ID: {lead.transactionId}
                          </div>
                        )}

                        {lead.paymentScreenshot ? (
                          <button
                            type="button"
                            onClick={() => setSelectedScreenshotLead(lead)}
                            className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Screenshot</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-white/30 italic">No receipt attached</span>
                        )}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => handleStatusChange(lead.id!, e.target.value as LeadStatus)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer bg-black/60 ${getStatusBadge(lead.status)}`}
                      >
                        <option value="new" className="bg-[#1a0b2e] text-amber-300">🟡 New</option>
                        <option value="contacted" className="bg-[#1a0b2e] text-sky-300">🔵 Contacted</option>
                        <option value="in_progress" className="bg-[#1a0b2e] text-purple-300">🟣 In Progress</option>
                        <option value="completed" className="bg-[#1a0b2e] text-emerald-300">🟢 Completed</option>
                        <option value="cancelled" className="bg-[#1a0b2e] text-rose-300">🔴 Cancelled</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-[11px] text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-white/40" />
                        <span>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="text-[10px] text-white/40">
                        {new Date(lead.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Notes Inline Editor */}
                    <td className="py-4 px-4 max-w-xs">
                      {editingNotesId === lead.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            placeholder="Add remark..."
                            className="w-full px-2 py-1 text-xs bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-orange-400"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveNotes(lead.id!)}
                            className="p-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="p-1 rounded bg-white/10 text-white/60 hover:bg-white/20 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditingNotesId(lead.id!);
                            setNotesText(lead.notes || '');
                          }}
                          className="cursor-pointer group/notes flex items-center justify-between gap-1 p-1 rounded hover:bg-white/5 transition-colors"
                        >
                          <span className="text-[11px] text-white/70 truncate max-w-[140px]">
                            {lead.notes ? lead.notes : <em className="text-white/30">Click to add note...</em>}
                          </span>
                          <Edit3 className="w-3 h-3 text-white/30 opacity-0 group-hover/notes:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* 1-Click WhatsApp Direct Chat */}
                        <a
                          href={getWhatsAppChatUrl(lead)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat with client on WhatsApp"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-bold text-xs flex items-center gap-1.5 border border-[#25D366]/40 transition-all cursor-pointer shadow"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        {/* Delete Button */}
                        {deleteConfirmId === lead.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDeleteLead(lead.id!)}
                              className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold cursor-pointer hover:bg-rose-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 rounded bg-white/10 text-white text-[10px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(lead.id!)}
                            title="Delete lead"
                            className="p-1.5 rounded-lg text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Screenshot Viewer Modal */}
      {selectedScreenshotLead && selectedScreenshotLead.paymentScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl p-5 sm:p-7 max-w-lg w-full border border-white/20 bg-[#170928] shadow-2xl relative">
            <button
              onClick={() => setSelectedScreenshotLead(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Payment Receipt Verification</h3>
            </div>

            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-xs text-white/80 mb-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-white/50">Client:</span>
                <span className="font-bold text-white">{selectedScreenshotLead.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">WhatsApp:</span>
                <span className="font-mono text-emerald-400">{selectedScreenshotLead.whatsapp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Method:</span>
                <span className="font-bold text-orange-400">{selectedScreenshotLead.paymentMethod || 'JazzCash'}</span>
              </div>
              {selectedScreenshotLead.transactionId && (
                <div className="flex justify-between">
                  <span className="text-white/50">Trx ID:</span>
                  <span className="font-mono text-amber-300 font-bold">{selectedScreenshotLead.transactionId}</span>
                </div>
              )}
            </div>

            {/* Image Preview Container */}
            <div className="max-h-[60vh] overflow-auto rounded-2xl border border-white/10 bg-black/60 p-2 flex items-center justify-center mb-4">
              <img 
                src={selectedScreenshotLead.paymentScreenshot} 
                alt="Payment proof screenshot"
                className="max-w-full h-auto max-h-[50vh] object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <a
                href={selectedScreenshotLead.paymentScreenshot}
                download={`receipt-${selectedScreenshotLead.fullName.replace(/\s+/g, '_')}.jpg`}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Image</span>
              </a>

              <a
                href={getWhatsAppChatUrl(selectedScreenshotLead)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/20 bg-[#170928] shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Add Lead Manually</h3>
            <p className="text-xs text-white/60 mb-5">Record a custom inquiry into your Firestore database.</p>

            <form onSubmit={handleManualAdd} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Ali Khan"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">WhatsApp Number *</label>
                <input
                  type="text"
                  value={newLeadWhatsApp}
                  onChange={(e) => setNewLeadWhatsApp(e.target.value)}
                  placeholder="e.g. 03001234567 or +92..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Service / Niche</label>
                <input
                  type="text"
                  value={newLeadNiche}
                  onChange={(e) => setNewLeadNiche(e.target.value)}
                  placeholder="e.g. Graphic Design, Web Development..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Notes / Remarks</label>
                <textarea
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="e.g. Interested in 5 Gigs optimization..."
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-black text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  {isAdding ? 'Saving...' : 'Save to Firestore'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
