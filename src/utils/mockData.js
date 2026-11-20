import { Briefcase, Code2, Coffee, HeartPulse, Palette, Plane } from 'lucide-react'

export const categories = [
  { name: 'Technology', icon: Code2, count: 24 },
  { name: 'Design', icon: Palette, count: 18 },
  { name: 'Lifestyle', icon: Coffee, count: 15 },
  { name: 'Business', icon: Briefcase, count: 12 },
  { name: 'Health', icon: HeartPulse, count: 9 },
  { name: 'Travel', icon: Plane, count: 7 },
]

export const mockBlogs = [
  {
    id: '1',
    slug: 'building-scalable-apis-with-node',
    title: 'Building Scalable APIs with Node.js and Express',
    description:
      'A practical guide to structuring REST APIs so they stay clean, testable and fast as your project grows.',
    category: 'Technology',
    author: 'Aarav Mehta',
    date: '2026-11-10',
    readingTime: 8,
    featured: true,
    cover: 'bg-linear-to-br from-blue-500 via-indigo-500 to-violet-600',
  },
  {
    id: '2',
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Actually Scale',
    description:
      'How small teams build consistent interfaces with reusable components, tokens and clear naming.',
    category: 'Design',
    author: 'Priya Shah',
    date: '2026-11-08',
    readingTime: 6,
    featured: false,
    cover: 'bg-linear-to-br from-fuchsia-500 via-purple-500 to-indigo-500',
  },
  {
    id: '3',
    slug: 'morning-routines-for-focus',
    title: 'Morning Routines That Improve Deep Focus',
    description:
      'Simple habits backed by research that help you start the day with clarity instead of distraction.',
    category: 'Lifestyle',
    author: 'Rohan Desai',
    date: '2026-11-05',
    readingTime: 5,
    featured: false,
    cover: 'bg-linear-to-br from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: '4',
    slug: 'from-side-project-to-startup',
    title: 'From Side Project to Startup: Lessons Learned',
    description:
      'What I learned validating an idea, finding the first customers and knowing when to keep going.',
    category: 'Business',
    author: 'Neha Patel',
    date: '2026-11-02',
    readingTime: 7,
    featured: false,
    cover: 'bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    id: '5',
    slug: 'react-state-management-guide',
    title: 'React State Management: Context, Redux or Zustand?',
    description:
      'A clear comparison of popular options so you can pick the right tool for your next React app.',
    category: 'Technology',
    author: 'Aarav Mehta',
    date: '2026-10-29',
    readingTime: 9,
    featured: false,
    cover: 'bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600',
  },
  {
    id: '6',
    slug: 'hidden-gems-of-gujarat',
    title: 'Hidden Gems of Gujarat for Your Next Trip',
    description:
      'Beyond the famous landmarks: quiet villages, coastal towns and food stops worth the detour.',
    category: 'Travel',
    author: 'Kavya Joshi',
    date: '2026-10-25',
    readingTime: 6,
    featured: false,
    cover: 'bg-linear-to-br from-rose-400 via-pink-500 to-purple-600',
  },
]