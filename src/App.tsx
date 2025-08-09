import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          💰 Expense Management App
        </h1>
        <p className="text-gray-600 mb-6">
          TailwindCSS導入完了！週間予算管理アプリの開発準備が整いました。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">支出入力</h3>
            <p className="text-green-600 text-sm">日々の支出を記録</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">週間管理</h3>
            <p className="text-blue-600 text-sm">予算と残金を管理</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">カレンダー表示</h3>
            <p className="text-purple-600 text-sm">支出をカレンダーで確認</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App