import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast hook for sonner
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

// Define Zod schema for form validation
const step1Schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  contentType: z.enum(["article", "video", "image", "link"], { required_error: "Content type is required" }),
});

const step2Schema = z.object({
  url: z.string().url("Must be a valid URL (e.g., http://example.com)").optional().or(z.literal('')),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

const step3Schema = z.object({
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(), // Comma-separated tags
  // Placeholder for file upload logic if needed
  // file: typeof window !== 'undefined' ? z.instanceof(FileList).optional() : z.any().optional(),
});

// Combine schemas for the full form data type
const submissionSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type SubmissionFormData = z.infer<typeof submissionSchema>;

interface SubmissionWizardFormProps {
  onSubmit: (data: SubmissionFormData) => Promise<void> | void;
}

const SubmissionWizardForm: React.FC<SubmissionWizardFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast(); // For notifications

  console.log("Rendering SubmissionWizardForm, current step:", currentStep);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid: isStepValid }, // isValid checks current step's schema
    trigger, // To manually trigger validation
    getValues, // To get form values for conditional logic or partial submission
    control, // For shadcn Select
  } = useForm<SubmissionFormData>({
    resolver: async (data, context, options) => {
      // Dynamically resolve schema based on current step
      let schema;
      if (currentStep === 1) schema = step1Schema;
      else if (currentStep === 2) schema = step1Schema.merge(step2Schema.pick({ url: true, description: true }));
      else schema = submissionSchema; // Full schema for final step or if all data is on one step
      
      // console.log("Validating with schema for step", currentStep, schema);
      return zodResolver(schema)(data, context, options);
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof SubmissionFormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ['title', 'contentType'];
    if (currentStep === 2) fieldsToValidate = ['url', 'description'];
    // No validation needed for step 3 if it's the last step before submit, handleSubmit will do it.

    const isValid = await trigger(fieldsToValidate.length > 0 ? fieldsToValidate : undefined);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast({ title: "Validation Error", description: "Please correct the errors before proceeding.", variant: "destructive" });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const processSubmit: SubmitHandler<SubmissionFormData> = async (data) => {
    console.log("Submitting full form data:", data);
    try {
      await onSubmit(data);
      toast({ title: "Submission Successful!", description: "Your content has been submitted for review.", icon: <CheckCircle className="h-5 w-5 text-green-500" /> });
      // Optionally reset form or redirect here
      setCurrentStep(4); // Move to a "success" step
    } catch (error) {
      console.error("Submission error:", error);
      toast({ title: "Submission Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
  };
  
  // Mock categories for Select
  const categories = ["Tech", "Science", "Art", "Lifestyle", "Gaming"];

  if (currentStep === 4) { // Success step
    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl text-center text-green-600">Submission Successful!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p>Your content has been submitted for review.</p>
                <p>You can view its status on your profile page.</p>
                <Button onClick={() => setCurrentStep(1)} className="mt-6">Submit Another</Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Submit New Content</CardTitle>
        <CardDescription>Step {currentStep} of 3: {
            currentStep === 1 ? "Basic Information" :
            currentStep === 2 ? "Details & Content" :
            "Categorization"
        }</CardDescription>
         <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(processSubmit)}>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              <div>
                <Label htmlFor="title">Title*</Label>
                <Input id="title" {...register('title')} placeholder="Enter a catchy title" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="contentType">Content Type*</Label>
                 <Select onValueChange={(value) => register('contentType').onChange({ target: { name: 'contentType', value } })} name="contentType">
                    <SelectTrigger id="contentType">
                        <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                </Select>
                {errors.contentType && <p className="text-red-500 text-xs mt-1">{errors.contentType.message}</p>}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div>
                <Label htmlFor="url">URL (if applicable)</Label>
                <Input id="url" {...register('url')} type="url" placeholder="https://example.com/your-content" />
                {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>}
              </div>
              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea id="description" {...register('description')} placeholder="Describe your content in detail..." rows={5} />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div>
                <Label htmlFor="category">Category*</Label>
                 <Select onValueChange={(value) => register('category').onChange({ target: { name: 'category', value } })} name="category">
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>)}
                    </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register('tags')} placeholder="e.g., tech, innovation, tutorial" />
                {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags.message}</p>}
              </div>
              {/* Placeholder for File Upload Input - actual implementation needs more setup */}
              {/* <div>
                <Label htmlFor="file">Upload Image/Media (Optional)</Label>
                <Input id="file" type="file" {...register('file')} />
                {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file.message as string}</p>}
              </div> */}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={handlePrevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {currentStep < 3 && (
            <Button type="button" onClick={handleNextStep} className="ml-auto">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {currentStep === 3 && (
            <Button type="submit" disabled={isSubmitting} className="ml-auto">
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default SubmissionWizardForm;