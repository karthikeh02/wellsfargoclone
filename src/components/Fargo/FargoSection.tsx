const f = '"Wells Fargo Sans", Arial, Helvetica, sans-serif';

export default function FargoSection() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #4a3728 0%, #3b3331 40%, #2a2a2a 100%)' }}>
      <div className="max-w-[1400px] mx-auto" style={{ padding: '48px 20px' }}>
        <div className="flex items-center">
          {/* Left: Phone image */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://www17.wellsfargomedia.com/assets/images/rwd/Fargo-Spending-Insights-Wells-Fargo-Mobile-App-2025.png"
              alt=""
              style={{ maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>

          {/* Right: Text + CTA */}
          <div className="flex-1">
            <div style={{ maxWidth: '480px' }}>
              <h2 style={{
                fontFamily: f, fontSize: '1.64705882rem', lineHeight: '1.25',
                color: '#fff', fontWeight: 400, margin: '0 0 16px',
              }}>
                Need help? Ask Fargo<sup style={{ fontSize: '0.7em' }}>&reg;</sup>
              </h2>
              <p style={{
                fontFamily: f, fontSize: '1.05882353rem', lineHeight: '1.35',
                color: '#e0dcd9', margin: '0 0 28px',
              }}>
                Fargo<sup>1</sup> gives you valuable insights like a summary of your spending by
                category, retailer and across accounts. Find it only in the Wells Fargo Mobile<sup>&reg;</sup> app.
              </p>

              <div className="flex items-center gap-3 mb-4">
                <a href="#" aria-label="Download on the App Store">
                  <img
                    src="https://www17.wellsfargomedia.com/assets/images/rwd/App_Store_Badge.png"
                    alt="" style={{ height: '40px' }}
                  />
                </a>
                <a href="#" aria-label="Get it on Google Play">
                  <img
                    src="https://www17.wellsfargomedia.com/assets/images/rwd/GooglePlay_Badge.png"
                    alt="" style={{ height: '40px' }}
                  />
                </a>
              </div>
              <span style={{ fontSize: '0.76470588rem', color: '#b5adad', fontFamily: f }}>
                *Screen image is simulated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
