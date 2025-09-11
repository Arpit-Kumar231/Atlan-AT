import { useRef, useState } from 'react';

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

export function ShareModal({
  isOpen,
  onClose,
  planName,
  theme,
  saturday,
  sunday,
}: ShareModalProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const element = posterRef.current;
      if (!element) throw new Error('Poster element not found');


      const prevTransform = element.style.transform;
      const prevBg = element.style.backgroundColor;

      element.style.transform = 'none';
      element.style.backgroundColor = '#ffffff';

      element.offsetHeight;
      
      await new Promise((r) => setTimeout(r, 500));

      const canvas = await html2canvas(element, {
        scale: 1,
        backgroundColor: '#ffffff',
        logging: true,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        x: 0,
        y: 0,
        ignoreElements: (element) => {
          return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
        }
      });


      element.style.transform = prevTransform;
      element.style.backgroundColor = prevBg;

      const imgData = canvas.toDataURL('image/png');

      if (imgData.length < 1000) {
        const altCanvas = await html2canvas(element, {
          scale: 1,
          backgroundColor: '#ffffff',
          logging: true,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
          scrollX: 0,
          scrollY: 0,
          width: element.scrollWidth,
          height: element.scrollHeight,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          x: 0,
          y: 0,
          ignoreElements: (element) => {
            return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
          }
        });
        
        const altImgData = altCanvas.toDataURL('image/png');
        if (altImgData.length < 1000) {
          throw new Error('Canvas appears to be empty or corrupted even with alternative settings');
        }
        
        const orientation = altCanvas.width > altCanvas.height ? 'landscape' : 'portrait';
        const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4' });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;
        
        const ratio = Math.min(maxWidth / altCanvas.width, maxHeight / altCanvas.height);
        const renderWidth = altCanvas.width * ratio;
        const renderHeight = altCanvas.height * ratio;
        
        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;
        
        pdf.addImage(altImgData, 'PNG', x, y, renderWidth, renderHeight);
        pdf.save(`weekend-plan-${Date.now()}.pdf`);
        
        toast({
          title: 'PDF Downloaded!',
          description: 'Your weekend plan has been saved as a PDF',
        });
        return;
      }

      const orientation = canvas.width > canvas.height ? 'landscape' : 'portrait';
      const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4' });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
      const renderWidth = canvas.width * ratio;
      const renderHeight = canvas.height * ratio;

      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;


      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);
      pdf.save(`weekend-plan-${Date.now()}.pdf`);

      toast({
        title: 'PDF Downloaded!',
        description: 'Your weekend plan has been saved as a PDF',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto bg-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Export Weekend Plan</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="bg-gradient-primary hover:opacity-90 text-white border-0"
            >
              {isGenerating ? (
                <div className='text-black flex gap-2'>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </div>
              ) : (
                <div className='text-black  flex gap-2'>
                  <FileDown className="w-4 h-4 mr-2" />
                  Download as PDF
                </div>
              )}
            </Button>
          </div>

        <div className="space-y-2">
          <div className="flex justify-center p-2 bg-gradient-subtle rounded-2xl">
            <div 
              ref={posterRef} 
              id="weekend-poster" 
              className="transform scale-100 origin-top"
              style={{ 
                minWidth: '794px', 
                minHeight: '1123px',
                transform: 'scale(1)',
                transformOrigin: 'top center'
              }}
            >
              <SharePoster
                planName={planName}
                theme={theme}
                saturday={saturday}
                sunday={sunday}
              />
            </div>
          </div>

          

          <p className="text-center text-sm text-muted-foreground">
            Export your weekend plan as a PDF document
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}