import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { AddFundService } from "../../../services/dashboard.services"

export function AddFundsModal({ onClose, setReload }) {
  const [amount, setAmount] = useState("")
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const data = await AddFundService({ amount: Number.parseFloat(amount) })
        console.log(data)
        if (!data.status) {
          console.log(data)
          setError(data.message || data.message[0])
          return
        }
        setSuccess("Funds added successfully!")
        setReload(true);
        setTimeout(() => {
          onClose()
        }, 3000)
    } catch (error) {
      console.error("Error adding funds:", error)
      setError("An error occurred while adding funds.")
      setSuccess("")
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
        <label htmlFor="payment-method" className="text-sm font-medium">
          Payment Method
        </label>
        <select id="payment-method" className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
          <option value="">Select payment method</option>
          <option value="card">Card</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="border-gray-300">
          Cancel
        </Button>
        <Button type="submit">Add Funds</Button>
      </div>
    </form>
  )
}
