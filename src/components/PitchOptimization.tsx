import React, { useState, useCallback } from 'react';
import { ArrowLeft, Target, Upload, FileText, Zap, Star, TrendingUp } from 'lucide-react';

interface PitchOptimizationProps {
  onBack: () => void;
}

const PitchOptimization: React.FC<PitchOptimizationProps> = ({ onBack }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pitchText, setPitchText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        setUploadedFile(file);
        // Read file content
        const reader = new FileReader();
        reader.onload = (event) => {
          setPitchText(event.target?.result as string || '');
        };
        reader.readAsText(file);
      }
    }
  }, []);

  const analyzePitch = async () => {
    if (!pitchText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis = {
      overallScore: Math.floor(Math.random() * 25) + 75, // 75-100
      categories: {
        clarity: Math.floor(Math.random() * 30) + 70,
        impact: Math.floor(Math.random() * 30) + 70,
        structure: Math.floor(Math.random() * 30) + 70,
        storytelling: Math.floor(Math.random() * 30) + 70,
        callToAction: Math.floor(Math.random() * 30) + 70
      },
      strengths: [
        'Clear problem statement',
        'Strong value proposition',
        'Compelling use of data',
        'Professional presentation style'
      ],
      improvements: [
        'Add more specific metrics and KPIs',
        'Include customer testimonials or social proof',
        'Strengthen the competitive advantage section',
        'Make the call-to-action more specific and urgent'
      ],
      suggestions: [
        'Start with a powerful hook or statistic',
        'Use the "Problem-Solution-Market-Traction" framework',
        'Include a compelling demo or prototype showcase',
        'End with clear next steps and funding requirements'
      ],
      judgeSimulation: {
        questions: [
          'How will you acquire your first 1000 customers?',
          'What is your competitive advantage?',
          'How do you plan to monetize this solution?',
          'What are the biggest risks to your business model?',
          'How will you scale this solution globally?'
        ],
        feedback: 'The judges appreciate your innovative approach but would like to see more concrete validation metrics and a clearer path to market dominance.'
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center">
              <Target className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Pitch Optimization</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Zap className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Pitch Analysis</h2>
            <p className="text-gray-600">Let Pitch, our Presentation Agent, perfect your hackathon pitch</p>
          </div>

          {/* File Upload Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-all ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-green-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {uploadedFile ? `Uploaded: ${uploadedFile.name}` : 'Upload Your Pitch Deck or Script'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your pitch file here, or paste your pitch text below
            </p>
            <input
              type="file"
              accept=".txt,.md,text/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadedFile(file);
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setPitchText(event.target?.result as string || '');
                  };
                  reader.readAsText(file);
                }
              }}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 cursor-pointer transition-colors"
            >
              Choose File
            </label>
          </div>

          {/* Text Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or paste your pitch text here
            </label>
            <textarea
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Paste your pitch script, executive summary, or presentation notes here..."
            />
          </div>

          <div className="text-center mb-8">
            <button
              onClick={analyzePitch}
              disabled={!pitchText.trim() || isAnalyzing}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isAnalyzing ? 'Analyzing Pitch...' : 'Optimize My Pitch'}
            </button>
          </div>

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span className="text-gray-600">Pitch is analyzing your presentation...</span>
              </div>
            </div>
          )}

          {analysis && (
            <div className="space-y-8">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-center mb-4">Pitch Score</h3>
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}/100
                  </div>
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 ${
                          star <= Math.ceil(analysis.overallScore / 20)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    {analysis.overallScore >= 85 ? 'Outstanding pitch! Ready to wow the judges!' :
                     analysis.overallScore >= 70 ? 'Strong foundation with room for impact improvements' :
                     'Good start - let\'s elevate this to the next level'}
                  </p>
                </div>
              </div>

              {/* Category Analysis */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Detailed Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(analysis.categories).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 capitalize">
                          {category === 'callToAction' ? 'Call to Action' : category}
                        </span>
                        <span className={`font-bold ${getScoreColor(score as number)}`}>
                          {score}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getScoreBarColor(score as number)}`}
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
                    <Star className="w-5 h-5 mr-2" />
                    What's Working Well
                  </h3>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2 text-lg">✨</span>
                        <span className="text-green-800">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Enhancement Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {analysis.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2 text-lg">💡</span>
                        <span className="text-yellow-800">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expert Suggestions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Expert Pitch Suggestions
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-blue-800">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Judge Simulator */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  AI Judge Simulator
                </h3>
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-800 mb-3">Potential Judge Questions:</h4>
                  <div className="space-y-2">
                    {analysis.judgeSimulation.questions.map((question: string, index: number) => (
                      <div key={index} className="bg-white p-3 rounded-lg border">
                        <span className="font-medium text-purple-700">Q{index + 1}:</span>
                        <span className="text-purple-800 ml-2">{question}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Judge Panel Feedback:</h4>
                  <p className="text-purple-700">{analysis.judgeSimulation.feedback}</p>
                </div>
              </div>

              {/* Agent Recommendation */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">Pitch's Final Recommendations</h3>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">🎯</span>
                  <div>
                    <p className="text-green-800 mb-2">
                      Excellent work! Your pitch shows strong potential. I recommend practicing with the 
                      <strong> AI Judge Simulator</strong> questions and then moving to 
                      <strong> Task Management</strong> to organize your final presentation preparation.
                    </p>
                    <p className="text-green-600 text-sm">
                      Remember: A great pitch tells a story, solves a real problem, and leaves judges 
                      excited about your solution's future impact!
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

export default PitchOptimization;