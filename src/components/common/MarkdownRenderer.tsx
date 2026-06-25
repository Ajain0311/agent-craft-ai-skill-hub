import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, className }) => {
  return (
    <div className={`markdown-content ${className || ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node: _n, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-3 border-b pb-2" {...props} />,
          h2: ({ node: _n, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-2" {...props} />,
          h3: ({ node: _n, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
          h4: ({ node: _n, ...props }) => <h4 className="text-lg font-semibold mt-3 mb-1" {...props} />,
          h5: ({ node: _n, ...props }) => <h5 className="text-base font-semibold mt-2 mb-1" {...props} />,
          h6: ({ node: _n, ...props }) => <h6 className="text-sm font-semibold mt-1 mb-1" {...props} />,
          p: ({ node: _n, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          a: ({ node: _n, ...props }) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({ node: _n, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
          ol: ({ node: _n, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
          li: ({ node: _n, ...props }) => <li className="mb-1" {...props} />,
          blockquote: ({ node: _n, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-600" {...props} />,
          code: ({ node: _n, inline, ...props }) => {
            if (inline) {
              return <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono" {...props} />;
            }
            return (
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm font-mono">
                <code {...props} />
              </pre>
            );
          },
          table: ({ node: _n, ...props }) => <table className="w-full border-collapse my-4 text-sm" {...props} />,
          th: ({ node: _n, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left bg-gray-100 font-semibold" {...props} />,
          td: ({ node: _n, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
          hr: ({ node: _n, ...props }) => <hr className="my-8 border-t border-gray-300" {...props} />,
          img: ({ node: _n, ...props }) => <img className="max-w-full h-auto rounded-md my-4" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
