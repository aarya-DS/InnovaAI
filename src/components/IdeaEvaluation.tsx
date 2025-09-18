import React, { useState } from 'react';
import { ArrowLeft, Brain, Lightbulb, TrendingUp, Users, Target, AlertCircle } from 'lucide-react';

interface IdeaEvaluationProps {
  onBack: () => void;
}

const IdeaEvaluation: React.FC<IdeaEvaluationProps> = ({ onBack }) => {
  const [ideaText, setIdeaText] = useState('');
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const evaluateIdea = async () => {
    if (!ideaText.trim()) return;
    
    setIsEvaluating(true);
    
    // Simulate AI evaluation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockEvaluation = {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      categories: {
        innovation: Math.floor(Math.random() * 40) + 60,
        feasibility: Math.floor(Math.random() * 40) + 60,
        marketPotential: Math.floor(Math.random() * 40) + 60,
        technicalComplexity: Math.floor(Math.random() * 40) + 60,
        userValue: Math.floor(Math.random() * 40) + 60
      },
      strengths: [
        'Addresses a real problem',
        'Innovative approach to solution',
        'Strong technical foundation',
        'Clear value proposition'
      ],
      improvements: [
        'Consider scalability challenges',
        'Research competitor solutions',
        'Define target user personas',
        'Plan monetization strategy'
      ],
      nextSteps: [
        'Create user journey maps',
        'Build minimum viable prototype',
        'Validate with potential users',
        'Define technical architecture'
      ],
      riskFactors: [
        'Market saturation in similar solutions',
        'Technical implementation complexity',
        'User adoption challenges'
      ]
    };
    
    setEvaluation(mockEvaluation);
    setIsEvaluating(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center">
              <Lightbulb className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Idea Evaluation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Idea Analysis</h2>
            <p className="text-gray-600">Let Nova, our Innovation Agent, evaluate your hackathon idea</p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your hackathon idea
            </label>
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Describe your idea in detail. Include the problem you're solving, your approach, target users, and any unique features..."
            />
          </div>

          <div className="text-center mb-8">
            <button
              onClick={evaluateIdea}
              disabled={!ideaText.trim() || isEvaluating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isEvaluating ? 'Analyzing Idea...' : 'Evaluate Idea'}
            </button>
          </div>

          {isEvaluating && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <span className="text-gray-600">Nova is analyzing your idea...</span>
              </div>
            </div>
          )}

          {evaluation && (
            <div className="space-y-8">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-center mb-4">Overall Score</h3>
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(evaluation.overallScore)}`}>
                    {evaluation.overallScore}/100
                  </div>
                  <p className="text-gray-600">
                    {evaluation.overallScore >= 80 ? 'Excellent potential!' :
                     evaluation.overallScore >= 60 ? 'Good foundation with room for improvement' :
                     'Needs significant development'}
                  </p>
                </div>
              </div>

              {/* Category Scores */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Detailed Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(evaluation.categories).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`font-bold ${getScoreColor(score as number)}`}>
                          {score}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBarColor(score as number)}`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {evaluation.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-green-800">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {evaluation.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">⚡</span>
                        <span className="text-yellow-800">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Recommended Next Steps
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {evaluation.nextSteps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-blue-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Risk Factors to Consider
                </h3>
                <ul className="space-y-2">
                  {evaluation.riskFactors.map((risk: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2">⚠️</span>
                      <span className="text-red-800">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agent Suggestions */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Nova's Recommendations</h3>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">🚀</span>
                  <div>
                    <p className="text-purple-800 mb-2">
                      Based on this evaluation, I recommend starting with <strong>Tech Stack Suggestions</strong> 
                      to build a solid foundation for your idea.
                    </p>
                    <p className="text-purple-600 text-sm">
                      Your idea shows strong potential! Let's work on the technical implementation 
                      and timeline planning to maximize your hackathon success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaEvaluation;