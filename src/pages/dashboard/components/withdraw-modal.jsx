import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { WithdrawService } from "../../../services/dashboard.services"

export function WithdrawModal({ onClose, setReload }) {
  const [amount, setAmount] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      const data = await WithdrawService({ amount: Number.parseFloat(amount), description })
      if (!data.status) {
        setError(data.message || "Error withdrawing funds.")
        return
      }

      setSuccess("Withdrawal successful!")
      setReload(true);
  
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Withdraw error:", error)
      setError("An error occurred while withdrawing funds.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-red-50 text-green-500 p-3 rounded-md mb-4">{success}</div>}

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
        <label htmlFor="bank-name" className="text-sm font-medium">
          Bank Name
        </label>
        <select
          id="bank-name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        >
          <option value="">Select bank</option>
          <option value="access">Access Bank</option>
          <option value="gtb">GTBank</option>
          <option value="first-bank">First Bank</option>
          <option value="zenith">Zenith Bank</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="account-number" className="text-sm font-medium">
          Account Number
        </label>
        <Input
          id="account-number"
          type="text"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          maxLength="10"
          pattern="[0-9]{10}"
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
        <Button type="submit">Withdraw</Button>
      </div>
    </form>
  )
}
