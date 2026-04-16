import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // Safety check just in case we hit an infinite loop of rendering errors somehow
    try {
        this.setState({ error, errorInfo });
    } catch(e) { /* ignore */ }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: "20px", 
          color: "#ff3333", 
          backgroundColor: "#050505", 
          minHeight: "100vh", 
          fontFamily: "monospace", 
          zIndex: 99999, 
          position: "fixed",
          inset: 0,
          overflowY: "auto"
        }}>
          <h1 style={{ color: "red", fontSize: "2rem", borderBottom: '1px solid red', paddingBottom: '10px' }}>REACT CRASH TRAP 💥</h1>
          
          <h2 style={{ marginTop: '20px' }}>{this.state.error?.toString()}</h2>
          
          <div style={{ background: '#111', padding: '10px', marginTop: '10px', borderRadius: '5px' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Stack Trace:</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px", color: "#ff8888", margin: 0 }}>
              {this.state.error?.stack}
            </pre>
          </div>
          
          <div style={{ background: '#111', padding: '10px', marginTop: '10px', borderRadius: '5px' }}>
            <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Component Stack:</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", color: "gray", margin: 0 }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
