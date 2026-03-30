import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface OutputCardProps {
  title: string;
  content: string | string[];
  delay?: number;
}

export function OutputCard({ title, content, delay = 0 }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const textToCopy = Array.isArray(content) ? content.join("\n\n") : content;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast({ 
      title: "Copied to clipboard", 
      description: `Your ${title.toLowerCase()} content is ready to share!`,
      duration: 2500 
    });
    setTimeout(() => setCopied(false), 2500);
  };

  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-2xl shadow-black/40 group relative flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between relative z-10">
        <h3 className="font-serif text-2xl text-foreground flex items-center gap-3">
          {title}
        </h3>
        <button
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group/btn border border-transparent hover:border-primary/30"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline-block">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 text-[15px] text-muted-foreground leading-relaxed flex-1 overflow-y-auto max-h-[350px] custom-scrollbar relative z-10">
        {Array.isArray(content) ? (
          <div className="space-y-6">
            {content.map((item, i) => (
              <div key={i} className="pb-6 border-b border-white/5 last:border-0 last:pb-0 relative">
                <span className="absolute -left-2 -top-2 text-[10px] font-mono text-white/10 font-bold select-none">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-foreground/80">{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-foreground/80">{content}</div>
        )}
      </div>
    </motion.div>
  );
}
