import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Wand2, ArrowRight, Zap, RefreshCw, BarChart } from "lucide-react";
import Layout from "@/components/layout";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [inputText, setInputText] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Pass the text to the generate page via URL state or params
    // Using encodeURIComponent to safely pass the string
    setLocation(`/generate?text=${encodeURIComponent(inputText)}`);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Lightning Fast",
      description: "Get a month's worth of content in seconds. Stop staring at a blank page."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-primary" />,
      title: "Multi-Format",
      description: "One idea becomes Twitter threads, LinkedIn posts, blogs, and video scripts instantly."
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      title: "Optimized for Reach",
      description: "AI trained on thousands of viral posts to maximize your engagement and growth."
    }
  ];

  return (
    <Layout>
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Hero background"
          className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        {/* Glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <SparklesIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-white/80">The Ultimate AI Content Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] text-foreground mb-6"
        >
          Turn Any Content Into <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary via-emerald-300 to-teal-200 bg-clip-text text-transparent">Viral Gold.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          Instantly repurpose a single idea or raw transcript into high-performing Twitter threads, LinkedIn posts, blog articles, and captivating hooks using advanced AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-3xl relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-emerald-500/30 rounded-3xl blur-xl opacity-50 transition-opacity duration-500" />
          
          <form 
            onSubmit={handleGenerate}
            className="relative bg-card/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:border-primary/50 focus-within:ring-4 ring-primary/10"
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your YouTube transcript, blog post, or rough idea here..."
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[120px] sm:min-h-[60px] p-4 text-foreground placeholder:text-muted-foreground focus:ring-0 text-base"
            />
            <div className="flex items-end justify-end sm:items-center sm:justify-center p-2">
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] hover:shadow-[0_0_60px_-10px_rgba(22,163,74,0.7)] hover:-translate-y-0.5"
              >
                <span>Generate Magic</span>
                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full"
        >
          {features.map((feature, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-left hover:bg-white/[0.04] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
