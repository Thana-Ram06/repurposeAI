import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2, RefreshCw } from "lucide-react";
import { useGenerate } from "@/hooks/use-repurpose";
import { GenerateRequestTone } from "@workspace/api-client-react";
import Layout from "@/components/layout";
import { OutputCard } from "@/components/output-card";
import { useToast } from "@/hooks/use-toast";

export default function Generate() {
  const [location] = useLocation();
  const { toast } = useToast();
  
  const [text, setText] = useState("");
  const [tone, setTone] = useState<GenerateRequestTone>("professional");
  
  const generateMutation = useGenerate();

  // Extract text from URL on initial load if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const textParam = params.get("text");
    if (textParam) {
      setText(decodeURIComponent(textParam));
      // Clean up URL without triggering navigation reload
      window.history.replaceState({}, '', '/generate');
    }
  }, []);

  const handleGenerate = () => {
    if (!text.trim() || text.length < 10) {
      toast({
        title: "Input too short",
        description: "Please provide at least a sentence or two to generate good content.",
        variant: "destructive"
      });
      return;
    }

    generateMutation.mutate({ data: { text, tone } }, {
      onError: (err) => {
        toast({
          title: "Generation failed",
          description: err.message || "An error occurred while generating content.",
          variant: "destructive"
        });
      }
    });
  };

  const tones: { id: GenerateRequestTone; label: string }[] = [
    { id: "casual", label: "Casual" },
    { id: "professional", label: "Professional" },
    { id: "viral", label: "Viral" }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col gap-12">
        
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-4">
              <label className="text-sm font-medium text-foreground/80 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Source Material
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your raw text, transcript, or ideas here..."
                className="w-full flex-1 min-h-[200px] bg-black/20 border border-white/5 rounded-2xl p-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-4 ring-primary/10 transition-all resize-none text-lg leading-relaxed custom-scrollbar"
              />
            </div>
            
            <div className="w-full md:w-[320px] flex flex-col gap-8 shrink-0">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-foreground/80 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Select Tone
                </label>
                <div className="flex flex-col gap-3">
                  {tones.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`relative px-5 py-4 rounded-xl text-left font-medium transition-all duration-300 border ${
                        tone === t.id 
                          ? "bg-primary/10 text-primary border-primary/30" 
                          : "bg-white/5 text-muted-foreground border-transparent hover:bg-white/10 hover:text-foreground"
                      }`}
                    >
                      {tone === t.id && (
                        <motion.div 
                          layoutId="active-tone" 
                          className="absolute inset-0 border-2 border-primary rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={generateMutation.isPending || !text.trim()}
                className="mt-auto w-full flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground px-6 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(22,163,74,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" />
                    Generate Content
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {generateMutation.isPending && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 flex flex-col items-center justify-center gap-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
              </div>
              <p className="text-xl font-serif text-muted-foreground animate-pulse">
                Distilling your thoughts into viral gold...
              </p>
            </motion.div>
          )}

          {generateMutation.isSuccess && generateMutation.data && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <h2 className="text-3xl font-serif text-foreground">Your Generated Content</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                <button 
                  onClick={handleGenerate}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="col-span-1 lg:col-span-2">
                  <OutputCard title="LinkedIn Post" content={generateMutation.data.linkedin} delay={0.1} />
                </div>
                
                <OutputCard title="Twitter Thread" content={generateMutation.data.tweets} delay={0.2} />
                <OutputCard title="Viral Hooks" content={generateMutation.data.hooks} delay={0.3} />
                
                <div className="col-span-1 lg:col-span-2">
                  <OutputCard title="Blog Outline / Post" content={generateMutation.data.blog} delay={0.4} />
                </div>
                
                <div className="col-span-1 lg:col-span-2">
                  <OutputCard title="Short-form Captions" content={generateMutation.data.captions} delay={0.5} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
}
