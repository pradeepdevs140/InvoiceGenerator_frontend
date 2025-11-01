import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState({ primary: false, secondary: false });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Hero Section */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #4f5dd9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          top: '-200px',
          left: '-200px'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          bottom: '-150px',
          right: '-150px'
        }} />

        {/* Main container */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 20px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Hero section */}
          <div style={{ marginBottom: '60px' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '24px',
              lineHeight: '1.2',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
            }}>
              Effortless Invoicing. Professional Results.
            </h1>
            
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Stop wrestling with spreadsheets. Quickinvoice helps you create and send beautiful invoices in minutes, so you get paid faster.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '32px'
            }}>
              <button
                onMouseEnter={() => setIsHovered({ ...isHovered, primary: true })}
                onMouseLeave={() => setIsHovered({ ...isHovered, primary: false })}
                style={{
                  padding: '16px 32px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fbbf24',
                  color: '#1e293b',
                  boxShadow: isHovered.primary 
                    ? '0 12px 28px rgba(251, 191, 36, 0.4)' 
                    : '0 8px 20px rgba(251, 191, 36, 0.3)',
                  transform: isHovered.primary ? 'translateY(-2px)' : 'translateY(0)',
                  minWidth: '200px'
                }}
              >
                Generate Your First Invoice
              </button>

              <button
                onMouseEnter={() => setIsHovered({ ...isHovered, secondary: true })}
                onMouseLeave={() => setIsHovered({ ...isHovered, secondary: false })}
                style={{
                  padding: '16px 32px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: isHovered.secondary ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: 'white',
                  minWidth: '160px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Features section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginTop: '80px'
          }}>
            {[
              { icon: '⚡', title: 'Lightning Fast', description: 'Create invoices in under 2 minutes' },
              { icon: '🎨', title: 'Beautiful Templates', description: 'Professional designs that impress' },
              { icon: '💰', title: 'Get Paid Faster', description: 'Track payments and send reminders' }
            ].map((feature, index) => (
              <div key={index} style={{
                padding: '32px 24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ 
                  color: 'white', 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '8px' 
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: '60px',
            animation: 'bounce 2s infinite'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '12px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              cursor: 'pointer'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
        `}</style>
      </div>

      {/* Get Started Section */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '80px 20px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: '700',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            Get Started in 4 Simple Steps
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                number: 1,
                color: '#3b82f6',
                title: 'Enter Details',
                description: 'Quickly fill in your client\'s information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.'
              },
              {
                number: 2,
                color: '#10b981',
                title: 'Choose Template',
                description: 'Browse our gallery of professionally designed templates. Pick one that matches your brand and style.'
              },
              {
                number: 3,
                color: '#f59e0b',
                title: 'Preview Invoice',
                description: 'See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.'
              },
              {
                number: 4,
                color: '#06b6d4',
                title: 'Download & Save',
                description: 'Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.'
              }
            ].map((step, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: 'white',
                  boxShadow: `0 8px 16px ${step.color}40`
                }}>
                  {step.number}
                </div>

                <div style={{
                  marginTop: '30px',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '12px'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#64748b',
                    lineHeight: '1.6'
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '60px 20px 30px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Brand Column */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#fbbf24'
              }}>
                Quickinvoice
              </h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                Professional invoicing made simple. Create, send, and track invoices effortlessly.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Product
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Features', 'Templates', 'Pricing', 'Documentation'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fbbf24'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Company
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['About Us', 'Blog', 'Careers', 'Contact'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fbbf24'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Legal
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: '#94a3b8',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fbbf24'}
                    onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '30px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}>
            <p style={{
              color: '#94a3b8',
              fontSize: '0.9rem',
              margin: 0
            }}>
              © 2025 Quickinvoice. All rights reserved.
            </p>

            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '16px'
            }}>
              {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social, i) => (
                <a key={i} href="#" style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fbbf24'}
                onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;