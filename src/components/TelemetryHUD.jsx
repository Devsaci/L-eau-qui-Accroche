import React from 'react';
import { Layers, ThermometerSun, Compass, ShieldAlert } from 'lucide-react';

export default function TelemetryHUD() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto my-8 text-left">
      {/* 1. Densité */}
      <div className="card-abyssal p-4 rounded-xl border border-biolum-cyan/20 bg-abyss-900/90 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-biolum-cyan/5 rounded-full blur-xl pointer-events-none group-hover:bg-biolum-cyan/10 transition-colors" />
        <div className="flex items-center justify-between text-slate-400 font-tech text-xs">
          <span className="tracking-wider">// DENSITÉ HYDRO</span>
          <Layers className="w-4 h-4 text-biolum-cyan" />
        </div>
        <div className="mt-2 font-display font-bold text-2xl text-white tracking-wide">
          ρ = m/V
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-400 font-tech font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          Anomalie détectée
        </div>
        <div className="text-[10px] text-slate-400 font-tech mt-1">
          Résistance mécanique anormale
        </div>
      </div>

      {/* 2. Température de baie */}
      <div className="card-abyssal p-4 rounded-xl border border-biolum-teal/20 bg-abyss-900/90 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-biolum-teal/5 rounded-full blur-xl pointer-events-none group-hover:bg-biolum-teal/10 transition-colors" />
        <div className="flex items-center justify-between text-slate-400 font-tech text-xs">
          <span className="tracking-wider">// TEMPÉRATURE BAIE</span>
          <ThermometerSun className="w-4 h-4 text-biolum-teal" />
        </div>
        <div className="mt-2 font-display font-bold text-2xl text-biolum-teal tracking-wide">
          +38°C
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded bg-biolum-teal/10 border border-biolum-teal/30 text-[11px] text-biolum-teal font-tech font-medium">
          Gradient ascendant
        </div>
        <div className="text-[10px] text-slate-400 font-tech mt-1">
          Inversion de convection locale
        </div>
      </div>

      {/* 3. Pression */}
      <div className="card-abyssal p-4 rounded-xl border border-biolum-blue/20 bg-abyss-900/90 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-biolum-blue/5 rounded-full blur-xl pointer-events-none group-hover:bg-biolum-blue/10 transition-colors" />
        <div className="flex items-center justify-between text-slate-400 font-tech text-xs">
          <span className="tracking-wider">// CONTRAINTE / SURFACE</span>
          <Compass className="w-4 h-4 text-biolum-blue" />
        </div>
        <div className="mt-2 font-display font-bold text-2xl text-white tracking-wide">
          P = F/S
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded bg-biolum-blue/10 border border-biolum-blue/30 text-[11px] text-biolum-blue font-tech font-medium">
          Tenseur anisotrope
        </div>
        <div className="text-[10px] text-slate-400 font-tech mt-1">
          Vecteur de force dévié
        </div>
      </div>

      {/* 4. Statut de l'enquête */}
      <div className="card-abyssal p-4 rounded-xl border border-emerald-500/20 bg-abyss-900/90 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
        <div className="flex items-center justify-between text-slate-400 font-tech text-xs">
          <span className="tracking-wider">// ENQUÊTE INDÉPENDANTE</span>
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-2 font-display font-bold text-xl text-emerald-400 tracking-wide uppercase">
          Méthode active
        </div>
        <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-tech font-medium">
          Refus de l'illusion
        </div>
        <div className="text-[10px] text-slate-400 font-tech mt-1">
          Réfutation du discours officiel
        </div>
      </div>
    </div>
  );
}
