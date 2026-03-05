'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Lock, Eye, Download, MessageSquare, ShieldCheck } from "lucide-react"

const DOCUMENTS = [
  { name: "Project Falcon CIM.pdf", type: "CIM", size: "4.2 MB", date: "2024-03-15", status: "Analyzed" },
  { name: "Clean Energy Financials.xlsx", type: "Financials", size: "1.8 MB", date: "2024-03-10", status: "Verified" },
  { name: "Non-Disclosure Agreement.pdf", type: "Legal", size: "540 KB", date: "2024-03-01", status: "Signed" },
  { name: "Market Research Report.pdf", type: "Analysis", size: "8.5 MB", date: "2024-03-20", status: "New" },
]

export function VirtualDataRoom() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-50 flex items-center gap-2">
          <Lock className="h-5 w-5 text-amber-500" /> Secure Virtual Data Room (VDR)
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-slate-900 border-slate-700">
            <ShieldCheck className="h-4 w-4 mr-2 text-emerald-500" /> Security Audit
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
            Upload Deal Documents
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-950 border-slate-800 text-slate-50 md:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Repository</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-800">
              {DOCUMENTS.map((doc) => (
                <div key={doc.name} className="p-4 flex items-center justify-between hover:bg-slate-900/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-2 rounded">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{doc.name}</div>
                      <div className="text-[10px] text-slate-500">{doc.type} • {doc.size} • Uploaded on {doc.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-[10px] border-slate-700 bg-slate-900 text-slate-400">
                      {doc.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-400" /> AI Document Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">CIM Summary</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Project Falcon shows a 15% CAGR in ARR with strong retention. Key risk identified: Concentration in North American market (85%).
              </p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Financial Flag</div>
              <p className="text-[11px] text-slate-300 leading-relaxed text-amber-400">
                Found discrepancy in Q3 EBITDA calculation compared to tax filings. Recommended for further DD.
              </p>
            </div>
            <Button className="w-full text-xs bg-purple-900/20 text-purple-400 hover:bg-purple-900/40 border border-purple-900/50">
              Ask AI about these docs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
