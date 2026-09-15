"use client";

import React from "react";
import { MapPin, RefreshCw } from "lucide-react";

interface State {
  hasError: boolean;
  error?: Error;
}

export class MapErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[MapErrorBoundary] Harita hatasi:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full rounded-2xl border border-gray-200 bg-slate-50 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">
              Harita yuklenemedi
            </p>
            <p className="text-xs text-slate-400">
              Lutfen sayfayi yenileyerek tekrar deneyin
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Tekrar Dene
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
