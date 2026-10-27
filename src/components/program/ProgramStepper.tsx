import { Check, User, CircleCheck } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

export default function ProgramStepper() {
  const steps: Step[] = [
    { id: 1, label: 'Registrasi', status: 'completed' },
    { id: 2, label: 'Validasi', status: 'completed' },
    { id: 3, label: 'Penempatan', status: 'completed' },
    { id: 4, label: 'Pelaksanaan', status: 'active' },
    { id: 5, label: 'Selesai', status: 'pending' },
  ];

  return (
    <div className="w-full rounded-xl border border-blue-300 bg-white p-6 shadow-sm">
      <div className="relative flex items-center justify-between">
        {/* Background track line */}
        <div className="absolute left-6 right-6 top-4 -translate-y-1/2">
          <div className="h-[2px] w-full bg-slate-200" />
        </div>

        {/* Dynamic colored progress track lines */}
        <div className="absolute left-6 top-4 w-[70%] -translate-y-1/2">
          <div className="h-[2px] w-full bg-[#10B981]" />
        </div>

        {/* Step Items */}
        {steps.map((step) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isPending = step.status === 'pending';

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Circle Icon Indicator */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                  isCompleted
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : isActive
                      ? 'bg-[#2563EB] text-white ring-4 ring-blue-100 shadow-sm'
                      : 'border-2 border-slate-300 bg-white text-slate-300'
                }`}
              >
                {isCompleted && <Check className="h-4 w-4 stroke-[3]" />}
                {isActive && <User className="h-4 w-4" />}
                {isPending && (
                  <CircleCheck className="h-4 w-4 text-slate-300" />
                )}
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-center text-xs font-medium tracking-tight ${
                  isCompleted
                    ? 'text-slate-700'
                    : isActive
                      ? 'font-bold text-slate-900'
                      : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
