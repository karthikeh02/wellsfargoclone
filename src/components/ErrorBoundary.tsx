import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          fontFamily: '"Wells Fargo Sans", Arial, Helvetica, sans-serif',
          backgroundColor: '#f9f7f6',
        }}>
          <div style={{ maxWidth: '500px', textAlign: 'center' }}>
            <div style={{
              width: '60px', height: '60px', backgroundColor: '#D71E28',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 24px',
            }}>
              <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>!</span>
            </div>
            <h1 style={{ fontSize: '1.76rem', color: '#141414', margin: '0 0 12px', fontWeight: 300 }}>
              Something went wrong
            </h1>
            <p style={{ color: '#555', margin: '0 0 24px', lineHeight: '1.5' }}>
              We're sorry for the inconvenience. Please refresh the page or return home.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                backgroundColor: '#D71E28', color: '#fff',
                padding: '10px 32px', borderRadius: '24px',
                textDecoration: 'none', fontWeight: 600,
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
