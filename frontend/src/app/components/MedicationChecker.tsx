import { Plus, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function MedicationChecker() {
  const [medications, setMedications] = useState(['Panadol', 'Brufen', 'Calpol']);
  const [newMed, setNewMed] = useState('');
  const [checked, setChecked] = useState(true);

  const addMedication = () => {
    if (newMed.trim()) {
      setMedications([...medications, newMed.trim()]);
      setNewMed('');
      setChecked(false);
    }
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
    setChecked(false);
  };

  const checkInteractions = () => {
    setChecked(true);
  };

  const interactions = [
    { drug1: 'Panadol', drug2: 'Calpol', risk: 'high', description: 'Both contain paracetamol - risk of overdose' },
    { drug1: 'Brufen', drug2: 'Panadol', risk: 'low', description: 'Can be taken together with proper spacing' }
  ];

  const isSafe = !interactions.some(i => i.risk === 'high');

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 text-center" style={{ backgroundColor: '#136382' }}>
        <h2 className="text-white text-2xl">Medication Checker</h2>
        <p className="text-white/90 text-sm mt-1">Check drug interactions</p>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-5">
        {/* Add Medication */}
        <div className="bg-white rounded-[32px] p-6">
          <h3 className="mb-4" style={{ color: '#136382' }}>Add Medications</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMedication()}
              placeholder="e.g., Panadol, Aspirin..."
              className="flex-1 px-5 py-4 rounded-[24px] bg-gray-50 text-base outline-none"
            />
            <button
              onClick={addMedication}
              className="p-4 rounded-full"
              style={{ backgroundColor: '#26A68A' }}
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Medication Tags (Pill-shaped) */}
        <div className="bg-white rounded-[32px] p-6">
          <h3 className="mb-4" style={{ color: '#136382' }}>Your Medications ({medications.length})</h3>
          {medications.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No medications added yet</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {medications.map((med, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border-2 shadow-sm"
                  style={{
                    backgroundColor: '#26A68A',
                    borderColor: '#1a7a5e'
                  }}
                >
                  <span className="text-white">{med}</span>
                  <button onClick={() => removeMedication(idx)} className="hover:scale-110 transition-transform">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check Button */}
        {medications.length >= 2 && !checked && (
          <button
            onClick={checkInteractions}
            className="w-full px-6 py-5 rounded-[28px] text-white text-xl transition-all shadow-lg"
            style={{ backgroundColor: '#136382' }}
          >
            Check for Interactions
          </button>
        )}

        {/* Safe/Dangerous Banner */}
        {checked && (
          <div
            className="rounded-[32px] p-6 shadow-lg border-4"
            style={{
              backgroundColor: isSafe ? '#26A68A' : '#d4183d',
              borderColor: isSafe ? '#1a7a5e' : '#b01530'
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{
                  backgroundColor: isSafe ? '#E2F9D3' : '#ffe0e0'
                }}
              >
                {isSafe ? (
                  <CheckCircle className="w-10 h-10" style={{ color: '#26A68A' }} />
                ) : (
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                )}
              </div>
              <div>
                <h3 className="text-2xl text-white mb-1">
                  {isSafe ? 'SAFE COMBINATION' : 'DANGEROUS - DO NOT MIX'}
                </h3>
                <p className="text-white/90">
                  {isSafe ? 'Medications can be taken together' : 'High risk of serious side effects'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Interaction Details */}
        {checked && interactions.length > 0 && (
          <div className="bg-white rounded-[32px] p-6">
            <h3 className="mb-4" style={{ color: '#136382' }}>Interaction Details</h3>
            <div className="space-y-3">
              {interactions.map((interaction, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-[24px] border-l-4"
                  style={{
                    backgroundColor: interaction.risk === 'high' ? '#ffe0e0' :
                      interaction.risk === 'medium' ? '#fff4e0' : '#E2F9D3',
                    borderColor: interaction.risk === 'high' ? '#d4183d' :
                      interaction.risk === 'medium' ? '#FFA500' : '#26A68A'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: '#136382' }}>
                      {interaction.drug1} + {interaction.drug2}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs uppercase tracking-wide text-white"
                      style={{
                        backgroundColor: interaction.risk === 'high' ? '#d4183d' :
                          interaction.risk === 'medium' ? '#FFA500' : '#26A68A'
                      }}
                    >
                      {interaction.risk} risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{interaction.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
