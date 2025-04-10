import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTransactionById } from "../../../services/dashboard.services"
import DashboardLayout from "../../../components/dashboard-layout"
import { ArrowLeft, Share2, CheckCircle, Clock, XCircle, AlertCircle, Copy } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Skeleton } from "../../../components/ui/skeleton"

export default function TransactionDetailsPage() {
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await getTransactionById(id)
        setTransaction(data)
      } catch (error) {
        console.error("Failed to load transaction:", error)
        setError("Failed to load transaction details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [id])

  const handleCopyId = () => {
    navigator.clipboard.writeText(id)
    alert("Transaction ID copied to clipboard!")
  }


  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "successful":
      case "completed":
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "pending":
      case "processing":
        return <Clock className="h-6 w-6 text-amber-500" />
      case "failed":
      case "declined":
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "successful":
      case "completed":
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
      case "processing":
        return "bg-amber-100 text-amber-800"
      case "failed":
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderTransactionDetails = () => {
    if (loading) {
      return <TransactionSkeleton />
    }

    if (error || !transaction) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">{error || "Transaction not found"}</h3>
          <p className="text-red-600 mb-4">We couldn't find the transaction you're looking for.</p>
          <Link to="/dashboard/wallet">
            <Button className="bg-red-600 hover:bg-red-700">Return to Wallet</Button>
          </Link>
        </div>
      )
    }

    const statusClass = getStatusClass(transaction.status)
    const statusIcon = getStatusIcon(transaction.status)

    return (
      <div className="space-y-6">
        {/* Transaction Status Card */}
        <Card className="border-t-4 border-t-blue-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                {statusIcon}
                <div>
                  <h2 className="text-xl font-bold">
                    {transaction.type === "credit"
                      ? "Money Received"
                      : transaction.type === "debit"
                        ? "Money Sent"
                        : transaction.type === "withdrawal"
                          ? "Withdrawal"
                          : transaction.type === "deposit"
                            ? "Deposit"
                            : "Transaction"}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                      {transaction.status}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${transaction.type === "credit" || transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "credit" || transaction.type === "deposit" ? "+" : "-"}₦{transaction.amount}
                </div>
                <div className="text-sm text-gray-500">Transaction Fee: ₦{transaction.fee || "0.00"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{transaction.id}</p>
                    <button onClick={handleCopyId} className="text-blue-600 hover:text-blue-800" title="Copy ID">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Transaction Type</p>
                  <p className="font-medium capitalize">{transaction.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{formatDate(transaction.createdAt)}</p>
                </div>
              </div>

              <div className="space-y-3">
                {transaction.recipientWalletId && (
                  <div>
                    <p className="text-sm text-gray-500">Recipient Wallet ID</p>
                    <p className="font-medium">{transaction.recipientWalletId}</p>
                  </div>
                )}

                {transaction.senderWalletId && (
                  <div>
                    <p className="text-sm text-gray-500">Sender Wallet ID</p>
                    <p className="font-medium">{transaction.senderWalletId}</p>
                  </div>
                )}

                {transaction.bankName && (
                  <div>
                    <p className="text-sm text-gray-500">Bank Name</p>
                    <p className="font-medium">{transaction.bankName}</p>
                  </div>
                )}

                {transaction.accountNumber && (
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="font-medium">{transaction.accountNumber}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{transaction.description || "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Card (if applicable) */}
        {transaction.paymentMethod && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <p className="font-medium capitalize">{transaction.paymentMethod}</p>
              {transaction.cardDetails && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Card</p>
                  <p className="font-medium">{transaction.cardDetails}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}  
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Transaction Details</span>
        </div>

        <h1 className="text-2xl font-bold">Transaction Details</h1>

        {renderTransactionDetails()}
      </div>
    </DashboardLayout>
  )
}

function TransactionSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-40 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-48" />
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-48" />
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-48" />
              </div>

              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
