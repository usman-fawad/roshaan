import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function TrackOrderPage() {
  const [tracking, setTracking] = useState('');
  const [order, setOrder]       = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);

  useEffect(() => {
    document.title = 'Track Your Order | GRIP GLOW';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const query = tracking.trim() || order.trim();
    if (!query) {
      setError('Please enter your tracking number or order number.');
      return;
    }

    setLoading(true);
    // Simulate real-time tracking query
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    setResult({
      query,
      carrier: 'Tracked Express Courier (Royal Mail / USPS)',
      status: 'In Transit — On Schedule',
      updated: 'Today at 09:15 AM',
      estimatedDelivery: '3 - 5 Business Days',
      steps: [
        { label: 'Order Confirmed', desc: 'Order details verified & payment secured', done: true, time: 'Day 1' },
        { label: 'Quality Check & Packed', desc: 'Tested and packaged with shock protection', done: true, time: 'Day 1' },
        { label: 'In Transit with Courier', desc: 'Scanned at regional fulfillment sorting facility', done: true, active: true, time: 'Day 2' },
        { label: 'Out for Delivery', desc: 'Local courier dispatch to your doorstep', done: false, time: 'Arriving Soon' },
      ],
    });
  };

  return (
    <>
      <main className="track-page" aria-labelledby="track-heading" style={{ minHeight: '80vh', padding: '3.5rem 1rem 5rem' }}>
        <div className="container" style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
          <div className="track-card tracking-glass-card" style={{ background: '#ffffff', borderRadius: 16, padding: '2.5rem 2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: '#f1f5e8', color: '#496614', marginBottom: 12 }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h1 id="track-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', fontFamily: 'Oxanium, sans-serif' }}>
                Track Your Order
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                Enter your order number or tracking number below to view live shipment progress.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate aria-label="Order tracking form">
              <label className="track-label" htmlFor="track-num" style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#334155', marginBottom: 6 }}>
                Tracking Number
              </label>
              <input
                id="track-num"
                type="text"
                className="track-input"
                placeholder="e.g. GG-98421 or courier code"
                value={tracking}
                onChange={(e) => { setTracking(e.target.value); setError(''); }}
                autoComplete="off"
                style={{ width: '100%', height: 46, borderRadius: 8, border: '1px solid #cbd5e1', padding: '0 14px', fontSize: '0.95rem', marginBottom: 12 }}
              />

              <div className="track-or" aria-hidden="true" style={{ textAlign: 'center', margin: '8px 0', position: 'relative' }}>
                <span style={{ background: '#ffffff', padding: '0 12px', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>OR</span>
              </div>

              <label className="track-label" htmlFor="order-num" style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#334155', marginBottom: 6 }}>
                Order Number
              </label>
              <input
                id="order-num"
                type="text"
                className="track-input"
                placeholder="e.g. #1001"
                value={order}
                onChange={(e) => { setOrder(e.target.value); setError(''); }}
                autoComplete="off"
                style={{ width: '100%', height: 46, borderRadius: 8, border: '1px solid #cbd5e1', padding: '0 14px', fontSize: '0.95rem', marginBottom: 16 }}
              />

              <button
                type="submit"
                className="btn btn-green btn-full"
                disabled={loading}
                style={{ width: '100%', height: 48, fontSize: '1rem', fontWeight: 700, borderRadius: 8 }}
              >
                {loading ? 'Searching Shipment…' : 'Track Order'}
              </button>

              {error && (
                <p className="track-err" role="alert" style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: 10, textAlign: 'center' }}>
                  {error}
                </p>
              )}
            </form>

            {/* Tracking Result Card */}
            {result && (
              <div
                className="track-result-card"
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  borderRadius: 12,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Reference:</span>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{result.query}</h3>
                  </div>
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: 999,
                    background: '#dcfce7',
                    color: '#15803d',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}>
                    ● {result.status}
                  </span>
                </div>

                <div style={{ margin: '1.25rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>CARRIER</span>
                    <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>{result.carrier}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>ESTIMATED DELIVERY</span>
                    <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#15803d' }}>{result.estimatedDelivery}</p>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {result.steps.map((st, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: st.done ? '#A8C34A' : '#e2e8f0',
                        color: st.done ? '#0f172a' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        flexShrink: 0,
                        marginTop: 2,
                      }}>
                        {st.done ? '✓' : i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: st.done ? '#0f172a' : '#64748b' }}>
                            {st.label}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{st.time}</span>
                        </div>
                        <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '0.825rem', color: '#64748b' }}>
                  Need immediate help with your delivery?{' '}
                  <a href="mailto:contact@gripglow.com" style={{ color: '#496614', fontWeight: 700, textDecoration: 'underline' }}>
                    Email support at contact@gripglow.com
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
