"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, MessageSquare } from "lucide-react"
import { mockContacts } from "@/lib/mock-data"

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [contacts] = useState(mockContacts)
  const [selectedContact, setSelectedContact] = useState<any>(null)

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600">Manage customer inquiries and support requests</p>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-royal-blue">All Contacts ({filteredContacts.length})</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{contact.subject}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{contact.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedContact(contact)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Contact Details</DialogTitle>
                              </DialogHeader>
                              {selectedContact && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Name</p>
                                      <p className="text-gray-900">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Email</p>
                                      <p className="text-gray-900">{selectedContact.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Phone</p>
                                      <p className="text-gray-900">{selectedContact.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600">Status</p>
                                      <Badge className={getStatusColor(selectedContact.status)}>
                                        {selectedContact.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">Subject</p>
                                    <p className="text-gray-900">{selectedContact.subject}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">Message</p>
                                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedContact.message}</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button className="royal-blue text-white hover:bg-blue-800">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Reply
                                    </Button>
                                    <Button variant="outline">Mark as Resolved</Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
