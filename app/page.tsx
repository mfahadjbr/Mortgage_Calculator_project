'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator } from 'lucide-react'
import Image from "next/image"

interface CalculationResult {
  monthlyPayment: number
  totalRepayment: number
}

export default function MortgageCalculator() {
  const [amount, setAmount] = useState('')
  const [term, setTerm] = useState('')
  const [rate, setRate] = useState('')
  const [type, setType] = useState('repayment')
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateMortgage = (e: React.FormEvent) => {
    e.preventDefault()
    
    const principal = parseFloat(amount)
    const years = parseFloat(term)
    const interestRate = parseFloat(rate) / 100 / 12
    const numberOfPayments = years * 12

    if (type === 'repayment') {
      const monthlyPayment = 
        (principal * interestRate * Math.pow(1 + interestRate, numberOfPayments)) /
        (Math.pow(1 + interestRate, numberOfPayments) - 1)
      
      setResult({
        monthlyPayment,
        totalRepayment: monthlyPayment * numberOfPayments
      })
    } else {
      const monthlyPayment = principal * interestRate
      setResult({
        monthlyPayment,
        totalRepayment: (monthlyPayment * numberOfPayments) + principal
      })
    }
  }

  const clearAll = () => {
    setAmount('')
    setTerm('')
    setRate('')
    setType('repayment')
    setResult(null)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e3f4fc] p-4">
      <div className="w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Left Panel - Calculator Form */}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Mortgage Calculator</h1>
              <button 
                onClick={clearAll}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear All
              </button>
            </div>

            <form onSubmit={calculateMortgage} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Mortgage Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">£</span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7"
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="term">Mortgage Term</Label>
                  <div className="relative">
                    <Input
                      id="term"
                      type="number"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="pr-14"
                      placeholder="Years"
                      required
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">years</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="rate"
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="pr-8"
                      step="0.01"
                      placeholder="Rate"
                      required
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mortgage Type</Label>
                <RadioGroup
                  value={type}
                  onValueChange={setType}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="repayment" id="repayment" />
                    <Label htmlFor="repayment" className="cursor-pointer">Repayment</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="interest-only" id="interest-only" />
                    <Label htmlFor="interest-only" className="cursor-pointer">Interest Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#e4e750] hover:bg-[#d1d447] text-gray-900"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Repayments
              </Button>
            </form>
          </div>

          {/* Right Panel - Results */}
          <div className="bg-[#1a2b3b] p-4 sm:p-6 flex items-center justify-center md:rounded-bl-[100px] text-white min-h-[400px]">
            {result ? (
              <div className="space-y-6 sm:space-y-8 w-full">
                <p className="text-gray-300 text-sm">
                  Your results are shown below based on the information you provided. 
                  To adjust the results, edit the form and click "calculate repayments" again.
                </p>
                <div className="space-y-1 border-t border-gray-700 pt-6">
                  <p className="text-sm text-gray-300">Your monthly repayments</p>
                  <p className="text-4xl sm:text-5xl font-bold text-[#e4e750]">
                    £{result.monthlyPayment.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1 border-t border-gray-700 pt-6">
                  <p className="text-sm text-gray-300">Total you'll repay over the term</p>
                  <p className="text-xl sm:text-2xl font-semibold">
                    £{result.totalRepayment.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 px-4">
                <div className="relative w-[120px] h-[120px] mx-auto">
                  <Image
                    src="/logo.png"
                    alt="Financial calculation illustration"
                    width={120}
                    height={120}
                    className="object-contain"
                    sizes="120px"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold">Results shown here</h2>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  Complete the form and click "calculate repayments" to see what your monthly repayments would be.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

