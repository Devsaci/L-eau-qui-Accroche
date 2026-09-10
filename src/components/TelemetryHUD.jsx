import React from 'react';
import { Layers, ThermometerSun, Compass, ShieldAlert } from 'lucide-react';

export default function TelemetryHUD() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto my-8 text-left">
      {/* 1. Densité */}
      <div className="bg-white/90 rounded-2xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-stone-300 transition-colors">
        <div className="flex items-center justify-between text-ink/70 font-mono text-xs">
          <span className="tracking-wider">// DENSITÉ HYDRO</span>
          <Layers className="w-4 h-4 text-dataBlue" />
        </div>
        <div className="mt-2.5 inline-block font-mono text-dataBlue bg-stone-100/80 px-3 py-1.5 rounded-lg text-xl sm:text-2xl font-semibold tracking-wide">
          ρ = m/V
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 mt-3 px-2 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amberAccent" />
            Anomalie +35%
          </div>
        </div>
        <div className="text-[11px] text-ink/65 font-sans mt-1.5">
          Résistance mécanique anormale
        </div>
      </div>

      {/* 2. Température de baie */}
      <div className="bg-white/90 rounded-2xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-stone-300 transition-colors">
        <div className="flex items-center justify-between text-ink/70 font-mono text-xs">
          <span className="tracking-wider">// TEMPÉRATURE BAIE</span>
          <ThermometerSun className="w-4 h-4 text-bay" />
        </div>
        <div className="mt-2.5 inline-block font-mono text-bay bg-stone-100/80 px-3 py-1.5 rounded-lg text-xl sm:text-2xl font-semibold tracking-wide">
          +38°C
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 mt-3 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200/80 text-[11px] text-kelp font-mono font-medium">
            Gradient ascendant
          </div>
        </div>
        <div className="text-[11px] text-ink/65 font-sans mt-1.5">
          Colonne abyssale ascendante
        </div>
      </div>

      {/* 3. Pression / Cisaillement */}
      <div className="bg-white/90 rounded-2xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-stone-300 transition-colors">
        <div className="flex items-center justify-between text-ink/70 font-mono text-xs">
          <span className="tracking-wider">// CONTRAINTE / SURFACE</span>
          <Compass className="w-4 h-4 text-dataBlue" />
        </div>
        <div className="mt-2.5 inline-block font-mono text-dataBlue bg-stone-100/80 px-3 py-1.5 rounded-lg text-xl sm:text-2xl font-semibold tracking-wide">
          P = F/S
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 mt-3 px-2 py-0.5 rounded bg-sky-50 border border-sky-200/80 text-[11px] text-bay font-mono font-medium">
            Fluide non-newtonien
          </div>
        </div>
        <div className="text-[11px] text-ink/65 font-sans mt-1.5">
          Vecteur de force dévié
        </div>
      </div>

      {/* 4. Statut de l'enquête */}
      <div className="bg-white/90 rounded-2xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group hover:border-stone-300 transition-colors">
        <div className="flex items-center justify-between text-ink/70 font-mono text-xs">
          <span className="tracking-wider">// ENQUÊTE INDÉPENDANTE</span>
          <ShieldAlert className="w-4 h-4 text-amberAccent" />
        </div>
        <div className="mt-2.5 inline-block font-mono text-bay bg-stone-100/80 px-3 py-1.5 rounded-lg text-lg sm:text-xl font-semibold tracking-wide uppercase">
          Méthode active
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 mt-3 px-2 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 font-mono font-medium">
            Réfutation empirique
          </div>
        </div>
        <div className="text-[11px] text-ink/65 font-sans mt-1.5">
          Face au déni institutionnel
        </div>
      </div>
    </div>
  );
}
