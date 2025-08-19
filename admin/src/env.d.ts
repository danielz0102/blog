import type { JwtPayload } from 'jwt-decode'

interface User {
  id: string
  username: string
  admin: boolean
}

interface UserPayload extends JwtPayload, User {}

export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  isDraft: boolean
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  user: User
}

export interface User {
  id: string
  username: string
}

declare global {
  interface Window {
    tinymce: TinyMCE
  }

  interface TinyMCE {
    init(options: TinyMCEOptions): Promise<TinyMCEEditor[]>
    get(id?: string | number): TinyMCEEditor | TinyMCEEditor[]
    remove(selector?: string | TinyMCEEditor): TinyMCEEditor | null
    execCommand(
      cmd: string,
      ui?: boolean,
      value?: string | number | boolean,
    ): boolean
    activeEditor: TinyMCEEditor | null
    EditorManager: {
      get(id?: string | number): TinyMCEEditor | TinyMCEEditor[]
    }
  }

  interface TinyMCEEditor {
    id: string
    getContent(options?: { format?: string }): string
    setContent(content: string, options?: { format?: string }): void
    focus(): void
    remove(): void
    save(): void
    on(event: string, callback: (...args: unknown[]) => void): void
    off(event: string, callback?: (...args: unknown[]) => void): void
    fire(event: string, args?: Record<string, unknown>): void
    getElement(): HTMLElement
    getContainer(): HTMLElement
    getBody(): HTMLElement
    getDoc(): Document
    getWin(): Window
    isDirty(): boolean
    setDirty(state: boolean): void
  }

  interface TinyMCEOptions {
    selector?: string
    target?: HTMLElement
    height?: number | string
    width?: number | string
    plugins?: string | string[]
    toolbar?: string | string[]
    menubar?: boolean | string
    statusbar?: boolean
    branding?: boolean
    resize?: boolean | string
    content_css?: string | string[]
    skin?: string
    theme?: string
    setup?: (editor: TinyMCEEditor) => void
    init_instance_callback?: (editor: TinyMCEEditor) => void
    [key: string]: unknown
  }
}
