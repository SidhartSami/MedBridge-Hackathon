import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SymptomCheckerProps {
  userInput?: string;
}

export function SymptomChecker({ userInput = "pet mein dard hai" }: SymptomCheckerProps) {
  const conditions = [
    {
      name: 'Viral Gastroenteritis',
      confidence: 85,
      severity: 'low',
      description: 'Common stomach infection causing digestive issues'
    },
    {
      name: 'Food Poisoning',
      confidence: 65,
      severity: 'medium',
      description: 'Possible contaminated food consumption'
    },
    {
      name: 'Appendicitis',
      confidence: 15,
      severity: 'high',
      description: 'Inflammation of the appendix (requires immediate attention)'
    }
  ];

  const homeCareTips = [
    'Stay hydrated - drink ORS or water every hour',
    'Rest for at least 24-48 hours',
    'Eat bland foods (rice, toast, bananas)',
    'Avoid dairy and spicy foods',
    'Monitor temperature - seek help if above 102°F'
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 text-center" style={{ backgroundColor: '#136382' }}>
        <h2 className="text-white text-2xl">Symptom Analysis Results</h2>
        <p className="text-white/90 text-sm mt-1">Based on: "{userInput}"</p>
      </div>

      <div className="px-6 py-6 space-y-5">
        {/* Condition Cards */}
        <div>
          <h3 className="mb-4" style={{ color: '#136382' }}>Possible Conditions</h3>
          <div className="space-y-4">
            {conditions.map((condition, idx) => (
              <div key={idx} className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg mb-1" style={{ color: '#136382' }}>
                      {condition.name}
                    </h4>
                    <p className="text-sm text-gray-600">{condition.description}</p>
                  </div>
                  {condition.severity === 'high' && (
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 ml-2" />
                  )}
                </div>

                {/* Confidence Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Confidence</span>
                    <span style={{ color: '#136382' }}>{condition.confidence}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${condition.confidence}%`,
                        backgroundColor: condition.severity === 'high' ? '#d4183d' :
                          condition.severity === 'medium' ? '#FFA500' : '#26A68A'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flag Warning */}
        <div className="bg-red-50 border-2 border-red-200 rounded-[28px] p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-red-600 mb-2">Red Flags - Seek Immediate Care If:</h4>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• Severe abdominal pain (8/10 or higher)</li>
                <li>• Blood in stool or vomit</li>
                <li>• High fever (103°F+) with chills</li>
                <li>• Unable to keep down liquids for 24 hours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Home Care Checklist */}
        <div className="bg-white rounded-[28px] p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-6 h-6" style={{ color: '#26A68A' }} />
            <h3 style={{ color: '#136382' }}>Home Care Checklist</h3>
          </div>
          <div className="space-y-3">
            {homeCareTips.map((tip, idx) => (
              <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-0.5 rounded accent-[#26A68A] cursor-pointer"
                />
                <span className="text-gray-700 leading-relaxed group-hover:text-gray-900">
                  {tip}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
