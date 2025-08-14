import LoadingSpinner from './ui/LoadingSpinner';

interface QuoteData {
  content: string;
  author: string;
}

interface QuoteOfTheDayProps {
  data: QuoteData | undefined;
  error: Error | null;
}

export default function QuoteOfTheDay({ data, error }: QuoteOfTheDayProps) {
  const isLoading = !data && !error;
  
  return (
    <div className="glass-effect p-8 rounded-2xl card-hover">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold gradient-text">Inspirational Quote</h2>
        <div className="text-2xl">💭</div>
      </div>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-400">Finding the perfect quote...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">Quote Unavailable</h3>
          <p className="text-gray-400 text-sm">
            We couldn&apos;t fetch an inspirational quote right now.
          </p>
        </div>
      )}
      
      {data && (
        <div className="space-y-6">
          <figure className="text-center">
            <blockquote className="text-2xl md:text-3xl italic leading-relaxed text-white mb-6">
              &ldquo;{data.content}&rdquo;
            </blockquote>
            <figcaption className="text-lg text-purple-300 font-medium">
              — {data.author}
            </figcaption>
          </figure>
          
          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}