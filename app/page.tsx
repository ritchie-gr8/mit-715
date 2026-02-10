'use client'

import React, { useState } from 'react';
import {
  User,
  Search,
  Bell,
  Settings,
  ChevronRight,
  ChevronLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
  Play,
  LayoutGrid,
  List,
  LogOut,
  Award
} from 'lucide-react';

// --- Types ---

interface Exam {
  id: string;
  title: string;
  category: string;
  duration: number; // minutes
  questions: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Not Started' | 'In Progress' | 'Completed';
  imageColor: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

// --- Mock Data ---

const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    title: 'PowerBI Fundamentals 101',
    category: 'Skills',
    duration: 45,
    questions: 10,
    level: 'Beginner',
    status: 'Not Started',
    imageColor: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'Workplace Ethics & Compliance',
    category: 'HR Policy',
    duration: 30,
    questions: 15,
    level: 'Intermediate',
    status: 'Not Started',
    imageColor: 'bg-emerald-600'
  },
  {
    id: '3',
    title: 'Advanced Excel Data Analysis',
    category: 'Skills',
    duration: 60,
    questions: 20,
    level: 'Advanced',
    status: 'Completed',
    imageColor: 'bg-purple-600'
  }
];

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which of the following is considered a strong password policy?",
    options: [
      "Using the same password for all accounts",
      "Using 'password123' for ease of memory",
      "A mix of uppercase, lowercase, numbers, and special characters, at least 12 chars long",
      "Sharing your password only with your manager"
    ],
    correct: 2
  },
  {
    id: 2,
    text: "What implies a 'Phishing' attack?",
    options: [
      "A deep sea fishing trip sponsored by the company",
      "An email pretending to be a reputable source to steal sensitive data",
      "Installing antivirus software",
      "Updating your operating system"
    ],
    correct: 1
  },
  {
    id: 3,
    text: "When leaving your desk, you should always:",
    options: [
      "Turn off the monitor",
      "Lock your computer (Win + L)",
      "Leave your email open",
      "Ask a colleague to watch it"
    ],
    correct: 1
  }
];

// --- Colors (Power Apps Palette) ---
// Blue: #0078d4 (Primary)
// Dark Gray: #323130
// Light Gray: #f3f2f1 (Canvas Background)
// White: #ffffff

// --- Components ---

const Header = ({ user = "CK", role = "Product Manager" }) => (
  <div className="h-16 bg-[#0078d4] flex items-center justify-between px-6 shadow-md z-10 text-white shrink-0">
    <div className="flex items-center gap-4">
      <div className="p-2 hover:bg-white/10 rounded cursor-pointer transition-colors">
        <LayoutGrid size={24} />
      </div>
      <span className="font-semibold text-lg tracking-wide">Assessment Portal</span>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex flex-col items-end">
        <span className="text-sm font-semibold">{user}</span>
        <span className="text-xs opacity-80">{role}</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30 cursor-pointer">
        <User size={20} />
      </div>
    </div>
  </div>
);

