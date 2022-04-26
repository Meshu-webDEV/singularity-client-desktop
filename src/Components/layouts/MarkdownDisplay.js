import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownDisplay = ({ value, dense = false, className }) => {
  if (dense)
    return (
      <div className={`text-whites-light flex flex-col py-1 px-1 ${className}`}>
        <ReactMarkdown
          disallowedElements={['img']}
          className='markdown mobile'
          remarkPlugins={[remarkGfm]}
        >
          {value}
        </ReactMarkdown>
      </div>
    );

  return (
    <div className={`text-whites-light flex flex-col py-4 ${className}`}>
      <ReactMarkdown
        disallowedElements={['img']}
        className='markdown mobile'
        remarkPlugins={[remarkGfm]}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
};
export default MarkdownDisplay;
