import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Copy, Filter } from "lucide-react"
import DashboardLayout from "../../components/dashboard-layout"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination"
import { getWallet, getTransactions } from "../../services/dashboard.services"
import { Modal } from "../../components/ui/modal"
import { AddFundsModal } from "./components/add-fund-modal"
import { WithdrawModal } from "./components/withdraw-modal"
import { TransferModal } from "./components/transfer-modal"

export default function WalletPage() {
  const [balance, setBalance] = useState(0)
  const [pendingAmount, setPendingAmount] = useState(0)
  const [accountNumber, setAccountNumber] = useState("")
  const [sortBy, setSortBy] = useState("timestamp")
  const [sortOrder, setSortOrder] = useState("DESC")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [reload, setReload] = useState(false)
  const itemsPerPage = 10

  // Modal states
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const data = await getWallet()
        setBalance(data.balance || 0)
        setPendingAmount(data.pendingAmount || 0)
        setAccountNumber(data.walletId || "")
      } catch (error) {
        console.error("Error fetching wallet balance:", error)
      }
    }

    fetchWalletBalance()
  }, [reload])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const statusFilter = activeTab === "all" ? undefined : activeTab
        const data = await getTransactions(currentPage, itemsPerPage, statusFilter, sortBy, sortOrder)
        setTransactions(data.data || [])
        setTotalTransactions(data.meta.total || 0)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      }
    }

    fetchTransactions()
  }, [currentPage, activeTab, sortBy, sortOrder, reload])

  const totalPages = Math.ceil(totalTransactions / itemsPerPage)

  const handleSort = (field, order) => {
    setSortBy(field)
    setSortOrder(order)
    setIsFilterOpen(false)
  }

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber)
    alert("Wallet ID copied to clipboard!")
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Modal handlers
  const openModal = (modalType) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm text-gray-500">Actual Balance</h3>
                </div>
                <div className="text-3xl font-bold">₦{balance}</div>
                <div className="flex items-center text-sm text-gray-500">
                <h3 className="text-sm text-gray-500 mr-1">Wallet ID:</h3>
                  <span>{accountNumber}</span>
                  <button onClick={handleCopyAccountNumber} className="ml-2 text-gray-400 hover:text-gray-600">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button
            className="border-gray-300 cursor-pointer hover:bg-gray-200 transition duration-300 border"
            onClick={() => openModal("addFunds")}
          >
            Add Funds
          </Button>
          <Button
            className="border-gray-300 cursor-pointer hover:bg-gray-200 transition duration-300 border"
            onClick={() => openModal("withdraw")}
          >
            Withdraw
          </Button>
          <Button
            className="border-gray-300 cursor-pointer hover:bg-gray-200 transition duration-300 border"
            onClick={() => openModal("transfer")}
          >
            Transfer
          </Button>
        </div>

        {/* Modals */}
        <Modal isOpen={activeModal === "addFunds"} onClose={closeModal} title="Add Funds">
          <AddFundsModal onClose={closeModal} setReload={setReload} />
        </Modal>

        <Modal isOpen={activeModal === "withdraw"} onClose={closeModal} title="Withdraw Funds">
          <WithdrawModal onClose={closeModal} setReload={setReload} />
        </Modal>

        <Modal isOpen={activeModal === "transfer"} onClose={closeModal} title="Transfer Funds">
          <TransferModal onClose={closeModal} setReload={setReload} />
        </Modal>

        {/* Transactions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">Filter by</span>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex border-gray-300 border items-center"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-gray-500">Sort</span>
                </Button>

                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Sort By</div>
                      <button
                        onClick={() => handleSort("timestamp", "DESC")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Date (Newest First)
                      </button>
                      <button
                        onClick={() => handleSort("timestamp", "ASC")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Date (Oldest First)
                      </button>
                      <button
                        onClick={() => handleSort("amount", "DESC")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Amount (High to Low)
                      </button>
                      <button
                        onClick={() => handleSort("amount", "ASC")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Amount (Low to High)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger className="border cursor-pointer border-gray-300" value="all">All</TabsTrigger>
              <TabsTrigger className="border cursor-pointer ml-3 border-gray-300" value="successful">Successful</TabsTrigger>
              <TabsTrigger className="border cursor-pointer ml-3 border-gray-300" value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <TransactionTable transactions={transactions} currentPage={currentPage} />
            </TabsContent>
            <TabsContent value="successful" className="mt-4">
              <TransactionTable transactions={transactions} currentPage={currentPage} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <TransactionTable transactions={transactions} currentPage={currentPage} />
            </TabsContent>
          </Tabs>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink isActive={currentPage === pageNum} onClick={() => handlePageChange(pageNum)}>
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

function TransactionTable({ transactions, currentPage }) {
  return (
    <div className="border rounded-md border-gray-300">
      <Table  className="text-center">
        <TableHeader>
          <TableRow >
            <TableHead className="text-center">#</TableHead>
            {/* <TableHead>Transaction ID</TableHead> */}
            <TableHead className="text-center">Transaction Type</TableHead>
            <TableHead className="text-center">Amount (₦)</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx, index) => (
              <TableRow className="text-center" key={tx.id}>
                <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
                {/* <TableCell>{tx.id}</TableCell> */}
                <TableCell className="capitalize">{tx.type}</TableCell>
                <TableCell>₦{tx.amount}</TableCell>
                <TableCell className="capitalize">{tx.status}</TableCell>
                <TableCell>
                  {new Date(tx.timestamp).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Link to={`/dashboard/wallet/transaction/${tx.id}`}>
                    <Button className="border px-4 m-3 cursor-pointer hover:bg-gray-100 py-2 border-gray-300" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
