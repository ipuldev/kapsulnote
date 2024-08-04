export interface Note {
    id: string
    created_at: string
    value:string
    ip_address?:string
    perspective_score: number
  }

export interface NoteRequestBody {
  value:string
}