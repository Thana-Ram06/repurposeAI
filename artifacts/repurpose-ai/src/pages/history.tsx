import { useHistory } from "@/hooks/use-repurpose";
import { motion } from "framer-motion";
import { Calendar, FileText, Loader2, ArrowRight } from "lucide-react";
import Layout from "@/components/layout";
import { Link } from "wouter";

export default function History() {
  const { data, isLoading, isError } = useHistory();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Generation History</h1>
          <p className="text-muted-foreground text-lg">Access your previously repurposed content.</p>
        </div>

        {isLoading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : isError ? (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-6 text-center">
            Failed to load history. Please try again later.
          </div>
        ) : !data?.items?.length ? (
          <div className="bg-card/40 border border-white/5 rounded-3xl p-16 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-foreground">No history yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't generated any content yet. Head over to the generator to create your first viral post.
              </p>
            </div>
            <Link 
              href="/generate"
              className="mt-4 bg-white/10 hover:bg-white/15 text-foreground px-6 py-3 rounded-xl font-medium transition-colors border border-white/10 flex items-center gap-2"
            >
              Start Generating <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 hover:border-white/15 transition-all group flex flex-col h-full cursor-pointer hover:bg-card/60"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 capitalize">
                    {item.tone}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-foreground/80 line-clamp-4 text-sm leading-relaxed mb-6">
                    "{item.inputText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-2 flex-wrap">
                  {item.tweets?.length > 0 && <span className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-md">Twitter</span>}
                  {item.linkedin && <span className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-md">LinkedIn</span>}
                  {item.blog && <span className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-md">Blog</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
