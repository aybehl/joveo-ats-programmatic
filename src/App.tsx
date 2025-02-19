import { useState } from 'react'
import {
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
  ChevronDownIcon,
  UserCircleIcon,
  RocketLaunchIcon,
  ClockIcon,
  SignalIcon,
  XMarkIcon,
  ChartBarIcon,
  CheckIcon,
  InformationCircleIcon,

} from '@heroicons/react/24/outline'

type Job = {
  id: number
  title: string
  location: string
  status: 'active' | 'inactive'
  recruiter: string
  applies: number
  screened: number
  rejected: number
  hired: number
  sponsored: 'none' | 'pending' | 'live'
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Cleaner',
    location: 'San Francisco, CA',
    status: 'active',
    recruiter: 'Sarah Wilson',
    applies: 45,
    screened: 30,
    rejected: 12,
    hired: 3,
    sponsored: 'live'
  },
  {
    id: 2,
    title: 'Supervisor',
    location: 'New York, NY',
    status: 'active',
    recruiter: 'John Smith',
    applies: 32,
    screened: 20,
    rejected: 8,
    hired: 2,
    sponsored: 'pending'
  },
  {
    id: 3,
    title: 'Manager',
    location: 'Seattle, WA',
    status: 'inactive',
    recruiter: 'Emma Brown',
    applies: 28,
    screened: 15,
    rejected: 10,
    hired: 1,
    sponsored: 'none'
  },
  {
    id: 4,
    title: 'Cleaner',
    location: 'Austin, TX',
    status: 'active',
    recruiter: 'Mike Johnson',
    applies: 0,
    screened: 0,
    rejected: 0,
    hired: 0,
    sponsored: 'none'
  },
  {
    id: 5,
    title: 'Security guard',
    location: 'Boston, MA',
    status: 'active',
    recruiter: 'Lisa Taylor',
    applies: 38,
    screened: 25,
    rejected: 10,
    hired: 3,
    sponsored: 'live'
  }
]




