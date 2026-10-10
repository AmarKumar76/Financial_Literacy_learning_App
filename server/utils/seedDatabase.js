const Category = require('../models/Category');
const Lesson = require('../models/Lesson');
const QuizQuestion = require('../models/QuizQuestion');
const Badge = require('../models/Badge');

const defaultCategories = [
  {
    name: 'Money Basics',
    description: 'Master fundamental money principles, cash flow, and asset vs liability basics.',
    icon: 'Calculator',
    level: 'Beginner',
    published: true,
  },
  {
    name: 'Personal Budgeting 101',
    description: 'Learn the 50/30/20 rule, emergency funds, and managing monthly income.',
    icon: 'PiggyBank',
    level: 'Beginner',
    published: true,
  },
  {
    name: 'Tax Basics',
    description: 'Understand income tax slabs, TDS deductions, Form 16, and Section 80C savings.',
    icon: 'FileText',
    level: 'Intermediate',
    published: true,
  },
  {
    name: 'Scam & Fraud Awareness',
    description: 'Protect yourself against phishing, OTP fraud, fake loan apps, and Ponzi schemes.',
    icon: 'ShieldAlert',
    level: 'Beginner',
    published: true,
  },
  {
    name: 'Banking & Payments 101',
    description: 'Navigate UPI payments, credit scores (CIBIL), savings accounts, and fixed deposits.',
    icon: 'Shield',
    level: 'Intermediate',
    published: true,
  },
  {
    name: 'Investing for Beginners',
    description: 'Explore compounding interest, SIPs, Index Funds, mutual funds, and risk management.',
    icon: 'TrendingUp',
    level: 'Advanced',
    published: true,
  },
];

const defaultLessons = [
  {
    categoryName: 'Personal Budgeting 101',
    title: 'The 50/30/20 Budgeting Rule',
    summary: 'Divide your post-tax income into Needs (50%), Wants (30%), and Savings/Investments (20%).',
    duration: 5,
    objectives: [
      '50% goes to essential Needs: rent, groceries, utilities, and transport.',
      '30% goes to Wants: dining out, hobbies, and entertainment.',
      '20% goes directly to Savings & emergency funds before spending.',
    ],
    content: `When you receive your monthly income, immediately allocate 20% toward your emergency fund or SIP investments. Spend 50% on rent, bills, and essential food. Keep 30% for guilt-free lifestyle expenses. This simple rule prevents overspending and builds long-term wealth automatedly.`,
    status: 'Published',
  },
  {
    categoryName: 'Tax Basics',
    title: 'What is Income Tax & How Does TDS Work?',
    summary: 'Income tax is charged on your earnings. TDS ensures tax is collected right when income is paid.',
    duration: 6,
    objectives: [
      'Tax is deducted automatically by employers or banks based on income slabs.',
      'TDS credited to Form 26AS can be claimed as refund by filing ITR.',
      'Section 80C allows tax savings up to ₹1.5 Lakh through ELSS & PPF.',
    ],
    content: `If your employer deducts ₹2,000 TDS monthly, your Form 16 records this. At year-end, if your total tax liability is lower, filing your ITR generates a direct refund into your bank account.`,
    status: 'Published',
  },
  {
    categoryName: 'Scam & Fraud Awareness',
    title: 'How to Spot OTP & Phishing Loan Scams',
    summary: 'Banks never ask for OTPs or PINs. Instant loan app scams harvest contacts and charge illegal interest.',
    duration: 4,
    objectives: [
      'Never share 6-digit OTPs, UPI PINs, or password details over call or SMS.',
      'Check URL domain names before clicking bank or electricity bill links.',
      'Unsolicited pre-approved loan apps that ask for contact permissions are major scam risks.',
    ],
    content: `A scammer calls claiming your electricity will be disconnected tonight unless you pay ₹10 via a link. The fake link installs malware or triggers a UPI collect request. Always verify through official app portals directly!`,
    status: 'Published',
  },
  {
    categoryName: 'Investing for Beginners',
    title: 'Understanding Compound Interest & Systematic Investment Plans (SIP)',
    summary: 'SIPs allow regular monthly investing in mutual funds, leveraging the power of compounding.',
    duration: 7,
    objectives: [
      'Compounding returns means earning interest on past interest accumulated.',
      'Rupee Cost Averaging lowers average buy cost during market ups and downs.',
      'Starting 5 years earlier can double your eventual retirement wealth corpus.',
    ],
    content: `Investing ₹5,000/month at 12% annual return yields over ₹25 Lakhs in 15 years. Out of ₹25 Lakhs, your actual deposit is only ₹9 Lakhs—the remaining ₹16 Lakhs is pure compounding growth!`,
    status: 'Published',
  },
];

exports.seedDatabase = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('🌱 Seeding initial financial categories, lessons, and quizzes...');
      
      const createdCategories = await Category.insertMany(defaultCategories);
      const catMap = new Map(createdCategories.map((c) => [c.name, c._id]));

      for (const lessonData of defaultLessons) {
        const categoryId = catMap.get(lessonData.categoryName);
        if (!categoryId) continue;

        const lesson = await Lesson.create({
          categoryId,
          title: lessonData.title,
          summary: lessonData.summary,
          duration: lessonData.duration,
          objectives: lessonData.objectives,
          content: lessonData.content,
          status: lessonData.status,
        });

        // Seed initial published quiz questions for the lesson
        await QuizQuestion.insertMany([
          {
            lessonId: lesson._id,
            categoryId: categoryId,
            type: 'MCQ',
            questionText: `According to the 50/30/20 rule, what percentage of income should go to savings?`,
            options: [
              { text: '50%' },
              { text: '30%' },
              { text: '20%' },
              { text: '10%' },
            ],
            correctOption: 2,
            explanation: '20% of post-tax income should be dedicated directly to savings and investments.',
            difficulty: 'Easy',
            points: 10,
            status: 'Published',
            source: 'Manual',
          },
          {
            lessonId: lesson._id,
            categoryId: categoryId,
            type: 'TrueFalse',
            questionText: `Will official banks ever ask you to read out your 6-digit OTP over phone call?`,
            options: [
              { text: 'True' },
              { text: 'False' },
            ],
            correctOption: 1,
            explanation: 'False! Banks explicitly instruct never to share your OTP or PIN with anyone.',
            difficulty: 'Easy',
            points: 10,
            status: 'Published',
            source: 'Manual',
          },
        ]);
      }

      console.log('✅ Database seeded with real financial literacy modules, lessons & quizzes!');
    }
  } catch (err) {
    console.error('Database seeding error:', err.message);
  }
};
