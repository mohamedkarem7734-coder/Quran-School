import 'jspdf'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: {
      head: string[][]
      body: string[][]
      startY?: number
      theme?: string
      styles?: Record<string, unknown>
      headStyles?: Record<string, unknown>
      columnStyles?: Record<string, unknown>
      didDrawPage?: (data: { pageCount: number }) => void
    }) => void
    lastAutoTable: {
      finalY: number
    }
  }
}
