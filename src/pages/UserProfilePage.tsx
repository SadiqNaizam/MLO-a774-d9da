import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ContentCard from '@/components/ContentCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, User, BarChart2, ThumbsUp, Bookmark } from 'lucide-react';

const placeholderUser = {
  name: 'Alex ContentCreator',
  avatarUrl: 'https://placehold.co/128x128/7E57C2/FFFFFF?text=AC',
  bio: 'Passionate about sharing cool finds from the web. Tech enthusiast, amateur photographer, and avid reader. Joined CoolContent in 2023.',
  stats: {
    submissions: 15,
    totalLikesReceived: 875,
    contentBookmarked: 22,
  },
};

const placeholderSubmittedContent = [
  { id: 's1', title: 'My Top 5 Productivity Apps', contentUrl: '/content/s1', imageUrl: 'https://placehold.co/300x200/FFA000/FFFFFF?text=Productivity', viewCount: 120, likeCount: 30, commentCount: 5, status: 'Published' },
  { id: 's2', title: 'Exploring Hidden Gems in My City', contentUrl: '/content/s2', imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=City+Gems', viewCount: 250, likeCount: 55, commentCount: 12, status: 'Published' },
  { id: 's3', title: 'The Future of AI (Pending)', contentUrl: '/content/s3', imageUrl: 'https://placehold.co/300x200/9E9E9E/FFFFFF?text=AI+Pending', viewCount: 0, likeCount: 0, commentCount: 0, status: 'Pending Review' },
];

const placeholderLikedContent = [
  { id: 'l1', title: 'Amazing Space Discoveries', contentUrl: '/content/1', imageUrl: 'https://placehold.co/300x200/007BFF/FFFFFF?text=Space', viewCount: 1050, likeCount: 350, commentCount: 25 },
  { id: 'l2', title: 'Digital Art Trends 2024', contentUrl: '/content/l2', imageUrl: 'https://placehold.co/300x200/FBC02D/000000?text=Art+Trends', viewCount: 600, likeCount: 150, commentCount: 18 },
];


const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* User Info Header */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md">
                <AvatarImage src={placeholderUser.avatarUrl} alt={placeholderUser.name} />
                <AvatarFallback>{placeholderUser.name.split(' ').map(n=>n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <CardTitle className="text-2xl md:text-3xl font-bold">{placeholderUser.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-1">{placeholderUser.bio}</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                {/* Link to an edit profile page, not implemented here */}
                <Link to="/profile/edit"> 
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <BarChart2 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Submissions</p>
                <p className="font-semibold text-lg">{placeholderUser.stats.submissions}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Likes Received</p>
                <p className="font-semibold text-lg">{placeholderUser.stats.totalLikesReceived}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
              <Bookmark className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Bookmarked</p>
                <p className="font-semibold text-lg">{placeholderUser.stats.contentBookmarked}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Content */}
        <Tabs defaultValue="submitted" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6">
            <TabsTrigger value="submitted">My Submissions</TabsTrigger>
            <TabsTrigger value="liked">Liked Content</TabsTrigger>
            <TabsTrigger value="bookmarked" className="hidden md:block">Bookmarked</TabsTrigger> {/* Example for more tabs */}
          </TabsList>

          <TabsContent value="submitted">
            <h2 className="text-xl font-semibold mb-4">Submitted Content ({placeholderSubmittedContent.length})</h2>
            {placeholderSubmittedContent.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderSubmittedContent.map(item => (
                  <ContentCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No content submitted yet.</p>
            )}
          </TabsContent>

          <TabsContent value="liked">
             <h2 className="text-xl font-semibold mb-4">Liked Content ({placeholderLikedContent.length})</h2>
            {placeholderLikedContent.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderLikedContent.map(item => (
                  <ContentCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No liked content yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="bookmarked">
             <h2 className="text-xl font-semibold mb-4">Bookmarked Content (0)</h2>
             <p className="text-gray-600">No bookmarked content yet.</p>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;