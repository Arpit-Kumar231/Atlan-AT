import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { SharePoster } from './SharePoster';
import { ScheduledActivity, WeekendTheme } from '@/types/weekend';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  theme: WeekendTheme;
  saturday: ScheduledActivity[];
  sunday: ScheduledActivity[];
}

export function ShareModal({ isOpen, onClose, planName, theme, saturday, sunday }: ShareModalProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('weekend-poster');
      if(!element) return;

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        10,
        imgWidth,
        imgHeight
      );

      pdf.save(`weekend-plan-${Date.now()}.pdf`);
      
      toast({
        title: 'PDF Downloaded!',
        description: 'Your weekend plan has been saved as a PDF',
      });
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Export Weekend Plan</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center p-4 bg-gradient-subtle rounded-2xl">
            <div className="transform scale-75 origin-top">
              <SharePoster
                planName={planName}
                theme={theme}
                saturday={saturday}
                sunday={sunday}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="bg-gradient-primary hover:opacity-90 text-white border-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2" />
                  Download as PDF
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Export your weekend plan as a PDF document
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}