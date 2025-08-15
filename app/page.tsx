import Dashboard from '@/components/Dashboard';

export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden'>
      {/* Aurora Borealis Particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-20 w-2 h-2 bg-aurora-green rounded-full animate-float animate-glow-pulse'></div>
        <div
          className='absolute top-40 right-40 w-1 h-1 bg-aurora-blue rounded-full animate-float'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-aurora-purple rounded-full animate-float'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute top-1/2 right-20 w-1 h-1 bg-aurora-pink rounded-full animate-float'
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className='absolute bottom-40 right-1/3 w-2 h-2 bg-aurora-teal rounded-full animate-float animate-glow-pulse'
          style={{ animationDelay: '4s' }}
        ></div>
        <div
          className='absolute top-1/3 left-1/4 w-1 h-1 bg-aurora-cyan rounded-full animate-float'
          style={{ animationDelay: '5s' }}
        ></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 w-full'>
        <Dashboard />
      </div>
    </main>
  );
}
