import { Mic, Search, MessageCircle, Activity, Pill, Stethoscope, ArrowRight, ChevronLeft, Plus } from 'lucide-react';
import { useState } from 'react';

interface InputHubProps {
  onInputSubmit: (input: string) => void;
  onModuleSelect: (module: 'symptoms' | 'decision' | 'medication' | 'specialist') => void;
  userInput: string;
}

type Screen = 'splash' | 'input';

export function InputHub({ onInputSubmit, onModuleSelect, userInput }: InputHubProps) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [screen, setScreen] = useState<Screen>('splash');
  const hasSubmittedInput = userInput.length > 0;

  const handleSubmit = () => {
    if (input.trim()) {
      onInputSubmit(input);
      setInput('');
    }
  };

  const handleRecordingComplete = () => {
    setIsRecording(false);
    const voiceInput = 'pet mein dard hai aur bukhar hai';
    onInputSubmit(voiceInput);
  };

  const modules = [
    {
      id: 'symptoms' as const,
      title: 'Symptom Checker',
      description: 'AI diagnosis from your symptoms',
      icon: MessageCircle,
      accent: 'bg-[#EEF4FF] text-[#3B6FD4]',
      iconBg: 'bg-[#3B6FD4]',
    },
    {
      id: 'decision' as const,
      title: 'Go or Stay Home',
      description: 'Should you visit a hospital?',
      icon: Activity,
      accent: 'bg-[#EDFAF5] text-[#1B8C67]',
      iconBg: 'bg-[#1B8C67]',
    },
    {
      id: 'medication' as const,
      title: 'Medication Check',
      description: 'Check drug safety & interactions',
      icon: Pill,
      accent: 'bg-[#FFF7ED] text-[#C2621A]',
      iconBg: 'bg-[#C2621A]',
    },
    {
      id: 'specialist' as const,
      title: 'Find a Specialist',
      description: 'Get matched to the right doctor',
      icon: Stethoscope,
      accent: 'bg-[#F5F0FF] text-[#7048C8]',
      iconBg: 'bg-[#7048C8]',
    },
  ];

  const features = [
    { label: 'Symptom checker', icon: MessageCircle },
    { label: 'Hospital triage', icon: Activity },
    { label: 'Drug interactions', icon: Pill },
    { label: 'Specialist finder', icon: Stethoscope },
  ];

  if (screen === 'splash') {
    return (
      <div className="relative flex min-h-[520px] w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        {/* Decorative background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-[0.07]"
          style={{ background: '#136382', filter: 'blur(64px)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-8 h-48 w-48 rounded-full opacity-[0.06]"
          style={{ background: '#26A68A', filter: 'blur(48px)' }}
        />

        {/* Logo mark */}
        <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#136382] shadow-lg">
          <Plus className="h-9 w-9 text-white" strokeWidth={2.5} />
        </div>

        {/* Brand */}
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-[#0f2d38]">
          Med<span className="text-[#136382]">Bridge</span>
        </h1>
        <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-500">
          Your AI healthcare assistant. Describe symptoms in English or Urdu — we'll help you navigate what comes next.
        </p>

        {/* Feature pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {features.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-[#136382]" />
              {label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setScreen('input')}
          className="group flex items-center gap-2 rounded-full bg-[#136382] px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#0f4f65] hover:shadow-lg active:scale-95"
        >
          Get started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        <p className="mt-5 text-[11px] text-gray-400">
          Not a substitute for professional medical advice
        </p>
      </div>
    );
  }

  // Input screen
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-8 pt-5 sm:px-6">
      {/* Back button */}
      {!hasSubmittedInput && (
        <button
          onClick={() => setScreen('splash')}
          className="mb-4 flex w-fit items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-600"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#136382]">
          <Plus className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-tight text-[#0f2d38]">MedBridge</h1>
          <p className="text-xs text-gray-400">AI Healthcare Assistant</p>
        </div>
      </div>

      {/* Input card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-medium text-[#136382]">
          {hasSubmittedInput ? 'Your concern' : 'How can we help you?'}
        </h2>

        {hasSubmittedInput ? (
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-700">"{userInput}"</p>
            <button
              onClick={() => onInputSubmit('')}
              className="mt-2 text-xs text-[#136382] underline underline-offset-2 hover:text-[#0f4f65]"
            >
              Clear &amp; start over
            </button>
          </div>
        ) : (
          <>
            <div className="relative mb-3">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 transition-all focus-within:border-[#136382] focus-within:bg-white">
                <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Type: 'pet mein dard hai' or 'stomach pain…'"
                  className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
                {input.trim() && (
                  <button
                    onClick={handleSubmit}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#136382] text-white transition hover:bg-[#0f4f65] active:scale-95"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <button
              onClick={() => {
                if (isRecording) {
                  handleRecordingComplete();
                } else {
                  setIsRecording(true);
                }
              }}
              className={`flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-4 text-sm font-medium transition active:scale-95 ${
                isRecording
                  ? 'bg-[#26A68A] text-white'
                  : 'border border-gray-200 bg-gray-50 text-gray-600 hover:border-[#136382] hover:bg-white hover:text-[#136382]'
              }`}
            >
              <Mic className="h-4 w-4" />
              {isRecording ? 'Recording… tap to stop' : 'Voice input — speak now'}
            </button>

            {isRecording && (
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#EDFAF5] px-4 py-3">
                <div className="flex items-end gap-0.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-[#26A68A]"
                      style={{
                        height: `${8 + i * 4}px`,
                        animation: 'pulse 0.8s ease-in-out infinite alternate',
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#1B8C67]">Listening with Whisper AI…</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Module grid */}
      {hasSubmittedInput && (
        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-sm font-medium text-gray-500">Choose a tool</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => onModuleSelect(module.id)}
                  className="group flex items-center gap-3.5 rounded-xl border border-gray-100 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm active:scale-[0.99]"
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${module.iconBg}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{module.title}</p>
                    <p className="mt-0.5 truncate text-xs text-gray-400">{module.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasSubmittedInput && (
        <div className="flex flex-col items-center px-2 py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
            <MessageCircle className="h-6 w-6 text-[#136382]" />
          </div>
          <p className="text-sm font-medium text-gray-700">Describe your symptoms</p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-400">
            Type or speak your health concern, then pick which tool you'd like to use
          </p>
        </div>
      )}
    </div>
  );
}
