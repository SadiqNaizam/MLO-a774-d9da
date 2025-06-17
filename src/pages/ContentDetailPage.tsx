import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import InteractiveTag from '@/components/InteractiveTag';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heart, MessageCircle, Send, User, CalendarDays, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


// Mock data - in a real app, this would be fetched based on `id`
const mockContentData: { [key: string]: any } = {
  '1': {
    title: 'Amazing Space Discoveries Vol. 1',
    mediaUrl: 'https://placehold.co/1200x675/007bff/white?text=Space+Image+1',
    mediaType: 'image',
    description: 'This is a detailed exploration of recent astronomical findings, including new exoplanets and galaxy formations. The universe is vast and full of wonders waiting to be uncovered. This article series delves into the most significant of these discoveries.',
    submitter: { name: 'Dr. Astro', avatarUrl: 'https://placehold.co/100x100/人物/ffffff?text=DA' },
    tags: ['space', 'astronomy', 'science', 'discovery'],
    category: 'Science',
    likes: 350,
    details: 'Published on January 15, 2024. Data sourced from NASA and ESA missions.',
    comments: [
      { id: 'c1', user: 'StarGazer22', text: 'Absolutely fascinating! The images are stunning.', avatar: 'https://placehold.co/50x50/人/ffffff?text=SG' },
      { id: 'c2', user: 'CosmicExplorer', text: 'Great overview. Looking forward to Vol. 2!', avatar: 'https://placehold.co/50x50/角色/ffffff?text=CE' },
    ],
  },
   '2': {
    title: 'Tech Innovations Changing Our World',
    mediaUrl: 'https://placehold.co/1200x675/28a745/white?text=Future+Tech+Vid', // Placeholder for video
    mediaType: 'video', // Could be 'video'
    description: 'A deep dive into groundbreaking technologies such as AI, quantum computing, and sustainable energy solutions that are actively shaping our future. We explore their potential impacts and ethical considerations.',
    submitter: { name: 'InnovatorX', avatarUrl: 'https://placehold.co/100x100/人物/ffffff?text=IX' },
    tags: ['technology', 'ai', 'innovation', 'future'],
    category: 'Tech',
    likes: 420,
    details: 'Presented at TechCon 2024. Includes interviews with leading experts.',
    comments: [
      { id: 'c3', user: 'FutureFan', text: 'Mind-blowing stuff! The segment on AI was particularly insightful.', avatar: 'https://placehold.co/50x50/人/ffffff?text=FF' },
    ],
  },
  // Add more mock items if needed for other IDs
};

const ContentDetailPage: React.FC = () => {
  console.log('ContentDetailPage loaded');
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(id && mockContentData[id] ? mockContentData[id].comments : []);
  const [likes, setLikes] = useState(id && mockContentData[id] ? mockContentData[id].likes : 0);
  const [isLiked, setIsLiked] = useState(false);

  const content = id ? mockContentData[id] : null;

  if (!content) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold">Content Not Found</h1>
          <p className="mt-4">The content you are looking for does not exist or has been moved.</p>
          <Button asChild className="mt-6"><Link to="/browse">Back to Browse</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
    toast({ title: isLiked ? "Unliked!" : "Liked!", description: `You ${isLiked ? 'unliked' : 'liked'} "${content.title}".`, variant: "success", duration: 2000 });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentToAdd = {
        id: `c${comments.length + 1}`,
        user: 'CurrentUser', // Placeholder
        text: newComment.trim(),
        avatar: 'https://placehold.co/50x50/用户/ffffff?text=ME'
      };
      setComments([...comments, commentToAdd]);
      setNewComment('');
      toast({ title: "Comment Posted!", variant: "success", duration: 2000 });
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/browse">Browse</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{content.title.length > 30 ? content.title.substring(0,27) + "..." : content.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="p-0">
            {content.mediaType === 'image' && (
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img src={content.mediaUrl} alt={content.title} className="object-cover w-full h-full" />
              </AspectRatio>
            )}
            {content.mediaType === 'video' && (
                 <AspectRatio ratio={16 / 9} className="bg-black">
                    {/* Basic video embed placeholder - replace with actual video player component if available */}
                    <iframe 
                        className="w-full h-full"
                        src={content.mediaUrl.replace("watch?v=", "embed/")} // Basic YouTube embed conversion
                        title={content.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </AspectRatio>
            )}
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{content.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={content.submitter.avatarUrl} alt={content.submitter.name} />
                  <AvatarFallback>{content.submitter.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>By {content.submitter.name}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                <span>Published {/* Date placeholder */} Jan 15, 2024</span>
              </div>
               <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1.5" />
                <span>Category: {content.category}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{content.description}</p>

            <div className="flex items-center space-x-2">
              {content.tags.map((tag: string) => (
                <InteractiveTag key={tag} text={tag} className="cursor-default" />
              ))}
            </div>

            <div className="flex items-center space-x-6 pt-4 border-t">
              <Button variant={isLiked ? "default" : "outline"} onClick={handleLike} className="flex items-center">
                <Heart className={`mr-2 h-5 w-5 ${isLiked ? 'fill-destructive text-destructive' : ''}`} /> 
                {likes} Likes
              </Button>
              <div className="flex items-center text-gray-600">
                <MessageCircle className="mr-2 h-5 w-5" /> {comments.length} Comments
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Additional Details</AccordionTrigger>
                <AccordionContent>
                  {content.details || "No additional details provided."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </CardContent>
        </Card>

        {/* Comments Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Comments ({comments.length})</h2>
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave a Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={4}
                  className="mb-4"
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={!newComment.trim()}>
                  <Send className="mr-2 h-4 w-4" /> Post Comment
                </Button>
              </CardFooter>
            </Card>
          </form>

          <div className="space-y-6">
            {comments.length > 0 ? comments.map((comment: any) => (
              <Card key={comment.id} className="bg-white">
                <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.avatar} alt={comment.user} />
                    <AvatarFallback>{comment.user.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{comment.user}</p>
                    <p className="text-xs text-gray-500">Posted on {/* Date placeholder */} Jan 16, 2024</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{comment.text}</p>
                </CardContent>
              </Card>
            )) : <p className="text-gray-600">No comments yet. Be the first to comment!</p>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContentDetailPage;