import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import WelcomeHeader from '../../components/dashboard/WelcomeHeader';
import LearningProgress from '../../components/dashboard/LearningProgress';
import StatCard from '../../components/dashboard/StatCard';
import TodayGoals from '../../components/dashboard/TodayGoals';
import ContinueLearning from '../../components/dashboard/ContinueLearning';
import DailyStreak from '../../components/dashboard/DailyStreak';
import ChallengeCard from '../../components/dashboard/ChallengeCard';
import RecommendedCourses from '../../components/dashboard/RecommendedCourses';
import api from '../../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get('/progress/me');
        if (res.data) {
          setProgressData(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch real progress, fallback to defaults');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const userName = user?.name?.split(' ')[0] || progressData?.user?.name?.split(' ')[0] || 'LEARNER';
  const overall = progressData?.overall ?? 35;
  const completed = progressData?.completedLessons ?? 2;
  const total = progressData?.totalLessons ?? 8;
  const userXP = progressData?.XP ?? user?.XP ?? 120;
  const levelName = progressData?.level ? `Level ${progressData.level}` : 'Learner';
  const streakCount = progressData?.streak ?? user?.streak ?? 3;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 animate-fadeInUp">
        {/* Top Section: Date, Greeting & Quote */}
        <WelcomeHeader userName={userName} />

        {/* Main Dashboard Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Primary Main Column (8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <LearningProgress percentage={overall} completed={completed} total={total} />
              <StatCard
                type="points"
                value={`${userXP} XP`}
                subtext={`Quiz Avg: ${progressData?.quizAvg ?? 80}%`}
                label="Total Points"
              />
              <StatCard
                type="rank"
                value={levelName}
                subtext={`Weak Area: ${progressData?.weakTopics?.[0] || 'None'}`}
                label="Current Level"
              />
            </div>

            {/* Primary Continue Learning Banner */}
            <ContinueLearning />

            {/* Recommended Courses Section */}
            <RecommendedCourses />
          </div>

          {/* Right Utility Sidebar Column (4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <TodayGoals />
            <DailyStreak streakCount={streakCount} />
            <ChallengeCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
