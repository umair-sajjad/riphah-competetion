import { useState, useEffect } from 'react';

const quotes = [
  "Focus is the gateway to thinking clearly.",
  "Small progress is still progress.",
  "You are capable of amazing things.",
  "One step at a time, one day at a time.",
  "Believe you can and you're halfway there.",
  "Success is the sum of small efforts repeated.",
  "Don't watch the clock; do what it does. Keep going.",
  "The secret of getting ahead is getting started.",
  "You don't have to be great to start, but you have to start to be great.",
  "Focus on being productive instead of busy."
];

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('focusTimerUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`focusSessions_${user.email}`);
      if (saved) {
        setSessions(JSON.parse(saved));
      }
    }
  }, [user]);

  useEffect(() => {
    document.title = isActive 
      ? `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - FocusTimer`
      : 'FocusTimer';
  }, [isActive, minutes, seconds]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGi77OibUBELTqXh8LJnHgU2jdXvz3oqBSp7x/LaizsIHGS57OmlUBQOUqbo8K9oIAU2kdfyz3osBSh5yPDajDwMHmG56+mjTxELTKPg7rBlHQU0i9Twz3wsBSh3x+/biz0MH2K77OmkUBQPUqXn77FqIgU4ktjx0HsrBSl5yO/ajTsLHV+56+mjUBELTKLh77RnHgY2jdXw0HwrBSh5x/DajDsLHV+56+mjTxIMTaPh77RnHwU3jdXw0HsrBSh5yO/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwMHV+56+mjUBELTKPg7rBlHQU0i9Twz3wsBSh3x+/bjDwMHmG76+ijUBQPUqXn77FpIgU4ktjy0HsrBSl6ye/bjDwM');
            audio.play().catch(() => {});

            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote);
            
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              const newSession = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                type: 'Focus',
                duration: '25:00'
              };
              const updatedSessions = [newSession, ...sessions];
              setSessions(updatedSessions);
              localStorage.setItem(`focusSessions_${user.email}`, JSON.stringify(updatedSessions));
              
              setMinutes(5);
              setIsBreak(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, sessions, user]);

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('focusTimerUsers') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userToSave = { email: foundUser.email, name: foundUser.name };
        setUser(userToSave);
        localStorage.setItem('focusTimerUser', JSON.stringify(userToSave));
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!name || !email || !password) {
        setError('All fields are required');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      const users = JSON.parse(localStorage.getItem('focusTimerUsers') || '[]');
      
      if (users.find(u => u.email === email)) {
        setError('Email already exists');
        return;
      }

      const newUser = { email, password, name };
      users.push(newUser);
      localStorage.setItem('focusTimerUsers', JSON.stringify(users));

      const userToSave = { email, name };
      setUser(userToSave);
      localStorage.setItem('focusTimerUser', JSON.stringify(userToSave));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('focusTimerUser');
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
    setSessions([]);
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const clearHistory = () => {
    setSessions([]);
    localStorage.removeItem(`focusSessions_${user.email}`);
  };

  const totalSessions = sessions.length;
  const totalMinutes = totalSessions * 25;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-blue-500/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 tracking-tight">
                FocusTimer
              </h1>
              <p className="text-slate-400">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                  />
                </div>
              )}
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-blue-500/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl w-full">
          
          <div className="flex justify-between items-center mb-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
              <p className="text-slate-400 text-sm">Welcome back</p>
              <p className="text-white font-semibold">{user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-slate-400 hover:text-white hover:border-red-400/30 transition-all"
            >
              Logout
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3 tracking-tight">
                  FocusTimer
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <div className={`w-2 h-2 rounded-full ${isBreak ? 'bg-cyan-400' : 'bg-blue-400'} animate-pulse`}></div>
                  <p className="text-slate-300 text-sm font-medium">
                    {isBreak ? 'Break Mode' : 'Focus Mode'}
                  </p>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-12 mb-8 hover:border-cyan-400/30 transition-all duration-300">
                <div className="text-center">
                  <div className="text-8xl font-bold text-white mb-8 tracking-tight tabular-nums">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed max-w-md mx-auto">
                    {quote}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                <button 
                  onClick={handleStart}
                  disabled={isActive}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 border border-cyan-400/50'
                  }`}
                >
                  Start
                </button>
                <button 
                  onClick={handlePause}
                  disabled={!isActive}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    !isActive 
                      ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  Pause
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-300"
                >
                  Reset
                </button>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Sessions</p>
                    <p className="text-3xl font-bold text-white">{totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Total Time</p>
                    <p className="text-3xl font-bold text-white">{totalMinutes}m</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  History
                </h2>
                {sessions.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {sessions.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 border-2 border-cyan-400/50 rounded-full"></div>
                    </div>
                    <p className="text-slate-500">
                      No sessions yet
                    </p>
                    <p className="text-slate-600 text-sm mt-2">
                      Start your first focus session
                    </p>
                  </div>
                ) : (
                  sessions.map((session, index) => (
                    <div 
                      key={session.id}
                      className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-xl p-4 hover:border-cyan-400/30 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-white mb-1">
                            Focus Session
                          </p>
                          <p className="text-sm text-slate-400">
                            {session.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            {session.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;