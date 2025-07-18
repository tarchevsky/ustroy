interface ContentBlockProps {
  content: string
}

const ContentBlock = ({ content }: ContentBlockProps) => {
  return (
    <div
      // className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default ContentBlock
