import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Code,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from 'lucide-react'

function ToolbarButton({ onClick, active = false, disabled = false, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`cursor-pointer rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'bg-primary text-white'
          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  )
}

export default function Editor({ value, onChange, error }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Placeholder.configure({ placeholder: 'Start writing your story...' }),
    ],
    content: value,
    // Re-render on every change so the toolbar buttons show which formats are active
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      // An empty editor returns '' instead of '<p></p>', which makes validation easy
      onChange(editor.isEmpty ? '' : editor.getHTML())
    },
    editorProps: {
      attributes: { class: 'tiptap min-h-72 px-4 py-3 focus:outline-none' },
    },
  })

  if (!editor) return null

  const run = (command) => () => command(editor.chain().focus()).run()

  return (
    <div>
      <div
        className={`overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 dark:bg-navy-light ${
          error
            ? 'border-red-400 focus-within:ring-red-200 dark:focus-within:ring-red-900'
            : 'border-slate-300 focus-within:border-primary focus-within:ring-primary/20 dark:border-slate-600'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-navy/40">
          <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={run((c) => c.toggleBold())}>
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={run((c) => c.toggleItalic())}>
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Strikethrough" active={editor.isActive('strike')} onClick={run((c) => c.toggleStrike())}>
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600" />

          <ToolbarButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={run((c) => c.toggleHeading({ level: 2 }))}>
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={run((c) => c.toggleHeading({ level: 3 }))}>
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600" />

          <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={run((c) => c.toggleBulletList())}>
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={run((c) => c.toggleOrderedList())}>
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={run((c) => c.toggleBlockquote())}>
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Code block" active={editor.isActive('codeBlock')} onClick={run((c) => c.toggleCodeBlock())}>
            <Code className="h-4 w-4" />
          </ToolbarButton>

          <span className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600" />

          <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={run((c) => c.undo())}>
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={run((c) => c.redo())}>
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <EditorContent editor={editor} />
      </div>

      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}