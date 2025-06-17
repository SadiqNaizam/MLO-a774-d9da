import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import SubmissionWizardForm from '@/components/SubmissionWizardForm';
// import { useToast } from '@/hooks/use-toast'; // SubmissionWizardForm handles its own toasts

const SubmitContentPage: React.FC = () => {
  console.log('SubmitContentPage loaded');
  // const { toast } = useToast(); // If toasts are needed outside the form

  const handleSubmit = async (data: any) => { // Type `any` for simplicity, form defines `SubmissionFormData`
    console.log('Form data submitted to page:', data);
    // Here you would typically send the data to your backend API
    // For this example, we'll simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // The SubmissionWizardForm itself shows a success message using its internal toast.
    // If you needed to show a page-level toast after its internal one:
    // toast({ title: "Content Sent to Backend!", description: "Further processing will occur.", variant: "info"});

    // Potentially redirect user or clear form, which SubmissionWizardForm might handle internally
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
           {/* The SubmissionWizardForm includes Card styling, title etc. */}
          <SubmissionWizardForm onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitContentPage;