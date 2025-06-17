import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Carousel from '@/components/Carousel';
import ContentCard from '@/components/ContentCard';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const placeholderContentItems = [
  {
    id: '1',
    title: 'Featured: Amazing Space Discoveries',
    imageUrl: 'https://placehold.co/600x400/007bff/white?text=Space+Discovery',
    description: 'Explore the latest breathtaking discoveries from the final frontier.',
    contentUrl: '/content/1',
    viewCount: 1050,
    likeCount: 350,
    commentCount: 25,
  },
  {
    id: '2',
    title: 'Tech Innovations Changing Our World',
    imageUrl: 'https://placehold.co/600x400/28a745/white?text=Tech+Innovation',
    description: 'A deep dive into groundbreaking technologies that are shaping our future.',
    contentUrl: '/content/2',
    viewCount: 980,
    likeCount: 420,
    commentCount: 18,
  },
  {
    id: '3',
    title: 'Artistic Wonders: A Digital Gallery',
    imageUrl: 'https://placehold.co/600x400/ffc107/black?text=Artistic+Wonder',
    description: 'Immerse yourself in a curated collection of stunning digital art.',
    contentUrl: '/content/3',
    viewCount: 760,
    likeCount: 280,
    commentCount: 32,
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  const carouselSlides = placeholderContentItems.slice(0, 2).map(item => (
    <ContentCard key={item.id} {...item} />
  ));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Hero Section with Carousel */}
        <section className="py-8 md:py-12 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Welcome to CoolContent</h1>
            <p className="text-lg md:text-xl text-center mb-8 text-slate-300">Discover, share, and engage with amazing content from around the web.</p>
            {carouselSlides.length > 0 && <Carousel slides={carouselSlides} autoplayDelay={5000} />}
          </div>
        </section>

        {/* Trending/Popular Content Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Trending Content</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderContentItems.map(item => (
                <ContentCard key={item.id} {...item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button size="lg" asChild>
                <Link to="/browse">Explore All Content</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action for Submission */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Have Something Cool to Share?</h2>
            <p className="text-lg mb-6">Become a contributor and share your discoveries with our community.</p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/submit">Submit Your Content</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;