import React from 'react';
import { Layers, ThermometerSun, Compass, ShieldCheck } from 'lucide-react';

export default function TelemetryHUD() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto my-8 text-left">
      {/* 1. Densité Hydro */}
      <div className="card-carnet p-5 rounded-2xl border border-brick/20 bg-paper-card relative overflow-hidden group shadow-paper">
        <div className="flex items-center justify-between text-ink-muted font-mono text-xs">
          <span className="tracking-wider">// DENSITÉ HYDRO</span>
          <Layers className="w-4 h-4 text-brick" />
        </div>
        <div className="mt-2.5 font-mono font-bold text-2xl text-ink tracking-wide">
          ρ = m/V
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-0.5 rounded-md bg-gold-50 border border-gold/30 text-[11px] text-gold-dark font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Anomalie +35% (1382 kg/m³)
        </div>
        <div className="text-[11px] text-ink-muted font-sans mt-2">
          Échantillonnage direct au quai nord
        </div>
      </div>

      {/* 2. Température de baie */}
      <div className="card-carnet p-5 rounded-2xl border border-brick/20 bg-paper-card relative overflow-hidden group shadow-paper">
        <div className="flex items-center justify-between text-ink-muted font-mono text-xs">
          <span className="tracking-wider">// GRADIENT THERMIQUE</span>
          <ThermometerSun className="w-4 h-4 text-rust" />
        </div>
        <div className="mt-2.5 font-mono font-bold text-2xl text-brick tracking-wide">
          +38°C
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-0.5 rounded-md bg-brick-50 border border-brick/30 text-[11px] text-brick font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-brick" />
          Colonne ascendante
        </div>
        <div className="text-[11px] text-ink-muted font-sans mt-2">
          Résurgence anormale depuis la faille
        </div>
      </div>

      {/* 3. Pression / Cisaillement */}
      <div className="card-carnet p-5 rounded-2xl border border-brick/20 bg-paper-card relative overflow-hidden group shadow-paper">
        <div className="flex items-center justify-between text-ink-muted font-mono text-xs">
          <span className="tracking-wider">// CONTRAINTE / SURFACE</span>
          <Compass className="w-4 h-4 text-brick" />
        </div>
        <div className="mt-2.5 font-mono font-bold text-2xl text-ink tracking-wide">
          P = F/S
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-0.5 rounded-md bg-gold-50 border border-gold/30 text-[11px] text-gold-dark font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          Fluide non-newtonien
        </div>
        <div className="text-[11px] text-ink-muted font-sans mt-2">
          Vecteur de force et viscosité déviés
        </div>
      </div>

      {/* 4. Statut de l'enquête */}
      <div className="card-carnet p-5 rounded-2xl border border-brick/20 bg-paper-card relative overflow-hidden group shadow-paper">
        <div className="flex items-center justify-between text-ink-muted font-mono text-xs">
          <span className="tracking-wider">// PROTOCOLE TERRAIN</span>
          <ShieldCheck className="w-4 h-4 text-rust" />
        </div>
        <div className="mt-2.5 font-serif font-bold text-xl text-brick tracking-wide uppercase">
          MÉTHODE EMPIRIQUE
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-0.5 rounded-md bg-paper border border-brick/20 text-[11px] text-ink-light font-mono font-medium">
          Réfutation vérifiée
        </div>
        <div className="text-[11px] text-ink-muted font-sans mt-2">
          Face au discours officiel de complaisance
        </div>
      </div>
    </div>
  );
}
