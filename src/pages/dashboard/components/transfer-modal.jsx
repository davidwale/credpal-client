import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { TransferService } from "../../../services/dashboard.services"

export function TransferModal({ onClose, setReload }) {
  const [amount, setAmount] = useState("")
  const [recipientId, setRecipientId] = useState("")
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      const data = await TransferService({ amount: Number.parseFloat(amount), recipientWalletId: recipientId, description })
        console.log(data)
      if (!data.status) {
        setError(data.message || "Error transferring funds.")
        return
      }
      setSuccess("Transfer successful!")
      setReload(true);
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Transfer error:", error)
      setError("An error occurred while transferring funds.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-red-50 text-green-500 p-3 rounded-md mb-4">{success}</div>}

      <div className="space-y-2">
        <label htmlFor="recipient" className="text-sm font-medium">
          Recipient ID
        </label>
        <Input
          id="recipient"
          type="text"
          placeholder="Enter recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount (₦)
        </label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
          step="0.01"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description (Optional)
        </label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter description"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
          Cancel
        </Button>
        <Button type="submit">Transfer</Button>
      </div>
    </form>
  )
}