const Sidebar = ({ active }: { active: string }) => {
  const items = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'courses', icon: List, label: 'My Courses' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'awards', icon: Award, label: 'Certificates' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-full shrink-0">
      <div className="flex-1 py-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`
              flex items-center gap-4 px-6 py-3 cursor-pointer border-l-4 transition-all
              ${active === item.id
                ? 'border-[#0078d4] bg-gray-100 font-semibold text-[#0078d4]'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300'}
            `}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-600 cursor-pointer transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

// --- Screen 1: Dashboard ---

const Dashboard = ({ onStartExam }: { onStartExam: (exam: Exam) => void }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#faf9f8]">
      {/* Top Action Bar */}
      <div className="bg-white border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-8 py-4 shrink-0">
        <h1 className="text-lg sm:text-xl font-semibold text-[#323130]">Employee Dashboard</h1>
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search assessments..."
              className="pl-9 pr-4 py-1.5 border border-gray-400 rounded-sm w-full text-sm focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] placeholder:text-gray-500"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Bell size={20} /></button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Settings size={20} /></button>
          </div>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8">

        {/* Welcome Banner */}
        {/* <div className="bg-[#0078d4] text-white p-6 rounded-sm shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="opacity-90 max-w-xl">You have 2 pending assessments to complete this quarter. Keep up the good work to maintain your compliance status.</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-10"></div>
        </div> */}

        {/* Filters / Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#605e5c]">Assigned Assessments</h3>
          <div className="text-[#0078d4] text-sm font-semibold cursor-pointer hover:underline">View All</div>
        </div>

        {/* Gallery (Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0078d4] transition-all cursor-pointer group flex flex-col"
              onClick={() => onStartExam(exam)}
            >
              <div className={`h-28 ${exam.imageColor} relative p-4`}>
                 <span className="absolute top-4 right-4 bg-white/90 text-xs font-bold px-2 py-1 rounded text-[#323130]">
                   {exam.level}
                 </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                     {exam.category}
                   </span>
                </div>
                <h4 className="text-lg font-semibold text-[#323130] mb-1 group-hover:text-[#0078d4] transition-colors">
                  {exam.title}
                </h4>
                <div className="mt-auto pt-4 flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{exam.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle size={16} />
                    <span>{exam.questions} Qs</span>
                  </div>
                </div>
              </div>
              <div className="h-10 border-t border-gray-100 flex items-center justify-center bg-gray-50 text-[#0078d4] group-hover:bg-[#0078d4] group-hover:text-white transition-colors">
                <span className="text-sm font-semibold flex items-center gap-2">
                  Start Assessment <ChevronRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Screen 2: Intro / Instructions ---

const IntroScreen = ({ exam, onBack, onProceed }: { exam: Exam, onBack: () => void, onProceed: () => void }) => {
  return (
    <div className="flex-1 bg-white p-8 md:p-12 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-3xl w-full border border-gray-200 shadow-lg bg-white rounded-sm overflow-hidden flex flex-col md:flex-row h-[500px]">
        {/* Left Color Panel */}
        <div className={`${exam.imageColor} w-full md:w-1/3 p-8 text-white flex flex-col justify-between`}>
          <button onClick={onBack} className="text-white/80 hover:text-white flex items-center gap-2 text-sm">
             <ChevronLeft size={16} /> Back
          </button>
          <div>
            <h2 className="text-3xl font-bold mb-4">{exam.title}</h2>
            <div className="space-y-4">
               <div className="flex items-center gap-3 opacity-90">
                 <Clock size={20} />
                 <span className="text-lg">{exam.duration} Minutes</span>
               </div>
               <div className="flex items-center gap-3 opacity-90">
                 <LayoutGrid size={20} />
                 <span className="text-lg">{exam.questions} Questions</span>
               </div>
               <div className="flex items-center gap-3 opacity-90">
                 <Award size={20} />
                 <span className="text-lg">Passing Score: 80%</span>
               </div>
            </div>
          </div>
          <div className="text-sm opacity-70">ID: {exam.id}-2024</div>
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 p-8 md:p-10 flex flex-col bg-[#faf9f8]">
          <h3 className="text-xl font-bold text-[#323130] mb-6 border-b border-gray-300 pb-2">Instructions</h3>
          <div className="space-y-4 text-[#605e5c] overflow-y-auto flex-1 text-sm leading-relaxed">
            <p>1. This assessment is designed to test your knowledge on the subject matter. Please ensure you have a stable internet connection.</p>
            <p>2. Once you start, the timer will begin. You cannot pause the timer.</p>
            <p>3. You can flag questions for review and return to them before submitting.</p>
            <p>4. Do not refresh the browser or close the window, as your progress may be lost.</p>
            <p className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-sm text-xs">
              <strong>Note:</strong> This session is being recorded for proctoring purposes.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onBack}
              className="px-6 py-2 border border-gray-400 text-[#323130] font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onProceed}
              className="px-6 py-2 bg-[#0078d4] text-white font-semibold shadow-sm hover:bg-[#106ebe] active:scale-95 transition-all flex items-center gap-2"
            >
              Start Now <Play size={16} fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Screen 3: Assessment Player ---

const AssessmentPlayer = ({
  exam,
  onFinish
}: {
  exam: Exam,
  onFinish: () => void
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<number[]>([]);

  const question = MOCK_QUESTIONS[currentIndex] || MOCK_QUESTIONS[0];

  const handleSelect = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: optionIdx }));
  };

  // const toggleFlag = () => {
  //   if (flagged.includes(currentIndex)) {
  //     setFlagged(prev => prev.filter(i => i !== currentIndex));
  //   } else {
  //     setFlagged(prev => [...prev, currentIndex]);
  //   }
  // };

  const isLastQuestion = currentIndex === MOCK_QUESTIONS.length - 1;

  return (
    <div className="flex flex-col h-full bg-[#f3f2f1]">
      {/* Player Header */}
      <div className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-bold uppercase">{exam.title}</span>
          <span className="text-sm font-semibold text-[#323130]">Question {currentIndex + 1} of {MOCK_QUESTIONS.length}</span>
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded border border-gray-300 flex items-center gap-2 text-[#0078d4] font-mono font-bold">
          <Clock size={16} />
          24:12
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav (Question Grid) */}
        <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <span className="text-xs font-semibold text-gray-600">Overview</span>
          </div>
          <div className="p-4 grid grid-cols-4 gap-2 overflow-y-auto content-start">
            {MOCK_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isFlagged = flagged.includes(idx);
              const isCurrent = idx === currentIndex;

              let bgClass = "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"; // Default
              if (isAnswered) bgClass = "bg-blue-100 border-blue-300 text-blue-700";
              if (isCurrent) bgClass = "bg-[#0078d4] border-[#0078d4] text-white font-bold ring-2 ring-offset-1 ring-blue-300";

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 w-full border rounded-sm flex items-center justify-center text-sm relative transition-all ${bgClass}`}
                >
                  {idx + 1}
                  {isFlagged && <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-orange-500 rounded-full"></div>}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-auto p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 space-y-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 border border-gray-400 bg-white"></div> Not Visited</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-100 border border-blue-300"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#0078d4]"></div> Current</div>
            {/* <div className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full ml-0.5"></div> Flagged</div> */}
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-[#323130] leading-snug">
                {question.text}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = answers[currentIndex] === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`
                      relative p-4 border-2 rounded-sm cursor-pointer flex items-center gap-4 transition-all group
                      ${isSelected
                        ? 'border-[#0078d4] bg-blue-50/50'
                        : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'}
                    `}
                  >
                    {/* Power Apps Style Radio */}
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                      ${isSelected ? 'border-[#0078d4]' : 'border-gray-500 group-hover:border-gray-700'}
                    `}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#0078d4]"></div>}
                    </div>

                    <span className={`text-sm md:text-base ${isSelected ? 'font-semibold text-[#323130]' : 'text-[#605e5c]'}`}>
                      {String.fromCharCode(65 + idx)}. {opt}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="h-16 bg-white border-t border-gray-300 px-8 flex items-center justify-between shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-[#323130] border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm w-32"
        >
          Previous
        </button>

        {/* <button
          onClick={toggleFlag}
          className={`flex items-center gap-2 text-sm font-semibold hover:underline ${flagged.includes(currentIndex) ? 'text-orange-600' : 'text-gray-600'}`}
        >
          <AlertCircle size={16} />
          {flagged.includes(currentIndex) ? 'Flagged for Review' : 'Flag for Review'}
        </button> */}

        {isLastQuestion ? (
          <button
             onClick={onFinish}
             className="px-4 py-2 bg-green-700 text-white hover:bg-green-800 font-semibold text-sm w-32 shadow-sm"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(Math.min(MOCK_QUESTIONS.length - 1, currentIndex + 1))}
            className="px-4 py-2 bg-[#0078d4] text-white hover:bg-[#106ebe] font-semibold text-sm w-32 shadow-sm flex items-center justify-center gap-1"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// --- Screen 4: Results ---

const ResultScreen = ({ onHome }: { onHome: () => void }) => {
  return (
    <div className="flex-1 bg-[#f3f2f1] p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-sm p-8 text-center border border-gray-200">
         <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
           <CheckCircle2 size={48} className="text-green-600" />
         </div>

         <h2 className="text-3xl font-bold text-[#323130] mb-2">Congratulations!</h2>
         <p className="text-gray-500 mb-8">You have successfully completed the assessment.</p>

         <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 border border-gray-100 rounded">
               <div className="text-xs text-gray-500 uppercase font-bold">Score</div>
               <div className="text-3xl font-bold text-[#0078d4]">92%</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded">
               <div className="text-xs text-gray-500 uppercase font-bold">Correct</div>
               <div className="text-3xl font-bold text-green-600">28/30</div>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-100 rounded">
               <div className="text-xs text-gray-500 uppercase font-bold">Time</div>
               <div className="text-3xl font-bold text-gray-700">24m</div>
            </div>
         </div>

         <div className="flex justify-center gap-4">
           <button className="px-6 py-2 border border-[#0078d4] text-[#0078d4] font-semibold hover:bg-blue-50 transition-colors">
             Download Certificate
           </button>
           <button
             onClick={onHome}
             className="px-6 py-2 bg-[#0078d4] text-white font-semibold hover:bg-[#106ebe] shadow-sm transition-colors"
           >
             Back to Dashboard
           </button>
         </div>
      </div>
    </div>
  );
};

// --- Main App Controller ---

type ViewState = 'dashboard' | 'intro' | 'exam' | 'result';

export default function App() {
  const [view, setView] = useState<ViewState>('dashboard');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const handleStartExamClick = (exam: Exam) => {
    setSelectedExam(exam);
    setView('intro');
  };

  const handleStartAssessment = () => {
    setView('exam');
  };

  const handleFinishAssessment = () => {
    setView('result');
  };

  const handleHome = () => {
    setSelectedExam(null);
    setView('dashboard');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar is always visible except in exam mode to maximize focus, mimicking typical LMS behavior */}
        {view !== 'exam' && <Sidebar active={view === 'dashboard' ? 'dashboard' : ''} />}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
           {view === 'dashboard' && <Dashboard onStartExam={handleStartExamClick} />}
           {view === 'intro' && selectedExam && (
             <IntroScreen
               exam={selectedExam}
               onBack={() => setView('dashboard')}
               onProceed={handleStartAssessment}
             />
           )}
           {view === 'exam' && selectedExam && (
             <AssessmentPlayer
               exam={selectedExam}
               onFinish={handleFinishAssessment}
             />
           )}
           {view === 'result' && <ResultScreen onHome={handleHome} />}
        </div>
      </div>
    </div>
  );
}
