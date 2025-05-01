import ExpertSpeak from '@/components/ExpertSpeak'
import FeatureBlog from '@/components/Featuredblog'
import SearchSection from '@/components/HeroSection'
import BlogSection from '@/components/Latestblog'
import MarketingBlog from '@/components/Marketingblog'
import React from 'react'

const Home = () => {
  return (
    <div>
      <SearchSection/>
      <BlogSection/>
      <FeatureBlog/>
      <MarketingBlog/>
      <ExpertSpeak/>
    </div>
  )
}

export default Home