function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [objective, setObjective] = useState('balanced')
  const [applies, setApplies] = useState('')
  const [budget, setBudget] = useState('')
  const startDate = 'Feb 18th, 2025'
  const [endDate, setEndDate] = useState('')
  const [diversityBooster, setDiversityBooster] = useState(false)
  const [showAnalyticsDropdown, setShowAnalyticsDropdown] = useState(false)
  const [selectedJobs, setSelectedJobs] = useState<number[]>([])
  const [showModifiedOverlay, setShowModifiedOverlay] = useState(false)
  const [inputMode, setInputMode] = useState<'applies' | 'budget'>('applies')
  const [showMarketInsights, setShowMarketInsights] = useState(false)
  const [showCompetitiveInsights, setShowCompetitiveInsights] = useState(false)

  const calculateBaseCPA = () => {
    if (inputMode === 'applies') {
      const appliesNum = parseInt(applies) || 0
      if (appliesNum <= 20) return 20
      if (appliesNum <= 100) return 18
      return 15
    } else {
      const budgetNum = parseInt(budget) || 0
      if (budgetNum <= 1000) return 20
      if (budgetNum <= 10000) return 18
      return 15
    }
  }

  const calculateCPA = () => {
    const baseCPA = calculateBaseCPA()
    switch (objective) {
      case 'aggressive':
        return baseCPA + 2
      case 'lowest-cost':
        return baseCPA - 2
      default:
        return baseCPA
    }
  }

  const calculateExpectedApplies = () => {
    const budgetNum = parseInt(budget) || 0
    const cpa = calculateCPA()
    return Math.floor(budgetNum / cpa)
  }

  const calculateBudgetRequired = () => {
    const appliesNum = parseInt(applies) || 0
    const cpa = calculateCPA()
    return appliesNum * cpa
  }

  const handleAdvertiseClick = (job: Job) => {
    setSelectedJob(job)
    setSelectedJobs([job.id])
    setApplies('')
    setBudget('')
    setInputMode('applies')
    setEndDate('')
    setShowAdvertiseModal(true)
  }

  const handleJobSelect = (jobId: number) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId)
      } else {
        return [...prev, jobId]
      }
    })
  }

  const getSponsoredIcon = (sponsored: Job['sponsored'], status: Job['status'], job: Job) => {
    if (status === 'inactive') {
      return <div className="w-8 h-8 mx-auto" />
    }

    switch (sponsored) {
      case 'live':
        return (
          <div className="w-8 h-8 flex items-center justify-center mx-auto" title="Live on job boards">
            <SignalIcon className="h-5 w-5 text-green-500" />
          </div>
        )
      case 'pending':
        return (
          <div className="w-8 h-8 flex items-center justify-center mx-auto" title="Pending - Going live soon">
            <ClockIcon className="h-5 w-5 text-yellow-500" />
          </div>
        )
      case 'none':
        return (
          <button 
            onClick={() => handleAdvertiseClick(job)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full mx-auto"
            title="Click to advertise"
          >
            <RocketLaunchIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
              <nav className="ml-6 flex space-x-8">
                <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-blue-500">Jobs</a>
                <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium">Candidates</a>
                <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium">People</a>
                <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium">Integration</a>
                <a href="#" className="text-gray-900 px-3 py-2 text-sm font-medium">
                  Analytics
                  <ChevronDownIcon className="ml-1 h-4 w-4 inline" />
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <PlusIcon className="h-6 w-6" />
              </button>
              <button className="p-2">
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${showAdvertiseModal ? 'mr-[40vw] relative' : ''}`}>
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 border rounded-lg flex items-center">
                Job Status <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <button className="px-4 py-2 border rounded-lg flex items-center">
                Recruiter <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <button className="px-4 py-2 border rounded-lg flex items-center">
                Location <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <button className="px-4 py-2 border rounded-lg flex items-center">
                Job Category <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <button className="px-4 py-2 border rounded-lg flex items-center">
                Sponsored <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              <button className="text-blue-600">Clear all</button>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowAnalyticsDropdown(!showAnalyticsDropdown)}
                className="px-4 py-2 border rounded-lg flex items-center bg-white hover:bg-gray-50"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Analytics & Reports
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </button>
              {showAnalyticsDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Performance Analysis
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      role="menuitem"
                      onClick={() => {
                        setShowAnalyticsDropdown(false)
                        setShowMarketInsights(true)
                      }}
                    >
                      Market Insights
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Job Content Analysis
                    </a>
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Competitive Insights
                    </a> */}
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      role="menuitem"
                      onClick={() => {
                        setShowAnalyticsDropdown(false)
                        setShowCompetitiveInsights(true)
                      }}
                    >
                      Competitive Insights
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className={`bg-white rounded-lg shadow overflow-hidden ${showAdvertiseModal ? 'blur-sm pointer-events-none' : ''}`}>
          {/* Table Header */}
          <div className="grid grid-cols-9 gap-4 px-6 py-3 border-b text-sm font-medium text-gray-500 sticky top-0 bg-white">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={selectedJobs.length === jobs.length}
                onChange={() => {
                  if (selectedJobs.length === jobs.length) {
                    setSelectedJobs([])
                  } else {
                    setSelectedJobs(jobs.map(job => job.id))
                  }
                }}
              />
            </div>
            <div>Status</div>
            <div>Job Title</div>
            <div>Recruiter</div>
            <div className="text-center">Applies</div>
            <div className="text-center">Screened</div>
            <div className="text-center">Rejected</div>
            <div className="text-center">Hired</div>
            <div className="text-center">Sponsored</div>
          </div>

          {/* Job Rows */}
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {jobs.map((job) => (
              <div key={job.id} className="grid grid-cols-9 gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => handleJobSelect(job.id)}
                  />
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {job.title}
                  <div className="text-xs text-gray-500">{job.location}</div>
                </div>
                <div className="text-sm text-gray-500">{job.recruiter}</div>
                <div className="text-sm text-gray-900 text-center">{job.applies}</div>
                <div className="text-sm text-gray-900 text-center">{job.screened}</div>
                <div className="text-sm text-gray-900 text-center">{job.rejected}</div>
                <div className="text-sm text-gray-900 text-center">{job.hired}</div>
                <div className="text-sm text-center">{getSponsoredIcon(job.sponsored, job.status, job)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Advertise Modal */}
        {showAdvertiseModal && selectedJob && (
          <>
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-sm z-40"
              onClick={() => setShowAdvertiseModal(false)}
            />
            <div className="fixed inset-y-0 right-0 w-[40vw] bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Advertise Job</h2>
                    <p className="text-sm text-gray-500">{selectedJob.title}</p>
                  </div>
                  <button 
                    onClick={() => setShowAdvertiseModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Objective */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      * Objective
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="balanced"
                          name="objective"
                          value="balanced"
                          checked={objective === 'balanced'}
                          onChange={(e) => setObjective(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="balanced" className="ml-2 text-sm text-gray-700">Balanced</label>
                        <div className="relative ml-2 group">
                          <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                          <div className="hidden group-hover:block absolute left-6 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                            Balance objective optimizes equally for speed, quantity and cost.
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="aggressive"
                          name="objective"
                          value="aggressive"
                          checked={objective === 'aggressive'}
                          onChange={(e) => setObjective(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="aggressive" className="ml-2 text-sm text-gray-700">Aggressive</label>
                        <div className="relative ml-2 group">
                          <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                          <div className="hidden group-hover:block absolute left-6 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                            Spend fast to get applications really fast (+$2 CPA)
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lowest-cost"
                          name="objective"
                          value="lowest-cost"
                          checked={objective === 'lowest-cost'}
                          onChange={(e) => setObjective(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="lowest-cost" className="ml-2 text-sm text-gray-700">Lowest Cost</label>
                        <div className="relative ml-2 group">
                          <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                          <div className="hidden group-hover:block absolute left-6 top-0 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                            Maintain lowest cost where speed of receiving application will be slower (-$2 CPA)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost per Application */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-center mb-2">Cost per Application</h3>
                    <p className="text-3xl font-bold text-green-600 text-center">${calculateCPA()}</p>
                  </div>

                  {/* Input Mode Selection */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setInputMode('applies')
                        setBudget('')
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        inputMode === 'applies' 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-gray-300 text-gray-700'
                      }`}
                    >
                      Enter Applies
                    </button>
                    <button
                      onClick={() => {
                        setInputMode('budget')
                        setApplies('')
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        inputMode === 'budget' 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-gray-300 text-gray-700'
                      }`}
                    >
                      Enter Budget
                    </button>
                  </div>

                  {/* Input Fields */}
                  {inputMode === 'applies' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        * Number of Applies
                      </label>
                      <input
                        type="number"
                        value={applies}
                        onChange={(e) => setApplies(e.target.value)}
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter number of applies"
                      />
                      {applies && (
                        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-center mb-2 text-blue-900">Budget Required</h3>
                          <p className="text-3xl font-bold text-blue-600 text-center">${calculateBudgetRequired()}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        * Budget
                      </label>
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter budget amount"
                      />
                      {budget && (
                        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-center mb-2 text-blue-900">Expected Applies</h3>
                          <p className="text-3xl font-bold text-blue-600 text-center">{calculateExpectedApplies()}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Job Posting Duration */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Job Posting Duration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          * Job posting start date
                        </label>
                        <input
                          type="text"
                          value={startDate}
                          readOnly
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Job posting end date (optional)
                        </label>
                        <input
                          type="text"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Select end date"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Settings */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Additional Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Diversity Booster</span>
                        <button 
                          onClick={() => setDiversityBooster(!diversityBooster)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${diversityBooster ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${diversityBooster ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowAdvertiseModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowAdvertiseModal(false)
                        setShowModifiedOverlay(true)
                        setTimeout(() => setShowModifiedOverlay(false), 2000)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Advertise
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      {/* Market Insights Modal */}
      {showMarketInsights && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Market Insights</h2>
              <button
                onClick={() => setShowMarketInsights(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <img 
                src="/market_insights.png"
                alt="Market Insights Dashboard"
                className="w-full h-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Market Insights Modal */}
      {showCompetitiveInsights && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Competitive Insights</h2>
              <button
                onClick={() => setShowCompetitiveInsights(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <img 
                src="/competitive_insights.png"
                alt="Competitive Insights Dashboard"
                className="w-full h-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}

        {/* Modified Overlay */}
        {showModifiedOverlay && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckIcon className="h-5 w-5" />
            <span>Changes saved successfully</span>
          </div>
        )}
      </main>
    </div>
  )
}

export default App