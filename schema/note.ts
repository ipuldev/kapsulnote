export interface Note {
    id: string
    created_at: string
    value:string
    ip_address?:string
  }

export interface NoteRequestBody {
  value:string
}